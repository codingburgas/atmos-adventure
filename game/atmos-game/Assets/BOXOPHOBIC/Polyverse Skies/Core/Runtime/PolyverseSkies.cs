// Cristian Pop - https://boxophobic.com/

using UnityEngine;
using Boxophobic.StyledGUI;

[DisallowMultipleComponent]
[ExecuteInEditMode]
public class PolyverseSkies : StyledMonoBehaviour
{
    [StyledBanner(0.968f, 0.572f, 0.890f, "Polyverse Skies", "", "https://docs.google.com/document/d/1z7A_xKNa2mXhvTRJqyu-ZQsAtbV32tEZQbO1OmPS_-s/edit?usp=sharing")]
    public bool styledBanner;

    [StyledCategory("Scene")]
    public bool categoryScene;

    public GameObject sunDirection;
	public GameObject moonDirection;

    [StyledCategory("Time Of Day")]
    public bool categoryTime;

    [StyledMessage("Info", "The Time Of Day feature will interpolate between two Polyverse Skies materials. Please note that not all material properties such as textures and keywords will not be interpolated!", 0, 10)]
    public bool categoryTimeMessage = true;

    public Material skyboxDay;
    public Material skyboxNight;
    [Range(0, 1)]
    public float timeOfDay = 0;

    [Space(10)]
    public bool updateLighting = false;

    [StyledSpace(5)]
    public bool styledSpace0;

	void Update ()
    {
		if (sunDirection != null)
        {
			Shader.SetGlobalVector ("GlobalSunDirection", -sunDirection.transform.forward);
		}
        else
        {
			Shader.SetGlobalVector ("GlobalSunDirection", Vector3.zero);
		}

		if (moonDirection != null)
        {
			Shader.SetGlobalVector ("GlobalMoonDirection", -moonDirection.transform.forward);
		}
        else
        {
			Shader.SetGlobalVector ("GlobalMoonDirection", Vector3.zero);
		}

        if (skyboxDay != null && skyboxNight != null)
        {
            Material skyboxMaterial = new Material(skyboxDay);
            skyboxMaterial.Lerp(skyboxDay, skyboxNight, timeOfDay);
            RenderSettings.skybox = skyboxMaterial;
        }

        if (updateLighting)
        {
            DynamicGI.UpdateEnvironment();
        }
    }
}
