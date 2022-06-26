// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "BOXOPHOBIC/Polyverse Skies/Simple"
{
	Properties
	{
		[StyledBanner(Polyverse Skies Simple)]_TITLE("< TITLE >", Float) = 1
		[StyledCategory(Background)]_backgroundCat("[ background Cat ]", Float) = 1
		[KeywordEnum(Colors,Cubemap,Combined)] _BackgroundMode("Background Mode", Float) = 0
		[NoScaleOffset]_BackgroundCubemap("Background Cubemap", CUBE) = "black" {}
		_BackgroundExposure("Background Exposure", Range( 0 , 8)) = 1
		[StyledCategory(Colors)]_ColorsCat("[ Colors Cat ]", Float) = 1
		_SkyColor("Sky Color", Color) = (0.4980392,0.7450981,1,1)
		_EquatorColor("Equator Color", Color) = (1,0.747,0,1)
		_GroundColor("Ground Color", Color) = (0.4980392,0.497,0,1)
		_EquatorHeight("Equator Height", Range( 0 , 1)) = 0.5
		_EquatorSmoothness("Equator Smoothness", Range( 0.01 , 1)) = 0.5
		[StyledCategory(Stars)]_StarsCat("[ Stars Cat ]", Float) = 1
		[Toggle(_ENABLESTARS_ON)] _EnableStars("Enable Stars", Float) = 0
		[NoScaleOffset]_StarsCubemap("Stars Cubemap", CUBE) = "white" {}
		_StarsSize("Stars Size", Range( 0 , 0.99)) = 0.5
		_StarsIntensity("Stars Intensity", Range( 0 , 5)) = 2
		_StarsHeightMask("Stars Height Mask", Range( 0 , 1)) = 0
		[StyledCategory(Sun)]_SunCat("[ Sun Cat ]", Float) = 1
		[Toggle(_ENABLESUN_ON)] _EnableSun("Enable Sun", Float) = 0
		_SunColor("Sun Color", Color) = (1,1,1,1)
		[NoScaleOffset]_SunTexture("Sun Texture", 2D) = "black" {}
		_SunSize("Sun Size", Range( 0.1 , 1)) = 0.5
		_SunIntensity("Sun Intensity", Range( 1 , 10)) = 1
		[StyledCategory(Clouds)]_CloudsCat("[ Clouds Cat ]", Float) = 1
		[Toggle(_ENABLECLOUDS_ON)] _EnableClouds("Enable Clouds", Float) = 0
		_CloudsLightColor("Clouds Light Color", Color) = (1,1,1,1)
		_CloudsShadowColor("Clouds Shadow Color", Color) = (0.4980392,0.7450981,1,1)
		[NoScaleOffset]_CloudsCubemap("Clouds Cubemap", CUBE) = "black" {}
		_CloudsHeight("Clouds Height", Range( -0.5 , 0.5)) = 0
		[StyledCategory(Fog)]_FogCat("[ Fog Cat ]", Float) = 1
		[Toggle(_ENABLEBUILTINFOG_ON)] _EnableBuiltinFog("Enable Fog", Float) = 0
		_FogHeight("Fog Height", Range( 0 , 1)) = 0
		_FogSmoothness("Fog Smoothness", Range( 0.01 , 1)) = 0
		_FogFill("Fog Fill", Range( 0 , 1)) = 0

	}
	
	SubShader
	{
		
		
		Tags { "RenderType"="Background" "Queue"="Background" "PreviewType"="Skybox" "IgnoreProjector"="True" }
	LOD 100

		CGINCLUDE
		#pragma target 2.0
		ENDCG
		Blend Off
		AlphaToMask Off
		Cull Off
		ColorMask RGBA
		ZWrite Off
		ZTest LEqual
		
		
		
		Pass
		{
			Name "Unlit"
			Tags { "LightMode"="ForwardBase" }
			CGPROGRAM

			

			#ifndef UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX
			//only defining to not throw compilation error over Unity 5.5
			#define UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(input)
			#endif
			#pragma vertex vert
			#pragma fragment frag
			#pragma multi_compile_instancing
			#include "UnityCG.cginc"
			#include "UnityShaderVariables.cginc"
			#define ASE_NEEDS_FRAG_POSITION
			#define ASE_NEEDS_VERT_POSITION
			#pragma shader_feature_local _ENABLEBUILTINFOG_ON
			#pragma shader_feature_local _ENABLECLOUDS_ON
			#pragma shader_feature_local _ENABLESUN_ON
			#pragma shader_feature_local _ENABLESTARS_ON
			#pragma shader_feature_local _BACKGROUNDMODE_COLORS _BACKGROUNDMODE_CUBEMAP _BACKGROUNDMODE_COMBINED


			struct appdata
			{
				float4 vertex : POSITION;
				float4 color : COLOR;
				
				UNITY_VERTEX_INPUT_INSTANCE_ID
			};
			
			struct v2f
			{
				float4 vertex : SV_POSITION;
				#ifdef ASE_NEEDS_FRAG_WORLD_POSITION
				float3 worldPos : TEXCOORD0;
				#endif
				float4 ase_texcoord1 : TEXCOORD1;
				float4 ase_texcoord2 : TEXCOORD2;
				float4 ase_texcoord3 : TEXCOORD3;
				float4 ase_texcoord4 : TEXCOORD4;
				UNITY_VERTEX_INPUT_INSTANCE_ID
				UNITY_VERTEX_OUTPUT_STEREO
			};

			uniform half _FogCat;
			uniform half _CloudsCat;
			uniform half _backgroundCat;
			uniform half _StarsCat;
			uniform half _TITLE;
			uniform half _ColorsCat;
			uniform half _SunCat;
			uniform half4 _EquatorColor;
			uniform half4 _GroundColor;
			uniform half4 _SkyColor;
			uniform half _EquatorHeight;
			uniform half _EquatorSmoothness;
			uniform samplerCUBE _BackgroundCubemap;
			uniform half _BackgroundExposure;
			uniform half _StarsHeightMask;
			uniform samplerCUBE _StarsCubemap;
			SamplerState sampler_StarsCubemap;
			uniform half _StarsSize;
			uniform half _StarsIntensity;
			uniform sampler2D _SunTexture;
			SamplerState sampler_SunTexture;
			uniform half3 GlobalSunDirection;
			uniform half _SunSize;
			uniform half4 _SunColor;
			uniform half _SunIntensity;
			uniform half4 _CloudsShadowColor;
			uniform half4 _CloudsLightColor;
			uniform samplerCUBE _CloudsCubemap;
			SamplerState sampler_CloudsCubemap;
			uniform half _CloudsHeight;
			uniform half _FogHeight;
			uniform half _FogSmoothness;
			uniform half _FogFill;

			
			v2f vert ( appdata v )
			{
				v2f o;
				UNITY_SETUP_INSTANCE_ID(v);
				UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
				UNITY_TRANSFER_INSTANCE_ID(v, o);

				#ifdef _ENABLESTARS_ON
				float staticSwitch1166 = saturate( (0.1 + (abs( v.vertex.xyz.y ) - 0.0) * (1.0 - 0.1) / (_StarsHeightMask - 0.0)) );
				#else
				float staticSwitch1166 = 0.0;
				#endif
				float vertexToFrag856 = staticSwitch1166;
				o.ase_texcoord2.x = vertexToFrag856;
				float lerpResult268 = lerp( 1.0 , ( unity_OrthoParams.y / unity_OrthoParams.x ) , unity_OrthoParams.w);
				half CAMERA_MODE300 = lerpResult268;
				float3 appendResult675 = (float3(v.vertex.xyz.x , ( v.vertex.xyz.y * CAMERA_MODE300 ) , v.vertex.xyz.z));
				#ifdef _ENABLESTARS_ON
				float3 staticSwitch1165 = appendResult675;
				#else
				float3 staticSwitch1165 = float3( 0,0,0 );
				#endif
				float3 vertexToFrag763 = staticSwitch1165;
				o.ase_texcoord2.yzw = vertexToFrag763;
				float3 temp_output_962_0 = cross( GlobalSunDirection , half3(0,1,0) );
				float3 normalizeResult967 = normalize( temp_output_962_0 );
				float dotResult968 = dot( normalizeResult967 , v.vertex.xyz );
				half3 GlobalSunDirection1005 = GlobalSunDirection;
				float3 normalizeResult965 = normalize( cross( GlobalSunDirection1005 , temp_output_962_0 ) );
				float dotResult969 = dot( normalizeResult965 , v.vertex.xyz );
				float2 appendResult970 = (float2(dotResult968 , dotResult969));
				float2 break972 = appendResult970;
				float2 appendResult980 = (float2(break972.x , ( break972.y * CAMERA_MODE300 )));
				float2 temp_cast_0 = (-1.0).xx;
				float2 temp_cast_1 = (1.0).xx;
				float2 temp_cast_2 = (0.0).xx;
				float2 temp_cast_3 = (1.0).xx;
				#ifdef _ENABLESUN_ON
				float2 staticSwitch1168 = (temp_cast_2 + (( appendResult980 * (20.0 + (_SunSize - 0.1) * (2.0 - 20.0) / (1.0 - 0.1)) ) - temp_cast_0) * (temp_cast_3 - temp_cast_2) / (temp_cast_1 - temp_cast_0));
				#else
				float2 staticSwitch1168 = float2( 0,0 );
				#endif
				float2 vertexToFrag993 = staticSwitch1168;
				o.ase_texcoord3.xy = vertexToFrag993;
				float dotResult988 = dot( GlobalSunDirection1005 , v.vertex.xyz );
				#ifdef _ENABLESUN_ON
				float staticSwitch1169 = saturate( dotResult988 );
				#else
				float staticSwitch1169 = 0.0;
				#endif
				float vertexToFrag997 = staticSwitch1169;
				o.ase_texcoord3.z = vertexToFrag997;
				float3 appendResult246 = (float3(v.vertex.xyz.x , ( ( v.vertex.xyz.y + ( _CloudsHeight * -1.0 ) ) * CAMERA_MODE300 ) , v.vertex.xyz.z));
				#ifdef _ENABLECLOUDS_ON
				float3 staticSwitch1163 = appendResult246;
				#else
				float3 staticSwitch1163 = float3( 0,0,0 );
				#endif
				float3 vertexToFrag1133 = staticSwitch1163;
				o.ase_texcoord4.xyz = vertexToFrag1133;
				
				o.ase_texcoord1 = v.vertex;
				
				//setting value to unused interpolator channels and avoid initialization warnings
				o.ase_texcoord3.w = 0;
				o.ase_texcoord4.w = 0;
				float3 vertexValue = float3(0, 0, 0);
				#if ASE_ABSOLUTE_VERTEX_POS
				vertexValue = v.vertex.xyz;
				#endif
				vertexValue = vertexValue;
				#if ASE_ABSOLUTE_VERTEX_POS
				v.vertex.xyz = vertexValue;
				#else
				v.vertex.xyz += vertexValue;
				#endif
				o.vertex = UnityObjectToClipPos(v.vertex);

				#ifdef ASE_NEEDS_FRAG_WORLD_POSITION
				o.worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
				#endif
				return o;
			}
			
			fixed4 frag (v2f i ) : SV_Target
			{
				UNITY_SETUP_INSTANCE_ID(i);
				UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i);
				fixed4 finalColor;
				#ifdef ASE_NEEDS_FRAG_WORLD_POSITION
				float3 WorldPosition = i.worldPos;
				#endif
				float4 lerpResult180 = lerp( _GroundColor , _SkyColor , ceil( i.ase_texcoord1.xyz.y ));
				float4 lerpResult288 = lerp( _EquatorColor , lerpResult180 , saturate( pow( (0.0 + (abs( i.ase_texcoord1.xyz.y ) - 0.0) * (1.0 - 0.0) / (_EquatorHeight - 0.0)) , ( 1.0 - _EquatorSmoothness ) ) ));
				half4 SKY218 = lerpResult288;
				half4 BACKGROUND1202 = ( texCUBE( _BackgroundCubemap, i.ase_texcoord1.xyz ) * _BackgroundExposure );
				#if defined(_BACKGROUNDMODE_COLORS)
				float4 staticSwitch1207 = SKY218;
				#elif defined(_BACKGROUNDMODE_CUBEMAP)
				float4 staticSwitch1207 = BACKGROUND1202;
				#elif defined(_BACKGROUNDMODE_COMBINED)
				float4 staticSwitch1207 = ( SKY218 * BACKGROUND1202 );
				#else
				float4 staticSwitch1207 = SKY218;
				#endif
				float vertexToFrag856 = i.ase_texcoord2.x;
				float3 vertexToFrag763 = i.ase_texcoord2.yzw;
				half STARS630 = ( floor( ( vertexToFrag856 * ( texCUBE( _StarsCubemap, vertexToFrag763 ).g + _StarsSize ) ) ) * _StarsIntensity );
				#ifdef _ENABLESTARS_ON
				float4 staticSwitch1170 = ( staticSwitch1207 + STARS630 );
				#else
				float4 staticSwitch1170 = staticSwitch1207;
				#endif
				float2 vertexToFrag993 = i.ase_texcoord3.xy;
				float4 tex2DNode995 = tex2D( _SunTexture, vertexToFrag993 );
				half4 SUN1004 = ( tex2DNode995.r * _SunColor * _SunIntensity );
				float vertexToFrag997 = i.ase_texcoord3.z;
				half SUN_MASK1003 = ( tex2DNode995.a * vertexToFrag997 );
				float4 lerpResult176 = lerp( staticSwitch1170 , SUN1004 , SUN_MASK1003);
				#ifdef _ENABLESUN_ON
				float4 staticSwitch1167 = lerpResult176;
				#else
				float4 staticSwitch1167 = staticSwitch1170;
				#endif
				float3 vertexToFrag1133 = i.ase_texcoord4.xyz;
				float4 texCUBENode41 = texCUBE( _CloudsCubemap, vertexToFrag1133 );
				float4 lerpResult101 = lerp( _CloudsShadowColor , _CloudsLightColor , texCUBENode41.g);
				half4 CLOUDS222 = lerpResult101;
				half CLOUDS_MASK223 = texCUBENode41.a;
				float4 lerpResult227 = lerp( staticSwitch1167 , CLOUDS222 , CLOUDS_MASK223);
				#ifdef _ENABLECLOUDS_ON
				float4 staticSwitch1162 = lerpResult227;
				#else
				float4 staticSwitch1162 = staticSwitch1167;
				#endif
				float lerpResult678 = lerp( saturate( pow( (0.0 + (abs( i.ase_texcoord1.xyz.y ) - 0.0) * (1.0 - 0.0) / (_FogHeight - 0.0)) , ( 1.0 - _FogSmoothness ) ) ) , 0.0 , _FogFill);
				half FOG_MASK359 = lerpResult678;
				float4 lerpResult317 = lerp( unity_FogColor , staticSwitch1162 , FOG_MASK359);
				#ifdef _ENABLEBUILTINFOG_ON
				float4 staticSwitch921 = lerpResult317;
				#else
				float4 staticSwitch921 = staticSwitch1162;
				#endif
				
				
				finalColor = staticSwitch921;
				return finalColor;
			}
			ENDCG
		}
	}
	
	
	
}
/*ASEBEGIN
Version=18400
1927;1;1906;1020;1479.592;5538.781;1;True;False
Node;AmplifyShaderEditor.OrthoParams;267;-933.3121,-3884.704;Inherit;False;0;5;FLOAT4;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.Vector3Node;961;-896,-864;Half;False;Constant;_Vector2;Vector 2;9;0;Create;True;0;0;False;0;False;0,1,0;0,0,0;0;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.Vector3Node;938;-896,-1024;Half;False;Global;GlobalSunDirection;GlobalSunDirection;38;0;Create;True;0;0;False;0;False;0,0,0;0.3830222,0.6427875,-0.6634141;0;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.RangedFloatNode;1007;-485.3122,-3884.704;Half;False;Constant;_Float7;Float 7;47;0;Create;True;0;0;False;0;False;1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleDivideOpNode;309;-629.3121,-3884.704;Inherit;False;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RegisterLocalVarNode;1005;-640,-1024;Half;False;GlobalSunDirection;-1;True;1;0;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.CrossProductOpNode;962;-576,-896;Inherit;False;2;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.LerpOp;268;-293.3122,-3884.704;Inherit;False;3;0;FLOAT;1;False;1;FLOAT;0.5;False;2;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.CrossProductOpNode;964;-384,-1024;Inherit;False;2;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.RegisterLocalVarNode;300;26.68781,-3884.704;Half;False;CAMERA_MODE;-1;True;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.NormalizeNode;967;-384,-896;Inherit;False;1;0;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.GetLocalVarNode;674;-896,-1600;Inherit;False;300;CAMERA_MODE;1;0;OBJECT;;False;1;FLOAT;0
Node;AmplifyShaderEditor.NormalizeNode;965;-192,-1024;Inherit;False;1;0;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.PosVertexDataNode;1176;-384,-640;Inherit;False;0;0;5;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.PosVertexDataNode;1174;-896,-1792;Inherit;False;0;0;5;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.PosVertexDataNode;1172;-896,-2944;Inherit;False;0;0;5;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.PosVertexDataNode;1175;1024,-1792;Inherit;False;0;0;5;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;673;-640,-1616;Inherit;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.DotProductOpNode;969;0,-1024;Inherit;False;2;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;1;FLOAT;0
Node;AmplifyShaderEditor.DotProductOpNode;968;0,-896;Inherit;False;2;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;471;-384,-2368;Half;False;Property;_EquatorSmoothness;Equator Smoothness;10;0;Create;True;0;0;False;0;False;0.5;0.5;0.01;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;831;1600,-1600;Half;False;Property;_StarsHeightMask;Stars Height Mask;16;0;Create;True;0;0;False;0;False;0;0;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.AbsOpNode;287;-192,-2944;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1009;-384,-2608;Half;False;Constant;_Float9;Float 9;47;0;Create;True;0;0;False;0;False;1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1008;-384,-2688;Half;False;Constant;_Float8;Float 8;47;0;Create;True;0;0;False;0;False;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.DynamicAppendNode;970;160,-1024;Inherit;False;FLOAT2;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT2;0
Node;AmplifyShaderEditor.DynamicAppendNode;675;-448,-1792;Inherit;False;FLOAT3;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.RangedFloatNode;1017;1408,-1680;Half;False;Constant;_Float17;Float 17;47;0;Create;True;0;0;False;0;False;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1171;1648,-1696;Half;False;Constant;_Float0;Float 0;47;0;Create;True;0;0;False;0;False;0.1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.AbsOpNode;828;1664,-1792;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;212;-384,-2496;Half;False;Property;_EquatorHeight;Equator Height;9;0;Create;True;0;0;False;0;False;0.5;0.5;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1018;1408,-1600;Half;False;Constant;_Float18;Float 18;47;0;Create;True;0;0;False;0;False;1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.GetLocalVarNode;971;320,-896;Inherit;False;300;CAMERA_MODE;1;0;OBJECT;;False;1;FLOAT;0
Node;AmplifyShaderEditor.TFHCRemapNode;832;1920,-1792;Inherit;False;5;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;1;False;3;FLOAT;0;False;4;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.StaticSwitch;1165;-208,-1744;Float;False;Property;_ENABLESTARS_ON;Enable Stars;12;0;Create;False;0;0;False;0;False;0;0;0;False;;Toggle;2;Key0;Key1;Reference;1166;False;9;1;FLOAT3;0,0,0;False;0;FLOAT3;0,0,0;False;2;FLOAT3;0,0,0;False;3;FLOAT3;0,0,0;False;4;FLOAT3;0,0,0;False;5;FLOAT3;0,0,0;False;6;FLOAT3;0,0,0;False;7;FLOAT3;0,0,0;False;8;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.OneMinusNode;475;-64,-2368;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.TFHCRemapNode;210;0,-2560;Inherit;False;5;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;1;False;3;FLOAT;0;False;4;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.BreakToComponentsNode;972;320,-1024;Inherit;False;FLOAT2;1;0;FLOAT2;0,0;False;16;FLOAT;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4;FLOAT;5;FLOAT;6;FLOAT;7;FLOAT;8;FLOAT;9;FLOAT;10;FLOAT;11;FLOAT;12;FLOAT;13;FLOAT;14;FLOAT;15
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;976;640,-928;Inherit;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1021;352,-576;Half;False;Constant;_Float21;Float 21;47;0;Create;True;0;0;False;0;False;2;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;975;0,-768;Half;False;Property;_SunSize;Sun Size;21;0;Create;True;0;0;False;0;False;0.5;0.5;0.1;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.VertexToFragmentNode;763;48,-1728;Inherit;False;1;0;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.RangedFloatNode;973;352,-816;Half;False;Constant;_Float4;Float 4;36;0;Create;True;0;0;False;0;False;0.1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1020;352,-656;Half;False;Constant;_Float20;Float 20;47;0;Create;True;0;0;False;0;False;20;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SaturateNode;822;2112,-1792;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.PowerNode;470;224,-2384;Inherit;False;False;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1019;352,-736;Half;False;Constant;_Float19;Float 19;47;0;Create;True;0;0;False;0;False;1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.CeilOpNode;1173;-640,-2448;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.ColorNode;182;640,-2592;Half;False;Property;_SkyColor;Sky Color;6;0;Create;True;0;0;False;0;False;0.4980392,0.7450981,1,1;0.4980389,0.7450981,1,1;False;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RelayNode;303;896,-2448;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.ColorNode;194;640,-2768;Half;False;Property;_GroundColor;Ground Color;8;0;Create;True;0;0;False;0;False;0.4980392,0.497,0,1;0.4980389,0.497,0,1;False;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.PosVertexDataNode;1198;-896,-3584;Inherit;False;0;0;5;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RangedFloatNode;619;384,-1600;Half;False;Property;_StarsSize;Stars Size;14;0;Create;True;0;0;False;0;False;0.5;0.5;0;0.99;0;1;FLOAT;0
Node;AmplifyShaderEditor.SaturateNode;208;384,-2368;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;241;-896,192;Half;False;Property;_CloudsHeight;Clouds Height;28;0;Create;True;0;0;False;0;False;0;0;-0.5;0.5;0;1;FLOAT;0
Node;AmplifyShaderEditor.SamplerNode;564;384,-1792;Inherit;True;Property;_StarsCubemap;Stars Cubemap;13;1;[NoScaleOffset];Create;True;0;0;False;0;False;-1;None;None;True;0;False;white;LockedToCube;False;Object;-1;Auto;Cube;8;0;SAMPLERCUBE;;False;1;FLOAT3;0,0,0;False;2;FLOAT;0;False;3;FLOAT3;0,0,0;False;4;FLOAT3;0,0,0;False;5;FLOAT;1;False;6;FLOAT;0;False;7;SAMPLERSTATE;;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.DynamicAppendNode;980;832,-1024;Inherit;False;FLOAT2;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT2;0
Node;AmplifyShaderEditor.TFHCRemapNode;981;640,-768;Inherit;False;5;0;FLOAT;0;False;1;FLOAT;0.1;False;2;FLOAT;1;False;3;FLOAT;20;False;4;FLOAT;2;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1090;-896,320;Half;False;Constant;_Float31;Float 31;53;0;Create;True;0;0;False;0;False;-1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.StaticSwitch;1166;2305.3,-1744;Float;False;Property;_ENABLESTARS_ON;Enable Stars;12;0;Create;False;0;0;False;0;False;0;0;0;False;;Toggle;2;Key0;Key1;Reference;1170;False;9;1;FLOAT;0;False;0;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;4;FLOAT;0;False;5;FLOAT;0;False;6;FLOAT;0;False;7;FLOAT;0;False;8;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1023;1024,-816;Half;False;Constant;_Float6;Float 6;47;0;Create;True;0;0;False;0;False;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleAddOpNode;626;768,-1552;Inherit;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1200;-640,-3392;Half;False;Property;_BackgroundExposure;Background Exposure;4;0;Create;True;0;0;False;0;False;1;1;0;8;0;1;FLOAT;0
Node;AmplifyShaderEditor.VertexToFragmentNode;856;2560,-1728;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1022;1024,-896;Half;False;Constant;_Float5;Float 5;47;0;Create;True;0;0;False;0;False;-1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;985;1024,-1024;Inherit;False;2;2;0;FLOAT2;0,0;False;1;FLOAT;5;False;1;FLOAT2;0
Node;AmplifyShaderEditor.PosVertexDataNode;1177;2816,-512;Inherit;False;0;0;5;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RangedFloatNode;1024;1024,-736;Half;False;Constant;_Float22;Float 22;47;0;Create;True;0;0;False;0;False;1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.GetLocalVarNode;1028;2816,-640;Inherit;False;1005;GlobalSunDirection;1;0;OBJECT;;False;1;FLOAT3;0
Node;AmplifyShaderEditor.RelayNode;417;1152,-2368;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.LerpOp;180;1024,-2752;Inherit;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.PosVertexDataNode;1178;-896,0;Inherit;False;0;0;5;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SamplerNode;1199;-640,-3584;Inherit;True;Property;_BackgroundCubemap;Background Cubemap;3;1;[NoScaleOffset];Create;True;0;0;False;0;False;-1;None;None;True;0;False;black;LockedToCube;False;Object;-1;Auto;Cube;8;0;SAMPLERCUBE;;False;1;FLOAT3;0,0,0;False;2;FLOAT;0;False;3;FLOAT3;0,0,0;False;4;FLOAT3;0,0,0;False;5;FLOAT;1;False;6;FLOAT;0;False;7;SAMPLERSTATE;;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;278;-512,256;Inherit;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.ColorNode;181;640,-2944;Half;False;Property;_EquatorColor;Equator Color;7;0;Create;True;0;0;False;0;False;1,0.747,0,1;1,0.747,0,1;False;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.GetLocalVarNode;1152;-256,320;Inherit;False;300;CAMERA_MODE;1;0;OBJECT;;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;876;2944,-1584;Inherit;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.LerpOp;288;1280,-2944;Inherit;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleAddOpNode;244;-256,192;Inherit;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.TFHCRemapNode;989;1280,-1024;Inherit;False;5;0;FLOAT2;0,0;False;1;FLOAT2;-1,0;False;2;FLOAT2;1,0;False;3;FLOAT2;0,0;False;4;FLOAT2;1,0;False;1;FLOAT2;0
Node;AmplifyShaderEditor.DotProductOpNode;988;3072,-640;Inherit;False;2;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;1201;-256,-3584;Inherit;False;2;2;0;COLOR;0,0,0,0;False;1;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.RangedFloatNode;629;3200,-1664;Half;False;Property;_StarsIntensity;Stars Intensity;15;0;Create;True;0;0;False;0;False;2;2;0;5;0;1;FLOAT;0
Node;AmplifyShaderEditor.StaticSwitch;1168;1568,-976;Float;False;Property;_ENABLESUN_ON;Enable Sun;18;0;Create;False;0;0;False;0;False;0;0;0;False;;Toggle;2;Key0;Key1;Reference;1169;False;9;1;FLOAT2;0,0;False;0;FLOAT2;0,0;False;2;FLOAT2;0,0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT2;0,0;False;6;FLOAT2;0,0;False;7;FLOAT2;0,0;False;8;FLOAT2;0,0;False;1;FLOAT2;0
Node;AmplifyShaderEditor.RegisterLocalVarNode;218;1664,-2944;Half;False;SKY;-1;True;1;0;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.RegisterLocalVarNode;1202;256,-3584;Half;False;BACKGROUND;-1;True;1;0;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.FloorOpNode;886;3200,-1792;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SaturateNode;994;3232,-640;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;1151;0,192;Inherit;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.DynamicAppendNode;246;128,0;Inherit;False;FLOAT3;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.StaticSwitch;1169;3392,-592;Float;False;Property;_ENABLESUN_ON;Enable Sun;18;0;Create;False;0;0;False;0;False;0;0;0;False;;Toggle;2;Key0;Key1;Reference;1167;False;9;1;FLOAT;0;False;0;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;4;FLOAT;0;False;5;FLOAT;0;False;6;FLOAT;0;False;7;FLOAT;0;False;8;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.GetLocalVarNode;1204;-896,-5296;Inherit;False;1202;BACKGROUND;1;0;OBJECT;;False;1;COLOR;0
Node;AmplifyShaderEditor.VertexToFragmentNode;993;1808,-960;Inherit;False;1;0;FLOAT2;0,0;False;1;FLOAT2;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;882;3520,-1792;Inherit;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.GetLocalVarNode;1205;-896,-5376;Inherit;False;218;SKY;1;0;OBJECT;;False;1;COLOR;0
Node;AmplifyShaderEditor.StaticSwitch;1163;384,80;Float;False;Property;_ENABLECLOUDS_ON;Enable Clouds;24;0;Create;False;0;0;False;0;False;0;0;0;False;;Toggle;2;Key0;Key1;Reference;1162;False;9;1;FLOAT3;0,0,0;False;0;FLOAT3;0,0,0;False;2;FLOAT3;0,0,0;False;3;FLOAT3;0,0,0;False;4;FLOAT3;0,0,0;False;5;FLOAT3;0,0,0;False;6;FLOAT3;0,0,0;False;7;FLOAT3;0,0,0;False;8;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.RegisterLocalVarNode;630;3712,-1792;Half;False;STARS;-1;True;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;996;2176,-576;Half;False;Property;_SunIntensity;Sun Intensity;22;0;Create;True;0;0;False;0;False;1;1;1;10;0;1;FLOAT;0
Node;AmplifyShaderEditor.SamplerNode;995;2176,-1024;Inherit;True;Property;_SunTexture;Sun Texture;20;1;[NoScaleOffset];Create;True;0;0;False;0;False;-1;None;None;True;0;False;black;Auto;False;Object;-1;Auto;Texture2D;8;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;6;FLOAT;0;False;7;SAMPLERSTATE;;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.VertexToFragmentNode;997;3632,-576;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;1206;-640,-5248;Inherit;False;2;2;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.PosVertexDataNode;1179;-896,896;Inherit;False;0;0;5;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ColorNode;998;2176,-768;Half;False;Property;_SunColor;Sun Color;19;0;Create;True;0;0;False;0;False;1,1,1,1;1,1,1,1;False;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;1002;2560,-1024;Inherit;False;3;3;0;FLOAT;0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.RangedFloatNode;325;-896,1216;Half;False;Property;_FogSmoothness;Fog Smoothness;32;0;Create;True;0;0;False;0;False;0;0;0.01;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.GetLocalVarNode;632;-256,-5056;Inherit;False;630;STARS;1;0;OBJECT;;False;1;FLOAT;0
Node;AmplifyShaderEditor.AbsOpNode;314;-512,896;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.StaticSwitch;1207;-384,-5376;Float;False;Property;_BackgroundMode;Background Mode;2;0;Create;True;0;0;False;0;False;0;0;0;True;;KeywordEnum;3;Colors;Cubemap;Combined;Create;True;9;1;COLOR;0,0,0,0;False;0;COLOR;0,0,0,0;False;2;COLOR;0,0,0,0;False;3;COLOR;0,0,0,0;False;4;COLOR;0,0,0,0;False;5;COLOR;0,0,0,0;False;6;COLOR;0,0,0,0;False;7;COLOR;0,0,0,0;False;8;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;1001;4096,-928;Inherit;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;313;-896,1088;Half;False;Property;_FogHeight;Fog Height;31;0;Create;True;0;0;False;0;False;0;0;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.VertexToFragmentNode;1133;640,96;Inherit;False;1;0;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.RangedFloatNode;1108;-512,1024;Half;False;Constant;_Float39;Float 39;55;0;Create;True;0;0;False;0;False;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1109;-512,1120;Half;False;Constant;_Float40;Float 40;55;0;Create;True;0;0;False;0;False;1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.OneMinusNode;329;-256,1216;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RegisterLocalVarNode;1004;4352,-1024;Half;False;SUN;-1;True;1;0;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleAddOpNode;631;80,-5248;Inherit;False;2;2;0;COLOR;0,0,0,0;False;1;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.ColorNode;261;1792,224;Half;False;Property;_CloudsLightColor;Clouds Light Color;25;0;Create;True;0;0;False;0;False;1,1,1,1;1,1,1,1;False;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ColorNode;232;1792,0;Half;False;Property;_CloudsShadowColor;Clouds Shadow Color;26;0;Create;True;0;0;False;0;False;0.4980392,0.7450981,1,1;0.4980389,0.7450981,1,1;False;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SamplerNode;41;1024,0;Inherit;True;Property;_CloudsCubemap;Clouds Cubemap;27;1;[NoScaleOffset];Create;True;0;0;False;0;False;-1;None;None;True;0;False;black;LockedToCube;False;Object;-1;Auto;Cube;8;0;SAMPLERCUBE;;False;1;FLOAT3;0,0,0;False;2;FLOAT;0;False;3;FLOAT3;0,0,0;False;4;FLOAT3;0,0,0;False;5;FLOAT;1;False;6;FLOAT;0;False;7;SAMPLERSTATE;;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RegisterLocalVarNode;1003;4352,-768;Half;False;SUN_MASK;-1;True;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.TFHCRemapNode;315;-320,896;Inherit;False;5;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;1;False;3;FLOAT;0;False;4;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.PowerNode;677;-64,896;Inherit;False;False;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.GetLocalVarNode;1112;256,-5152;Inherit;False;1004;SUN;1;0;OBJECT;;False;1;COLOR;0
Node;AmplifyShaderEditor.LerpOp;101;2176,0;Inherit;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.StaticSwitch;1170;256,-5376;Float;False;Property;_EnableStars;Enable Stars;12;0;Create;True;0;0;False;0;False;0;0;0;True;;Toggle;2;Key0;Key1;Create;False;9;1;COLOR;0,0,0,0;False;0;COLOR;0,0,0,0;False;2;COLOR;0,0,0,0;False;3;COLOR;0,0,0,0;False;4;COLOR;0,0,0,0;False;5;COLOR;0,0,0,0;False;6;COLOR;0,0,0,0;False;7;COLOR;0,0,0,0;False;8;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.GetLocalVarNode;1111;256,-5056;Inherit;False;1003;SUN_MASK;1;0;OBJECT;;False;1;FLOAT;0
Node;AmplifyShaderEditor.RegisterLocalVarNode;223;1408,128;Half;False;CLOUDS_MASK;-1;True;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1110;128,1088;Half;False;Constant;_Float41;Float 41;55;0;Create;True;0;0;False;0;False;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;679;128,1216;Half;False;Property;_FogFill;Fog Fill;33;0;Create;True;0;0;False;0;False;0;0;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.RegisterLocalVarNode;222;2560,0;Half;False;CLOUDS;-1;True;1;0;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.SaturateNode;316;128,896;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.LerpOp;176;576,-5248;Inherit;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.GetLocalVarNode;228;768,-5152;Inherit;False;222;CLOUDS;1;0;OBJECT;;False;1;COLOR;0
Node;AmplifyShaderEditor.LerpOp;678;384,896;Inherit;False;3;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.StaticSwitch;1167;768,-5376;Float;False;Property;_EnableSun;Enable Sun;18;0;Create;True;0;0;False;0;False;0;0;0;True;;Toggle;2;Key0;Key1;Create;False;9;1;COLOR;0,0,0,0;False;0;COLOR;0,0,0,0;False;2;COLOR;0,0,0,0;False;3;COLOR;0,0,0,0;False;4;COLOR;0,0,0,0;False;5;COLOR;0,0,0,0;False;6;COLOR;0,0,0,0;False;7;COLOR;0,0,0,0;False;8;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.GetLocalVarNode;229;768,-5056;Inherit;False;223;CLOUDS_MASK;1;0;OBJECT;;False;1;FLOAT;0
Node;AmplifyShaderEditor.RegisterLocalVarNode;359;640,896;Half;False;FOG_MASK;-1;True;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.LerpOp;227;1088,-5248;Inherit;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.StaticSwitch;1162;1280,-5376;Float;False;Property;_EnableClouds;Enable Clouds;24;0;Create;True;0;0;False;0;False;0;0;0;True;;Toggle;2;Key0;Key1;Create;False;9;1;COLOR;0,0,0,0;False;0;COLOR;0,0,0,0;False;2;COLOR;0,0,0,0;False;3;COLOR;0,0,0,0;False;4;COLOR;0,0,0,0;False;5;COLOR;0,0,0,0;False;6;COLOR;0,0,0,0;False;7;COLOR;0,0,0,0;False;8;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.FogAndAmbientColorsNode;312;1280,-5152;Inherit;False;unity_FogColor;0;1;COLOR;0
Node;AmplifyShaderEditor.GetLocalVarNode;436;1280,-5056;Inherit;False;359;FOG_MASK;1;0;OBJECT;;False;1;FLOAT;0
Node;AmplifyShaderEditor.LerpOp;317;1664,-5248;Inherit;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.RangedFloatNode;1190;-400,-6016;Half;False;Property;_SunCat;[ Sun Cat ];17;0;Create;True;0;0;True;1;StyledCategory(Sun);False;1;1;1;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1180;-896,-6016;Half;False;Property;_TITLE;< TITLE >;0;0;Create;True;0;0;True;1;StyledBanner(Polyverse Skies Simple);False;1;1;1;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.StaticSwitch;921;1920,-5376;Float;False;Property;_EnableBuiltinFog;Enable Fog;30;0;Create;False;0;0;False;0;False;0;0;0;True;;Toggle;2;Key0;Key1;Create;False;9;1;COLOR;0,0,0,0;False;0;COLOR;0,0,0,0;False;2;COLOR;0,0,0,0;False;3;COLOR;0,0,0,0;False;4;COLOR;0,0,0,0;False;5;COLOR;0,0,0,0;False;6;COLOR;0,0,0,0;False;7;COLOR;0,0,0,0;False;8;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.RangedFloatNode;1186;-736,-6016;Half;False;Property;_ColorsCat;[ Colors Cat ];5;0;Create;True;0;0;True;1;StyledCategory(Colors);False;1;1;1;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1203;-723.4579,-5911.077;Half;False;Property;_backgroundCat;[ background Cat ];1;0;Create;True;0;0;True;1;StyledCategory(Background);False;1;1;1;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1191;-224,-6016;Half;False;Property;_CloudsCat;[ Clouds Cat ];23;0;Create;True;0;0;True;1;StyledCategory(Clouds);False;1;1;1;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1192;-32,-6016;Half;False;Property;_FogCat;[ Fog Cat ];29;0;Create;True;0;0;True;1;StyledCategory(Fog);False;1;1;1;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;1189;-576,-6016;Half;False;Property;_StarsCat;[ Stars Cat ];11;0;Create;True;0;0;True;1;StyledCategory(Stars);False;1;1;1;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.TemplateMultiPassMasterNode;1197;2432,-5376;Float;False;True;-1;2;;100;1;BOXOPHOBIC/Polyverse Skies/Simple;0770190933193b94aaa3065e307002fa;True;Unlit;0;0;Unlit;2;True;0;1;False;-1;0;False;-1;0;1;False;-1;0;False;-1;True;0;False;-1;0;False;-1;False;False;False;False;False;False;True;0;False;-1;True;2;False;-1;True;True;True;True;True;0;False;-1;False;False;False;True;False;255;False;-1;255;False;-1;255;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;True;2;False;-1;True;0;False;-1;True;False;0;False;-1;0;False;-1;True;4;RenderType=Background=RenderType;Queue=Background=Queue=0;PreviewType=Skybox;IgnoreProjector=True;True;0;0;False;False;False;False;False;False;False;False;False;False;False;False;False;False;False;False;False;False;True;1;LightMode=ForwardBase;False;0;;0;0;Standard;1;Vertex Position,InvertActionOnDeselection;1;0;1;True;False;;False;0
Node;AmplifyShaderEditor.CommentaryNode;952;1024,-1920;Inherit;False;2616.168;100;Stars Horizon Height Mask;0;;1,0,0,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;914;1792,-128;Inherit;False;515;100;Cloud Colors;0;;0,0.4980392,1,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;991;2176,-1152;Inherit;False;517;100;Sun Texture, Color and Intensity;0;;0,0.4980392,1,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;1194;-933.3121,-4012.705;Inherit;False;771;100;Switch between Perspective / Orthographic camera;0;CAMERA MODE;1,0,1,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;1188;-896,-6144;Inherit;False;1024.748;100;Drawers;0;;1,0.252,0,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;480;640,-3072;Inherit;False;774.4041;100;Color Gradient Colors;0;;0,0.4980392,1,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;1026;2816,-768;Inherit;False;1028.332;100;Direction Negative Z Mask;0;;1,0,0,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;1159;384,-1920;Inherit;False;273;100;Stars Cubemap;0;;0,0.4980392,1,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;1155;1024,-128;Inherit;False;579;100;Clouds Cubemap;0;;0,0.4980392,1,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;1006;-896,-1152;Inherit;False;2940.454;100;Calculate Sun Position;0;SUN;0,0.4980392,0,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;1193;-896,-5504;Inherit;False;3583.845;100;Final;0;FINAL OUTPUT;0.4980392,1,0,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;1157;-896,-1920;Inherit;False;1150;100;Stars Cubemaps Coords;0;STARS;0,0.4980392,0,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;700;-896,768;Inherit;False;1415.783;100;Fog Coords on Screen;0;BUILT-IN FOG;0,0.4980392,0,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;1154;-896,-128;Inherit;False;1791.123;100;Clouds Coordinates;0;CLOUDS;0,0.4980392,0,1;0;0
Node;AmplifyShaderEditor.CommentaryNode;1195;-896,-3072;Inherit;False;1406.953;100;Color Gradient Calculation;0;GRADIENT;0,0.4980392,0,1;0;0
WireConnection;309;0;267;2
WireConnection;309;1;267;1
WireConnection;1005;0;938;0
WireConnection;962;0;938;0
WireConnection;962;1;961;0
WireConnection;268;0;1007;0
WireConnection;268;1;309;0
WireConnection;268;2;267;4
WireConnection;964;0;1005;0
WireConnection;964;1;962;0
WireConnection;300;0;268;0
WireConnection;967;0;962;0
WireConnection;965;0;964;0
WireConnection;673;0;1174;2
WireConnection;673;1;674;0
WireConnection;969;0;965;0
WireConnection;969;1;1176;0
WireConnection;968;0;967;0
WireConnection;968;1;1176;0
WireConnection;287;0;1172;2
WireConnection;970;0;968;0
WireConnection;970;1;969;0
WireConnection;675;0;1174;1
WireConnection;675;1;673;0
WireConnection;675;2;1174;3
WireConnection;828;0;1175;2
WireConnection;832;0;828;0
WireConnection;832;1;1017;0
WireConnection;832;2;831;0
WireConnection;832;3;1171;0
WireConnection;832;4;1018;0
WireConnection;1165;0;675;0
WireConnection;475;0;471;0
WireConnection;210;0;287;0
WireConnection;210;1;1008;0
WireConnection;210;2;212;0
WireConnection;210;3;1008;0
WireConnection;210;4;1009;0
WireConnection;972;0;970;0
WireConnection;976;0;972;1
WireConnection;976;1;971;0
WireConnection;763;0;1165;0
WireConnection;822;0;832;0
WireConnection;470;0;210;0
WireConnection;470;1;475;0
WireConnection;1173;0;1172;2
WireConnection;303;0;1173;0
WireConnection;208;0;470;0
WireConnection;564;1;763;0
WireConnection;980;0;972;0
WireConnection;980;1;976;0
WireConnection;981;0;975;0
WireConnection;981;1;973;0
WireConnection;981;2;1019;0
WireConnection;981;3;1020;0
WireConnection;981;4;1021;0
WireConnection;1166;0;822;0
WireConnection;626;0;564;2
WireConnection;626;1;619;0
WireConnection;856;0;1166;0
WireConnection;985;0;980;0
WireConnection;985;1;981;0
WireConnection;417;0;208;0
WireConnection;180;0;194;0
WireConnection;180;1;182;0
WireConnection;180;2;303;0
WireConnection;1199;1;1198;0
WireConnection;278;0;241;0
WireConnection;278;1;1090;0
WireConnection;876;0;856;0
WireConnection;876;1;626;0
WireConnection;288;0;181;0
WireConnection;288;1;180;0
WireConnection;288;2;417;0
WireConnection;244;0;1178;2
WireConnection;244;1;278;0
WireConnection;989;0;985;0
WireConnection;989;1;1022;0
WireConnection;989;2;1024;0
WireConnection;989;3;1023;0
WireConnection;989;4;1024;0
WireConnection;988;0;1028;0
WireConnection;988;1;1177;0
WireConnection;1201;0;1199;0
WireConnection;1201;1;1200;0
WireConnection;1168;0;989;0
WireConnection;218;0;288;0
WireConnection;1202;0;1201;0
WireConnection;886;0;876;0
WireConnection;994;0;988;0
WireConnection;1151;0;244;0
WireConnection;1151;1;1152;0
WireConnection;246;0;1178;1
WireConnection;246;1;1151;0
WireConnection;246;2;1178;3
WireConnection;1169;0;994;0
WireConnection;993;0;1168;0
WireConnection;882;0;886;0
WireConnection;882;1;629;0
WireConnection;1163;0;246;0
WireConnection;630;0;882;0
WireConnection;995;1;993;0
WireConnection;997;0;1169;0
WireConnection;1206;0;1205;0
WireConnection;1206;1;1204;0
WireConnection;1002;0;995;1
WireConnection;1002;1;998;0
WireConnection;1002;2;996;0
WireConnection;314;0;1179;2
WireConnection;1207;1;1205;0
WireConnection;1207;0;1204;0
WireConnection;1207;2;1206;0
WireConnection;1001;0;995;4
WireConnection;1001;1;997;0
WireConnection;1133;0;1163;0
WireConnection;329;0;325;0
WireConnection;1004;0;1002;0
WireConnection;631;0;1207;0
WireConnection;631;1;632;0
WireConnection;41;1;1133;0
WireConnection;1003;0;1001;0
WireConnection;315;0;314;0
WireConnection;315;1;1108;0
WireConnection;315;2;313;0
WireConnection;315;3;1108;0
WireConnection;315;4;1109;0
WireConnection;677;0;315;0
WireConnection;677;1;329;0
WireConnection;101;0;232;0
WireConnection;101;1;261;0
WireConnection;101;2;41;2
WireConnection;1170;1;1207;0
WireConnection;1170;0;631;0
WireConnection;223;0;41;4
WireConnection;222;0;101;0
WireConnection;316;0;677;0
WireConnection;176;0;1170;0
WireConnection;176;1;1112;0
WireConnection;176;2;1111;0
WireConnection;678;0;316;0
WireConnection;678;1;1110;0
WireConnection;678;2;679;0
WireConnection;1167;1;1170;0
WireConnection;1167;0;176;0
WireConnection;359;0;678;0
WireConnection;227;0;1167;0
WireConnection;227;1;228;0
WireConnection;227;2;229;0
WireConnection;1162;1;1167;0
WireConnection;1162;0;227;0
WireConnection;317;0;312;0
WireConnection;317;1;1162;0
WireConnection;317;2;436;0
WireConnection;921;1;1162;0
WireConnection;921;0;317;0
WireConnection;1197;0;921;0
ASEEND*/
//CHKSM=125D3D61CB002363B787B75E5D967BDB1871E486