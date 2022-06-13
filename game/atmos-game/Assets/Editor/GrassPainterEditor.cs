using UnityEditor;
using UnityEditorInternal;
using UnityEngine;

[CustomEditor(typeof(GrassPainter))]
[InitializeOnLoad]
public class GrassPainterEditor : Editor
{
    GrassPainter grassPainter;
    readonly string[] toolbarStrings = { "Add", "Remove", "Edit", "Reproject" };

    readonly string[] toolbarStringsEdit = { "Edit Colors", "Edit Length/Width", "Both" };

    private void OnEnable()
    {
        grassPainter = (GrassPainter)target;
    }
    void OnSceneGUI()
    {
        //base
        Handles.color = Color.green;
        Handles.DrawWireDisc(grassPainter.hitPosGizmo, grassPainter.hitNormal, grassPainter.brushSize);
        Handles.color = new Color(0, 0.5f, 0, 0.4f);
        Handles.DrawSolidDisc(grassPainter.hitPosGizmo, grassPainter.hitNormal, grassPainter.brushSize);

        if (grassPainter.toolbarInt == 1)
        {
            Handles.color = Color.red;
            Handles.DrawWireDisc(grassPainter.hitPosGizmo, grassPainter.hitNormal, grassPainter.brushSize);
            Handles.color = new Color(0.5f, 0f, 0f, 0.4f);
            Handles.DrawSolidDisc(grassPainter.hitPosGizmo, grassPainter.hitNormal, grassPainter.brushSize);
        }
        if (grassPainter.toolbarInt == 2)
        {
            Handles.color = Color.yellow;
            Handles.DrawWireDisc(grassPainter.hitPosGizmo, grassPainter.hitNormal, grassPainter.brushSize);
            Handles.color = new Color(0.5f, 0.5f, 0f, 0.4f);
            Handles.DrawSolidDisc(grassPainter.hitPosGizmo, grassPainter.hitNormal, grassPainter.brushSize);
            // falloff
            Handles.color = Color.yellow;
            Handles.DrawWireDisc(grassPainter.hitPosGizmo, grassPainter.hitNormal, grassPainter.brushSize * grassPainter.brushFalloffSize);
            Handles.color = new Color(0.5f, 0.5f, 0f, 0.4f);
            Handles.DrawSolidDisc(grassPainter.hitPosGizmo, grassPainter.hitNormal, grassPainter.brushSize * grassPainter.brushFalloffSize);
        }
        if (grassPainter.toolbarInt == 3)
        {
            Handles.color = Color.cyan;
            Handles.DrawWireDisc(grassPainter.hitPosGizmo, grassPainter.hitNormal, grassPainter.brushSize);
            Handles.color = new Color(0, 0.5f, 0.5f, 0.4f);
            Handles.DrawSolidDisc(grassPainter.hitPosGizmo, grassPainter.hitNormal, grassPainter.brushSize);
        }
    }

