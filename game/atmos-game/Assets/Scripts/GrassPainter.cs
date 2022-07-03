using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using UnityEditor;



[RequireComponent(typeof(MeshFilter))]
[ExecuteInEditMode]
public class GrassPainter : MonoBehaviour
{

    public Mesh mesh;
    MeshFilter filter;
    public int grassLimit = 50000;

    // options
    public int toolbarInt = 0;
    public int toolbarIntEdit = 0;

    // mesh lists
    [SerializeField]
    List<Vector3> positions = new List<Vector3>();
    [SerializeField]
    List<Color> colors = new List<Color>();
    [SerializeField]
    List<int> indicies = new List<int>();
    [SerializeField]
    List<Vector3> normals = new List<Vector3>();
    [SerializeField]
    List<Vector2> length = new List<Vector2>();
    int[] indi;
    public int i = 0;

    // brush settings
    public LayerMask hitMask = 1;
    public LayerMask paintMask = 1;
    public float brushSize;
    public float brushFalloffSize;
    public float Flow;
    public float density = 1f;
    public float normalLimit = 1;

    // length/width
    public float sizeWidth = 1f;
    public float sizeLength = 1f;

    // reproject settings
    public float reprojectOffset = 1f;

    // color settings
    public float rangeR, rangeG, rangeB;
    public Color AdjustedColor;

    // raycast vars
    [HideInInspector]
    public Vector3 hitPosGizmo;
    Vector3 mousePos;
    Vector3 hitPos;
    [HideInInspector]
    public Vector3 hitNormal;

    private int flowTimer;
    private Vector3 lastPosition = Vector3.zero;

#if UNITY_EDITOR
    void OnFocus()
    {
        // Remove delegate listener if it has previously
        // been assigned.
        if (gameObject == null)
        {
            return;
        }
        SceneView.duringSceneGui -= this.OnScene;
        // Add (or re-add) the delegate.
        SceneView.duringSceneGui += this.OnScene;
    }

    public void HandleUndo()
    {
        if (mesh)
        {
            mesh.GetVertices(positions);
            if (positions.Count == 0)
            {
                ClearMesh();
                return;
            }
            i = positions.Count;
            mesh.GetIndices(indicies, 0);
            indi = indicies.ToArray();
            mesh.GetUVs(0, length);
            mesh.GetColors(colors);
            mesh.GetNormals(normals);
            RebuildMesh();
        }
        SceneView.RepaintAll();
    }

    void OnDestroy()
    {
        // When the window is destroyed, remove the delegate
        // so that it will no longer do any drawing.
        SceneView.duringSceneGui -= this.OnScene;
        Undo.undoRedoPerformed -= this.HandleUndo;
    }

    private void OnEnable()
    {
        if (filter == null)
        {
            filter = GetComponent<MeshFilter>();
        }
        SceneView.duringSceneGui += this.OnScene;
        Undo.undoRedoPerformed += this.HandleUndo;

        SetupMesh();
    }

    void SetupMesh()
    {
        mesh.GetVertices(positions);
        i = positions.Count;
        mesh.GetIndices(indicies, 0);
        indi = indicies.ToArray();
        mesh.GetUVs(0, length);
        mesh.GetColors(colors);
        mesh.GetNormals(normals);
    }

    public void ClearMesh()
    {
        Undo.RegisterCompleteObjectUndo(mesh, "Cleared Grass");
        i = 0;
        positions = new List<Vector3>();
        indicies = new List<int>();
        colors = new List<Color>();
        normals = new List<Vector3>();
        length = new List<Vector2>();
        RebuildMesh();
    }

    public void FloodColor()
    {
        Undo.RegisterCompleteObjectUndo(mesh, "Flooded Color");
        for (int i = 0; i < colors.Count; i++)
        {
            colors[i] = AdjustedColor;
        }
        RebuildMesh();
    }

    public void FloodLengthAndWidth()
    {
        Undo.RegisterCompleteObjectUndo(mesh, "Flooded Length/Width");
        for (int i = 0; i < length.Count; i++)
        {
            length[i] = new Vector2(sizeWidth, sizeLength);
        }
        RebuildMesh();
    }

