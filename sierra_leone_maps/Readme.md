### Integrate Sierra Leone Maps

follow [this instructions](http://d://github.com/manifestinteractive/jqvmap/tree/master/create)

and use the following sources and configuration files:

- source: download the shapefile [from this source](http://www.gadm.org/country)
- configurations: [see](./sierra_leone_maps/config)

Copy the files generated in the output folder to [the plugin folder containing the maps](../public/lib/jvectormap/maps)

Add the reference to the new map on the select options [on the visualization controls](../public/vectormap_vis_params.html)

### Update the ids to match the ids we use.

Since the ids are used to match aggregations results with locations,
update the map file with the ids that our software uses for Sierra Leone
[ids our software uses for Sierra Leone](https://github.com/eHealthAfrica/locations/blob/master/json/sierra_leone.json)
