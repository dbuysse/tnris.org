---
title: StratMap - Strategic Mapping Program
template: full-top-page.html
mainimage: images/stratmap/stratmap-banner.jpg
abstract: The Strategic Mapping Program (StratMap) was established in 1997 by Senate Bill 1 to develop consistent statewide digital data layers.
---

{% import "_macros.html" as m %}

StratMap's primary goal is to acquire and improve digital geographic data for statewide mapping applications. StratMap also maintains comprehensive data standard specifications to ensure consistent, high quality data products across the State.

The original StratMap layers funded by the Texas Legislature and other partners (state agencies, federal agencies, local entities) are **Orthoimagery**, **Elevation**, **Hydrography**, **Political Boundaries**, **Transportation**, **Soils**.

## Orthoimagery

Orthoimagery is digital aerial photography that has been geometrically corrected (orthorectified) to remove distortion caused by camera optics, aircraft tilt, and differences in ground elevation. This data layer at 1-meter and 0.5-meter pixel resolution is used to identify current conditions, features, and changes on the ground serving as a base of reference for other map information. 

Leveraging State funds from multiple agencies, the StratMap Program coordinated statewide orthoimagery acquisitions starting in the mid-1990s. Since then, the state has been refreshed with new orthoimagery in 2004, 2008/09, and 2010, all in conjunction with the National Agriculture Imagery Program (NAIP) administered by the USDA-Farm Service Agency-Aerial Photography Field Office. NAIP continues to refresh Texas statewide with new orthoimagery every two years (2012, 2014) during the leaf-on growing season (April – October acquisitions). Pooling State funds again in 2014, StratMap coordinated a new statewide leaf-off acquisition to occur during the 2014/15 winter season.

Since 2009, using the [High Priority Imagery and Data Sets (HPIDS)](high-priority-imagery-datasets) contract, StratMap has coordinated numerous higher resolution (6-inch/1-foot) orthoimagery regional acquisition projects within Texas.

## Elevation

{{m.catalog_data_card('elevation-contours/stratmap-hypso')}}

Light Detection and Ranging (LiDAR) is a technology that utilizes lasers to measure the distance from an airborne sensor (such as an airplane) to points on the ground. This creates an accurate 3-dimensional representation of the earth’s surface. LiDAR goes beyond traditional bare earth digital elevation models (DEMs) by producing point cloud information that can be classified into existing features such as vegetation and man-made structures.

TNRIS acquires LiDAR data through partnerships with other federal and state agencies as well as through our high priority imagery and data sets(HPIDS) contract to make this data available to the public. LiDAR coverage varies across the state. LiDAR coverage and project details (date, nps, vendor, etc.) can be found on the LiDAR Status Map . All details about each dataset in our collection can be found in the QAQC for each project (see below).

All LiDAR datasets are available for purchase by filling out an order form*

## Hydrography
{{m.catalog_data_card('hydrography/national-hydrography-dataset-nhd')}}

## Political boundaries (Legacy)

<p class="lead">Boundary lines are not meant to divide but to give context and meaning to the land.</p>

{{m.catalog_data_card('boundary/stratmap-boundaries')}}

The StratMap Boundaries were originally created as a common political dataset delineating county, city, parks, and various “landmark” boundaries such as airports, universities, wildlife refuges, and military bases. They are derived from various sources such as Texas Department of Transportation, Texas Parks and Wildlife, and local jurisdictions. StratMap Boundaries are primarily used for cartographic display but are also useful in preliminary right-of-way determination, highway planning and maintenance, real estate, public services, jurisdiction maintenance, and other administrative assessments.

The StratMap political boundary dataset is the foundation layer of the StratMap Program and is updated annually at a minimum. Updating the dataset requires constant contact with our data sharing partners, frequent data research, and a consistent update schedule. Our data sharing partners range from local entities, county offices, and COGs (e.g. NCTCOG), to statewide data providers (e.g. TxDOT) and federal entities (e.g. US Census Bureau). The data update and release process is generally the same for park, city, and cultural boundaries, with county boundaries as the exception. County boundary lines are authoritative and require extensive legal consideration before changes are made. As such, county boundary updates in Texas occur very infrequently.


## Transportation

{{m.catalog_data_card('transportation/stratmap-transportation')}}

The StratMap Transportation dataset is a line feature dataset that extends uniformly over the state of Texas. The attribute table contains street feature codes (local roads, state highways, interstates, etc.) and street names that can be used to complement data layers used in a geographic information system.  The first version of a StratMap Transportation dataset was produced and released in 2001. Version 1 was an amalgamation of local road data sources that were integrated into a road dataset maintained by the Texas Department of Transportation (TxDOT).

Version 2, released in 2006, remains the most current StratMap Transportation dataset.  An improvement to Version 1, Version 2 improvements include addition of new road segments, increase of primary, secondary, and tertiary road names, and horizontal accuracy.

National efforts for the development of a transportation dataset are underway from two different perspectives. Transportation for the Nation is a consortium of federal agencies researching strategies for developing a national transportation data model. The National Emergency Number Association (NENA) is also strategizing for a nationwide transportation data model using locally collected 9-1-1 Road data.

At the state level, the Texas Department of Transportation (TxDOT) fulfills the federal requirement to maintain and report on all publicly available roads in Texas. TxDOT releases quarterly updates to the road dataset and is the most commonly used statewide layer.


## Soils -Soil Survey Geographic (SSURGO) Database Enhancement
{{m.catalog_data_card('natural-regions/soils')}}

StratMap made modifications to enhance and broaden the use of the Natural Resources Conservation Services’ (NRCS) Soil Survey Geographic (SSURGO) Database. The enhancement will allow the user to obtain general detail about soil types, properties, distribution and conditions. No attribute deletions, modifications or spatial enhancements were applied to the existing SSURGO data, and therefore the digital map data produced by NRCS remains original, while maintaining its accuracy and integrity. Enhancements performed under the guidance of StratMap solely involved making additions to the attribute table, thus NRCS should be acknowledged as the data source.
Enhancement Process

The primary element of the enhancement process used to enhance SSURGO was a simple tabular join performed by using GIS software. Using the “mapunit” table, a vital table within SSURGO, a join was made based on the “musym” field that is common throughout the spatial component of SSURGO. File conversion from the original “mapunit” text file to a delimited file was necessary to make the join possible.  Further file conversion was needed in the creation of a .dbf, or Excel file in order to join the new “mapunit” file to the spatial file, or shapefile. After the join was successful, additional steps were required to complete the process, which involved exporting the “joined” shapefile into a finalized product. Once the finalized file was created, some of the attribute field names were changed to match the table label names found in the SSURGO metadata table column descriptions.

### Attribute Enhancement Descriptions
MUSYM: The symbol used to uniquely identify the soil mapunit in the soil survey.

MUNAME: Correlated name of the mapunit (recommended name or field name for surveys in progress).

MUKIND: Code identifying the kind of mapunit.

TOTAL ACRES (muacres): The number of acres of a particular map unit within the geographic area to which the legend applies. The number listed here may differ from that measured using GIS software due to different measuring techniques and rounding practices, or due to the fact that the value has
been adjusted so that the sum total of all map units in the legend equals that listed for soil survey area. 

FARM CLASS (farmlndcl): Identification of mapunits as prime farmland, farmland of statewide importance, or farmland of local importance.

HEL (muhelcl): The overall Highly Erodible Lands (HEL) classification for the mapunit based on the rating of its components for wind and water HEL classification.

HEL WATER: The Highly Erodible Lands (HEL) classification for the mapunit based on the rating of its components for water HEL classification.