    void OnScene(SceneView scene)
    {
        if (this != null)
        {
            // only allow painting while this object is selected
            if ((Selection.Contains(gameObject)))
            {
                Event e = Event.current;
                RaycastHit terrainHit;
                mousePos = e.mousePosition;
                float ppp = EditorGUIUtility.pixelsPerPoint;
                mousePos.y = scene.camera.pixelHeight - mousePos.y * ppp;
                mousePos.x *= ppp;
                mousePos.z = 0;

                // ray for gizmo(disc)
                Ray rayGizmo = scene.camera.ScreenPointToRay(mousePos);
                RaycastHit hitGizmo;

                if (Physics.Raycast(rayGizmo, out hitGizmo, 200f, hitMask.value))
                {
                    hitPosGizmo = hitGizmo.point;
                }
                // undo system
                if (e.type == EventType.MouseDown && e.button == 1)
                {
                    if (toolbarInt == 0)
                    {
                        Undo.RegisterCompleteObjectUndo(mesh, "Added Grass");
                    }
                    else if (toolbarInt == 1)
                    {
                        Undo.RegisterCompleteObjectUndo(mesh, "Removed Grass");
                    }
                    else if (toolbarInt == 2)
                    {
                        Undo.RegisterCompleteObjectUndo(mesh, "Edited Grass");
                    }
                    else if (toolbarInt == 3)
                    {
                        Undo.RegisterCompleteObjectUndo(mesh, "Reprojected Grass");
                    }
                }
                if (e.type == EventType.MouseDrag && e.button == 1)
                {
                    if (toolbarInt == 0)
                    {
                        // place based on density
                        for (int k = 0; k < density * brushSize; k++)
                        {

                            // brushrange
                            float t = 2f * Mathf.PI * Random.Range(0f, brushSize);
                            float u = Random.Range(0f, brushSize) + Random.Range(0f, brushSize);
                            float r = (u > 1 ? 2 - u : u);
                            Vector3 origin = Vector3.zero;

                            // place random in radius, except for first one
                            if (k != 0)
                            {
                                origin.x += r * Mathf.Cos(t);
                                origin.y += r * Mathf.Sin(t);
                            }
                            else
                            {
                                origin = Vector3.zero;
                            }

                            // add random range to ray
                            Ray ray = scene.camera.ScreenPointToRay(mousePos);
                            ray.origin += origin;

                            // if the ray hits something thats on the layer mask,  within the grass limit and within the y normal limit
                            if (Physics.Raycast(ray, out terrainHit, 200f, hitMask.value) && i < grassLimit && terrainHit.normal.y <= (1 + normalLimit) && terrainHit.normal.y >= (1 - normalLimit))
                            {
                                if ((paintMask.value & (1 << terrainHit.transform.gameObject.layer)) > 0)
                                {
                                    hitPos = terrainHit.point;
                                    hitNormal = terrainHit.normal;
                                    if (k != 0)
                                    {
                                        var grassPosition = hitPos;// + Vector3.Cross(origin, hitNormal);
                                        grassPosition -= this.transform.position;

                                        positions.Add((grassPosition));
                                        indicies.Add(i);
                                        length.Add(new Vector2(sizeWidth, sizeLength));
                                        // add random color variations                          
                                        colors.Add(new Color(AdjustedColor.r + (Random.Range(0, 1.0f) * rangeR), AdjustedColor.g + (Random.Range(0, 1.0f) * rangeG), AdjustedColor.b + (Random.Range(0, 1.0f) * rangeB), 1));

                                        //colors.Add(temp);
                                        normals.Add(terrainHit.normal);
                                        i++;
                                    }
                                    else
                                    {// to not place everything at once, check if the first placed point far enough away from the last placed first one
                                        if (Vector3.Distance(terrainHit.point, lastPosition) > brushSize)
                                        {
                                            var grassPosition = hitPos;
                                            grassPosition -= this.transform.position;
                                            positions.Add((grassPosition));
                                            indicies.Add(i);
                                            length.Add(new Vector2(sizeWidth, sizeLength));
                                            colors.Add(new Color(AdjustedColor.r + (Random.Range(0, 1.0f) * rangeR), AdjustedColor.g + (Random.Range(0, 1.0f) * rangeG), AdjustedColor.b + (Random.Range(0, 1.0f) * rangeB), 1));
                                            normals.Add(terrainHit.normal);
                                            i++;

                                            if (origin == Vector3.zero)
                                            {
                                                lastPosition = hitPos;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        e.Use();
                    }
                    // removing mesh points
                    if (toolbarInt == 1)
                    {
                        Ray ray = scene.camera.ScreenPointToRay(mousePos);
                        if (Physics.Raycast(ray, out terrainHit, 200f, hitMask.value))
                        {
                            hitPos = terrainHit.point;
                            hitPosGizmo = hitPos;
                            hitNormal = terrainHit.normal;
                            for (int j = 0; j < positions.Count; j++)
                            {
                                Vector3 pos = positions[j];
                                pos += this.transform.position;
                                float dist = Vector3.Distance(terrainHit.point, pos);

                                // if its within the radius of the brush, remove all info
                                if (dist <= brushSize)
                                {
                                    positions.RemoveAt(j);
                                    colors.RemoveAt(j);
                                    normals.RemoveAt(j);
                                    length.RemoveAt(j);
                                    indicies.RemoveAt(j);
                                    i--;

                                }
                            }
                            for (int ii = 0; ii < indicies.Count; ii++)
                            {
                                indicies[ii] = ii;
                            }
                        }
                        e.Use();
                    }
                    //edit
                    if (toolbarInt == 2)
                    {
                        Ray ray = scene.camera.ScreenPointToRay(mousePos);

                        if (Physics.Raycast(ray, out terrainHit, 200f, hitMask.value))
                        {
                            hitPos = terrainHit.point;
                            hitPosGizmo = hitPos;
                            hitNormal = terrainHit.normal;
                            for (int j = 0; j < positions.Count; j++)
                            {
                                Vector3 pos = positions[j];

                                pos += this.transform.position;
                                float dist = Vector3.Distance(terrainHit.point, pos);

                                // if its within the radius of the brush, remove all info
                                if (dist <= brushSize)
                                {

                                    float falloff = Mathf.Clamp01((dist / (brushFalloffSize * brushSize)));

                                    //store the original color
                                    Color OrigColor = colors[j];

                                    // add in the new color
                                    Color newCol = (new Color(AdjustedColor.r + (Random.Range(0, 1.0f) * rangeR), AdjustedColor.g + (Random.Range(0, 1.0f) * rangeG), AdjustedColor.b + (Random.Range(0, 1.0f) * rangeB), 1));

                                    Vector2 origLength = length[j];
                                    Vector2 newLength = new Vector2(sizeWidth, sizeLength); ;

                                    flowTimer++;
                                    if (flowTimer > Flow)
                                    {
                                        // edit colors
                                        if (toolbarIntEdit == 0 || toolbarIntEdit == 2)
                                        {
                                            colors[j] = Color.Lerp(newCol, OrigColor, falloff);
                                        }
                                        // edit grass length
                                        if (toolbarIntEdit == 1 || toolbarIntEdit == 2)
                                        {
                                            length[j] = Vector2.Lerp(newLength, origLength, falloff);
                                        }
                                        flowTimer = 0;
                                    }
                                }
                            }
                        }
                        e.Use();
                    }

                    // Reproject mesh points
                    if (toolbarInt == 3)
                    {
                        Ray ray = scene.camera.ScreenPointToRay(mousePos);

                        if (Physics.Raycast(ray, out terrainHit, 200f, hitMask.value))
                        {
                            hitPos = terrainHit.point;
                            hitPosGizmo = hitPos;
                            hitNormal = terrainHit.normal;

                            for (int j = 0; j < positions.Count; j++)
                            {
                                Vector3 pos = positions[j];
                                pos += this.transform.position;
                                float dist = Vector3.Distance(terrainHit.point, pos);

                                // if its within the radius of the brush, raycast to a new position
                                if (dist <= brushSize)
                                {
                                    RaycastHit raycastHit;
                                    Vector3 meshPoint = new Vector3(pos.x, pos.y + reprojectOffset, pos.z);
                                    if (Physics.Raycast(meshPoint, Vector3.down, out raycastHit, 200f, paintMask.value))
                                    {
                                        Vector3 newPoint = raycastHit.point - this.transform.position;
                                        positions[j] = newPoint;
                                    }
                                }
                            }
                        }
                        e.Use();
                    }
                    RebuildMesh();
                }
            }
        }
    }

    void RebuildMesh()
    {
        if (mesh == null)
        {
            mesh = new Mesh();
        }
        mesh.Clear();
        mesh.SetVertices(positions);
        indi = indicies.ToArray();
        mesh.SetIndices(indi, MeshTopology.Points, 0);
        mesh.SetUVs(0, length);
        mesh.SetColors(colors);
        mesh.SetNormals(normals);
        mesh.RecalculateBounds();
        filter.sharedMesh = mesh;
    }
#endif
}