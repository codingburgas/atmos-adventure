Before you open the demo scene, follow these steps:

1) Set the color space to Linear (Edit> Project Settings> Player> Other Settings> Linear)
2) Install the Post-Processing from Package Manager (not needed if you using SRP)

If you use LWRP or URP, you need to import the appropriate support package from the "SRP Packages" folder and set render pipeline asset in Edit >> Project Settings >> Graphics.

If you need to return to the standard pipeline, just import package "AN_Built-in_(2019.1+)" from "SRP Packages" and remove render pipeline asset from the graphics tab.

If you using SRP, you must activate "Opaque Texture" in render pipeline asset for the water shader to work properly.