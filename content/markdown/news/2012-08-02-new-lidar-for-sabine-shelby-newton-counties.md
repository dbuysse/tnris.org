---
template: news.html
title: New Lidar Available for Sabine, Shelby, Newton Counties
author: StratMap
thumbnail: images/updates/2012/toledo_bend_dam_th.jpg
abstract: 
    High resolution lidar and associated data products are now available for portions of Sabine, Shelby and Newton Counties in East Texas.
tags: lidar, stratmap, elevation data, east texas, sabine, shelby, newton
---

High resolution lidar and associated data products are now available for portions of Sabine, Shelby and Newton Counties in East Texas. Aerial collection took place from January 12 to February 13, 2011 by MJ Harden (now PhotoScience) and Dewberry provided third-party quality assurance and quality control (QA/QC). The data were funded through collaboration between the Texas Natural Resources Information System and the Sabine River Authority (SRA). This project was procured through the Council on Competitive Government’s High Priority Imagery and Datasets (HPIDS) contract. The area of interest was selected based on statewide prioritization of floodplain mapping needs and in coordination with SRA.

## Highlight Image

The image shows a 3-D lidar point cloud of the Toledo Bend Dam in Newton County. The points are categorized into ground points (brown), buildings (red), water (blue) and bridges (purple) with all remaining points shown as gray. The point cloud was then blended with a grayscale lidar-based image to provide a more photorealistic representation. 

<img class="img-responsive" src="images/updates/2012/toledo_bend_dam.jpg" alt="A 3-D LiDAR image of the Toledo Bend Dam">

## Products

- Classified all-return lidar DO3Q tiles (1/16th of USGS Quad) in LAS 1.2 format
- Ground point Digital Elevation Model ESRI Grid format
- Lidar intensity images in TIF format
- Hydro-flattening breaklines in SHP
- File-level FGDC metadata in XML

## Acquisition Areas

433 tiles (~1725 square miles) covering nearly all of Newton County and portions of Sabine and Shelby Counties.

## Product Specification

- Fundamental vertical accuracy (RMSE) tested at ~ 11 cm (4.3 in) in open terrain, exceeding the 15 cm state standard for Flood/Soils
- Average point density is ~ 4 points per square meter (ppsm), exceeding the 4 ppsm state standard
- Average ground spacing distance (GSD) is ~ 0.50 m (19.7 in)
- Point data are classified according to the following American Society for Photogrammetry and Remote Sensing (ASPRS) class schema: Class 1: Unclassified Class 2: Ground   Class 4: Vegetation Class 6: Buildings Class 7. Low Point (noise) Class 9. Water Class 13. Bridges and Culverts
- DEM and Intensity Images are 1-meter spatial resolution
- Horizontal projection is UTM NAD83 Zone 15
- Vertical projection is NAVD88 Geoid 09
- Units are in meters denoting orthometric heights
- File structure is 1/16th of USGS 7.5 minute quadrangle (1.875 minute by 1.875 minute)
- File naming convention:
alt-text-for-screen-reader
- Approximate file size per tile: Lidar (LAS) ~ 1.4 GB ESRI Grid DEM ~ 47 MB Intensity (TIF) ~ 10 MB


## Data Access
<div class="media">
  <div class="media-left">
    {% include "./partials/order-button.html" %}
  </div>
  <div class="media-body">
    <p>Lidar data and the associated geospatial products listed above are available for cost of reproduction through TNRIS.</p>
  </div>
</div>
