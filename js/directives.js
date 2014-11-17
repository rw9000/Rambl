// Map
rambl.directive('mapael', function() {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		template: '<div class="map-container"><div class="map"></div></div>',
		link: function (scope, element) {
			element.mapael({
				map : {
					name : "world_countries_2",
					defaultArea: {
						attrs : {
							fill: "#0B2D45",
							stroke: "transparent",
							'stroke-width': 0
						},
						attrsHover : {
							fill: "#308352",
							animDuration : 600
						}
					}
				}
			});
		}
	};
});

// Modal
rambl.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '=',
    },
    replace: true,
    transclude: true,
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    templateUrl: '../partials/modal.html' // See below
  };
});