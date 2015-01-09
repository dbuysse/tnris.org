---
title: Welcome to the Brand-New TNRIS site
template: news.html
author: IS Team
thumbnail: images/updates/new_website.jpg
thumbalt: screenshots of the new tnris.org website
abstract:
    We've made some changes to our site that we hope will improve your experience and make it easier to find the data and services you need.
---
<p class="lead"><img class="pull-left" src="images/updates/new_website.jpg" alt="Small, 3-D pages of the new site stacked in front of each other">We're very excited to welcome you to latest version of the TNRIS site. We sincerely hope it meets your needs and expectations. While some of the content is similar to what you're used to, there are also new ways to explore and access TNRIS data.</p>

<p class="lead">We'd love to hear from you as you browse the new site. Don't hesitate to [contact us](contact) and let us know if everything is working smoothly, tell us any if anything isn't looking right or even if you just want to give us some virtual high-fives.</p>

<p class="lead">Now on to what's new.</p>

## Dive Deep into the Data Catalog

<p class="lead"><img class="pull-right" src="images/updates/new-website/catalog-sample.jpg" alt="a sample of the data catalog"> The most prominent addition to our site is the [Data Catalog](data-catalog). While much of the data has been available at TNRIS for some time, this is the first time that all of it has been catalogued and organized for easy access and exploration online.</p>

Each dataset has a clear template and samples of what data will look like, with descriptions, selected metadata and other details.

Included on each page are also all the ways the data can be accessed. You'll be able to tell right away if you can search and [download online](data-download) via our website; custom order through our [Research and Distribution](maps-and-data/research-and-distribution) services; or load the data as an [online map service](maps-and-data/online-mapping-services).

Across the site, you'll also run into **data cards** that link to data sets when they are referenced in articles or on other pages, so you'll know right away where to find the data that is being referred to.
{{m.catalog_data_card('elevation-lidar/capcog-2007-140cm')}}

In the near future, stay posted as we roll out more robust search functionality that will make exploring our data even easier.

## Bringing More to Our Front Page

<p class="lead">As always, we will keep you updated on the latest projects and features happening at TNRIS, but we hope you'll find a bigger picture of what's happening at TNRIS and around the state.</p>

The front page will be the portal to our latest major initiatives, from Imagery projects to the Texas GIS Forum. Our latest training courses will be available and we'll have more ...

### Data Spotlights Reveal the Story Behind Striking Data

<p><img class="pull-right" src="images/updates/new-website/data-spot-highlight.jpg" alt="Some highlighted images from data spotlights in perspective"> As maps and data geeks, sometimes, we just want to share interesting images or maps that looks cool and highlights the ways in which data represents and interacts with our expansive Texas geography. Data spotlights will be a new way for us to do that and share something with the TNRIS user commmunity.</p>

We'd also love to invite our fellow geospatial data aficionados to share maps and data that they would like to highlight, especially from across our community of state agencies. [Contact us](contact) if you have a Data Spotlight you'd like to pitch to us.

## Follow Statewide Geospatial Coordination Through the Geographic Information Office

TNRIS, as part of it's legislative mandate, is also the home of the state's [Geographic Information Office](geographic-information-office).

Charged with fostering GeoSpatial collaboration throughout the state, you can keep track of the publically open meetings, as well as catch updates regarding ongoing projects from the **Director, Richard Wade**, and **Deputy Director, Felicia Retiz**.

<ul class="gio-stories-list">
  {% for gio_item in geographic_information_office %}
    {% if loop.index <= 2 %}
      <li class="media horizontal">
        <div class="media-left">
          <a href="{{m.link(gio_item.preserved)}}"><img  src="{{gio_item.thumbnail}}" alt="Thumbnail image for {{gio_item.title}}"></a>
        </div>
        <div class="media-body">
          <time>{{ gio_item.date|date('F jS, Y') }}</time>
          <h4 class="media-heading">
          <a href="{{m.link(gio_item.preserved)}}">{{ gio_item.title }}</a></h4>
        </div>
      </li>
    {% endif %}
  {% endfor %}
</ul>

## ...And More to Come!
<p class="lead">This is just the tip of the iceberg, we have plans to continue enhancing and expanding our ability to serve the public and Texas's geospatial community. TNRIS's goal is to provide the highest caliber of geospatial services for the people of Texas.</p>

We encourage you to reach out and [Contact us](contact) and let us know how we can continually strive for excellence in that pursuit.