    public override void OnInspectorGUI()
    {
        EditorGUILayout.LabelField("Grass Limit", EditorStyles.boldLabel);
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField(grassPainter.i.ToString() + "/", EditorStyles.label);
        grassPainter.grassLimit = EditorGUILayout.IntField(grassPainter.grassLimit);
        EditorGUILayout.EndHorizontal();
        EditorGUILayout.Space();
        EditorGUILayout.LabelField("Hit Settings", EditorStyles.boldLabel);
        LayerMask tempMask = EditorGUILayout.MaskField("Hit Mask", InternalEditorUtility.LayerMaskToConcatenatedLayersMask(grassPainter.hitMask), InternalEditorUtility.layers);
        grassPainter.hitMask = InternalEditorUtility.ConcatenatedLayersMaskToLayerMask(tempMask);
        LayerMask tempMask2 = EditorGUILayout.MaskField("Painting Mask", InternalEditorUtility.LayerMaskToConcatenatedLayersMask(grassPainter.paintMask), InternalEditorUtility.layers);
        grassPainter.paintMask = InternalEditorUtility.ConcatenatedLayersMaskToLayerMask(tempMask2);
        EditorGUILayout.Space();
        EditorGUILayout.LabelField("Paint Status (Right-Mouse Button to paint)", EditorStyles.boldLabel);
        grassPainter.toolbarInt = GUILayout.Toolbar(grassPainter.toolbarInt, toolbarStrings);
        EditorGUILayout.Space();
        EditorGUILayout.LabelField("Brush Settings", EditorStyles.boldLabel);
        grassPainter.brushSize = EditorGUILayout.Slider("Brush Size", grassPainter.brushSize, 0.1f, 10f);

        if (grassPainter.toolbarInt == 0)
        {
            grassPainter.normalLimit = EditorGUILayout.Slider("Normal Limit", grassPainter.normalLimit, 0f, 1f);
            grassPainter.density = EditorGUILayout.Slider("Density", grassPainter.density, 0.1f, 10f);
        }

        if (grassPainter.toolbarInt == 2)
        {
            grassPainter.toolbarIntEdit = GUILayout.Toolbar(grassPainter.toolbarIntEdit, toolbarStringsEdit);
            EditorGUILayout.Space();
            EditorGUILayout.LabelField("Flood Options", EditorStyles.boldLabel);
            EditorGUILayout.BeginHorizontal();
            if (GUILayout.Button("Flood Colors"))
            {
                grassPainter.FloodColor();
            }
            if (GUILayout.Button("Flood Length/Width"))
            {
                grassPainter.FloodLengthAndWidth();
            }
            EditorGUILayout.EndHorizontal();
            EditorGUILayout.LabelField("Soft Falloff Settings", EditorStyles.boldLabel);
            grassPainter.brushFalloffSize = EditorGUILayout.Slider("Brush Falloff Size", grassPainter.brushFalloffSize, 0.01f, 1f);
            grassPainter.Flow = EditorGUILayout.Slider("Brush Flow", grassPainter.Flow, 0.1f, 10f);
        }

        if (grassPainter.toolbarInt == 0 || grassPainter.toolbarInt == 2)
        {
            EditorGUILayout.Space();
            EditorGUILayout.LabelField("Width and Length ", EditorStyles.boldLabel);
            grassPainter.sizeWidth = EditorGUILayout.Slider("Grass Width", grassPainter.sizeWidth, 0f, 2f);
            grassPainter.sizeLength = EditorGUILayout.Slider("Grass Length", grassPainter.sizeLength, 0f, 2f);
            EditorGUILayout.Space();
            EditorGUILayout.LabelField("Color", EditorStyles.boldLabel);
            grassPainter.AdjustedColor = EditorGUILayout.ColorField("Brush Color", grassPainter.AdjustedColor);
            EditorGUILayout.LabelField("Random Color Variation", EditorStyles.boldLabel);
            grassPainter.rangeR = EditorGUILayout.Slider("Red", grassPainter.rangeR, 0f, 1f);
            grassPainter.rangeG = EditorGUILayout.Slider("Green", grassPainter.rangeG, 0f, 1f);
            grassPainter.rangeB = EditorGUILayout.Slider("Blue", grassPainter.rangeB, 0f, 1f);
        }

        if (grassPainter.toolbarInt == 3)
        {
            EditorGUILayout.Space();
            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.LabelField("Reprojection Y Offset", EditorStyles.boldLabel);

            grassPainter.reprojectOffset = EditorGUILayout.FloatField(grassPainter.reprojectOffset);
            EditorGUILayout.EndHorizontal();
        }
        EditorGUILayout.Space();
        EditorGUILayout.Space();
        EditorGUILayout.Space();
        if (GUILayout.Button("Clear Mesh"))
        {
            if (EditorUtility.DisplayDialog("Clear Painted Mesh?",
               "Are you sure you want to clear the mesh?", "Clear", "Don't Clear"))
            {
                grassPainter.ClearMesh();
            }
        }




    }

}
