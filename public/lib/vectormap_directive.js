var _ = require('lodash');
var $ = require('jquery');
var numeral = require('numeral');

// jvectormap - version 2.0.3
require('plugins/vectormap/lib/jvectormap/jquery-jvectormap.min');
require('plugins/vectormap/lib/jvectormap/jquery-jvectormap.css');

var module = require('ui/modules').get('vectormap');

module.directive('vectormap', function () {
  function link (scope, element) {

    function onSizeChange() {
      return {
        width: element.parent().width(),
        height: element.parent().height()
      };
    }

    function displayFormat(val) {
      var formats = {
        number: '0.000',
        percentage: '0.000%'
      }

      return formats[val] || formats.number;
    }

    scope.$watch('data',function(){
      render();
    });

    scope.$watch('options',function(){
      render();
    });

    scope.$watch(onSizeChange, _.debounce(function () {
      render();
    }, 250), true);

    // Re-render if the window is resized
    angular.element(window).bind('resize', function(){
      render();
    });

    function colors() {
      return _(scope.options.colors)
              .map('input')
              .compact()
              .value()
    }

    function render() {
      element.css({
        height: element.parent().height(),
        width: '100%'
      });

      element.text('');

      // Remove previously drawn vector map
      $('.jvectormap-zoomin, .jvectormap-zoomout, .jvectormap-label').remove();

      require(['plugins/vectormap/lib/jvectormap/maps/map.' + scope.options.mapType], function () {
        element.vectorMap({
          map: scope.options.mapType,
          regionStyle: { initial: { fill: '#8c8c8c' }},
          zoomOnScroll: scope.options.zoomOnScroll,
          backgroundColor: null,
          series: {
            regions: [{
              values: scope.data,
              scale: colors(),
              min: scope.options.min,
              max: scope.options.max
            }]
          },
          onRegionTipShow: function(event, el, code) {
            if (!scope.data) { return; }

            var count = _.isUndefined(scope.data[code]) ? 0 : scope.data[code];
            if (scope.options.tipNumberFormat == "percentage")
              count = count / 100 // turn off library multiplying by 100
                                  // see https://github.com/adamwdraper/Numeral-js/issues/329
            el.html(el.html() + ": " + numeral(count).format(displayFormat(scope.options.tipNumberFormat)));
          }
        });
      });
    }
  }

  return {
    restrict: 'E',
    scope: {
      data: '=',
      options: '='
    },
    link: link
  };
});
