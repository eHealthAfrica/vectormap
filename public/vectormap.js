require('plugins/vectormap/vectormap.less');
require('plugins/vectormap/lib/vectormap_controller.js');
require('plugins/vectormap/lib/vectormap_directive.js');

function VectormapProvider(Private) {
  var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
  var Schemas = Private(require('ui/Vis/Schemas'));

  return new TemplateVisType({
    name: 'vectormap',
    title: 'Vector Map',
    description: 'Displays a map of shaded regions using a field containing a 2 letter country ' +
      ', or US state, code. Regions with more hits are shaded darker. Note that this does use the' +
      ' Elasticsearch terms aggregation, so it is important that you set it to the correct field.',
    icon: 'fa-map',
    template: require('plugins/vectormap/vectormap.html'),
    params: {
      defaults: {
        mapType: 'sierra_leone_2_mill',
        zoomOnScroll: false,
        colors: [{input: '#A0E2E2'}, {input:'#265656'}],
        min: 0,
        max: 125,
        tipNumberFormat: 'number'
      },
      editor: require('plugins/vectormap/vectormap_vis_params.html')
    },
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Metric',
        min: 1,
        max: 1,
        aggFilter: ['avg', 'sum', 'count', 'min', 'max', 'median', 'cardinality'],
        defaults: [
          { schema: 'metric', type: 'count' }
        ]
      },
      {
        group: 'buckets',
        name: 'segment',
        icon: 'fa fa-map',
        title: 'Geocode',
        min: 1,
        max: 1,
        aggFilter: ['terms', 'significant_terms']
      }
    ])
  });
}

require('ui/registry/vis_types').register(VectormapProvider);
