Shader "Custom/GrassComputeHLSL"
{
    Properties
    {
        [Toggle(BLEND)] _BlendFloor("Blend with floor", Float) = 0
        _Fade("Top Fade Offset", Range(-1,10)) = 0
        _AmbientAdjustment("Ambient Adjustment", Range(-1,10)) = 0
    }
    
    HLSLINCLUDE
    // Include some helper functions
    #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
    #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
    #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Shadows.hlsl"
    
    // This describes a vertex on the generated mesh
    struct DrawVertex
    {
        float3 positionWS; // The position in world space
        float2 uv;
        float3 diffuseColor;
    };
    
    // A triangle on the generated mesh
    struct DrawTriangle
    {
        float3 normalOS;
        DrawVertex vertices[3]; // The three points on the triangle
    };
    
    // A buffer containing the generated mesh
    StructuredBuffer<DrawTriangle> _DrawTriangles;
    
    struct v2f
    {
        float4 positionCS : SV_POSITION; // Position in clip space
        float2 uv : TEXCOORD0;          // The height of this vertex on the grass blade
        float3 positionWS : TEXCOORD1; // Position in world space
        float3 normalWS : TEXCOORD2;   // Normal vector in world space
        float3 diffuseColor : COLOR;
        float fogFactor : TEXCOORD5;
    };
    
    float4 _TopTint;
    float4 _BottomTint;
    float _Fade;
    float4 _PositionMoving;
    float _OrthographicCamSize;
    float3 _OrthographicCamPos;
    uniform sampler2D _TerrainDiffuse;
    float _AmbientAdjustment;
    // ----------------------------------------
    
    // Vertex function
    
    // -- retrieve data generated from compute shader
    v2f vert(uint vertexID : SV_VertexID)
    {
        // Initialize the output struct
        v2f output = (v2f)0;
        
        // Get the vertex from the buffer
        // Since the buffer is structured in triangles, we need to divide the vertexID by three
        // to get the triangle, and then modulo by 3 to get the vertex on the triangle
        DrawTriangle tri = _DrawTriangles[vertexID / 3];
        DrawVertex input = tri.vertices[vertexID % 3];
        
        output.positionCS = TransformWorldToHClip(input.positionWS);
        output.positionWS = input.positionWS;
        
        float3 faceNormal = GetMainLight().direction * tri.normalOS;
        output.normalWS = TransformObjectToWorldNormal(faceNormal, true);
        float fogFactor = ComputeFogFactor(output.positionCS.z);
        output.fogFactor = fogFactor;
        output.uv = input.uv;
        
        output.diffuseColor = input.diffuseColor;
        
        return output;
    }
    
    // ----------------------------------------
    
    // Fragment function
    
    half4 frag(v2f i) : SV_Target
    {
        // For Shadow Caster Pass
        #ifdef SHADERPASS_SHADOWCASTER
            return 0;
        #else
            // For Color Pass
            // rendertexture UV for terrain blending
            float2 uv = i.positionWS.xz - _OrthographicCamPos.xz;
            uv = uv / (_OrthographicCamSize * 2);
            uv += 0.5;
            
            // get ambient color from environment lighting
            float4 ambient =float4(unity_SHAr.w, unity_SHAg.w, unity_SHAb.w,1); //float4(ShadeSH9(float4(0,0,1,1)),0);
            
            float shadow = 0;
            #if BLEND
                shadow = 1;                
            #endif
            
            
            half4 shadowCoord = TransformWorldToShadowCoord(i.positionWS);
            
            #if _MAIN_LIGHT_SHADOWS_CASCADE || _MAIN_LIGHT_SHADOWS
                Light mainLight = GetMainLight(shadowCoord);
                shadow = mainLight.shadowAttenuation;
            #else
                Light mainLight = GetMainLight();
            #endif
            
            // extra point lights support
            float3 extraLights;
            int pixelLightCount = GetAdditionalLightsCount();
            for (int j = 0; j < pixelLightCount; ++j) {
                Light light = GetAdditionalLight(j, i.positionWS, half4(1, 1, 1, 1));
                float3 attenuatedLightColor = light.color * (light.distanceAttenuation * light.shadowAttenuation);
                extraLights += attenuatedLightColor;
                
            }
            // fade over the length of the grass
            float verticalFade = saturate(i.uv.y + _Fade);
            extraLights *= verticalFade;
            // colors from the tool with tinting from the grass script
            float4 baseColor = lerp(_BottomTint , _TopTint,verticalFade) * float4(i.diffuseColor, 1);
            // get the floor map
            float4 terrainForBlending = tex2D(_TerrainDiffuse, uv);
            
            float4 final = float4(0,0,0,0);
            #if BLEND      
                _TopTint = _TopTint * ambient;  
                // tint the top blades and add in light color             
                terrainForBlending = lerp(terrainForBlending,terrainForBlending+ ( _TopTint* float4(i.diffuseColor, 1)) , verticalFade);
                final = lerp((terrainForBlending)  * shadow , terrainForBlending, shadow);  
                // add in ambient and attempt to blend in with the shadows
                final += lerp((ambient * terrainForBlending) * _AmbientAdjustment, 0,shadow);
            #else
                final = baseColor;
                // add in shadows
                final *= shadow;
                // if theres a main light, multiply with its color and intensity           
                final *= float4(mainLight.color,1);         
                
                // add in ambient
                final += (ambient * baseColor) ;
            #endif
            final += float4(extraLights,1);
            // fog
            float fogFactor = i.fogFactor;
            // Mix the pixel color with fogColor. 
            final.rgb = MixFog(final.rgb, fogFactor);         
            return final;
            
        #endif  // SHADERPASS_SHADOWCASTER
    }
    ENDHLSL
    
    SubShader {
        // UniversalPipeline needed to have this render in URP
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        
        // Forward Lit Pass
        Pass
        {
            Name "ForwardLit"
            Tags { "LightMode" = "UniversalForward" }
            Cull Off // No culling since the grass must be double sided
            
            HLSLPROGRAM
            // Signal this shader requires a compute buffer
            #pragma prefer_hlslcc gles
            #pragma exclude_renderers d3d11_9x
            #pragma target 5.0
            
            // Lighting and shadow keywords
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS_CASCADE
            #pragma multi_compile _ _ADDITIONAL_LIGHTS
            #pragma multi_compile _ _ADDITIONAL_LIGHT_SHADOWS
            #pragma multi_compile _ _SHADOWS_SOFT
            #pragma multi_compile_fog
            #pragma shader_feature BLEND
            // Register our functions
            #pragma vertex vert
            #pragma fragment frag
            
            ENDHLSL
        }
        
        // Shadow Casting Pass
        Pass
        {
            Name "ShadowCaster"
            Tags { "LightMode" = "ShadowCaster" }
            ZWrite On
            ZTest LEqual
            Cull Off
            
            HLSLPROGRAM
            // Signal this shader requires geometry function support
            #pragma prefer_hlslcc gles
            #pragma exclude_renderers d3d11_9x
            #pragma target 5.0
            
            // Support all the various light  ypes and shadow paths
            #pragma multi_compile_shadowcaster
            
            // Register our functions
            #pragma vertex vert
            #pragma fragment frag
            
            // A custom keyword to modify logic during the shadow caster pass
            #define SHADERPASS_SHADOWCASTER
            
            #pragma shader_feature_local _ DISTANCE_DETAIL
            
            ENDHLSL
        }
    }
}