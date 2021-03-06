(function() {

  'use strict';

  let map = {
    dst: { CHE: 1, DEU: 7, IRL: 41, USA: 699 },
    src: { IRL: 4, USA: 9 }
  };

  describe('Session Map Component ->', function() {

    // load the module and enable debug info (to access isolateScope)
    beforeEach(function() {
      angular.mock.module('moloch', function (_$compileProvider_) {
        _$compileProvider_.debugInfoEnabled(true);
      });
    });

    let scope, isolateScope, compiledTemplate, templateAsHtml, $timeout, $httpBackend;

    // Initialize and a mock scope
    beforeEach(inject(function(
      $compile,
      _$timeout_,
      $rootScope, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;

        scope = $rootScope.$new();

        scope.mapData     = map;

        let htmlString    = '<moloch-map map-data="mapData"></moloch-map>';

        let element       = angular.element(htmlString);
        compiledTemplate  = $compile(element)(scope);
        isolateScope      = compiledTemplate.isolateScope();

        scope.$digest();

        templateAsHtml    = compiledTemplate.html();

        spyOn(isolateScope, '$emit').and.callThrough();
    }));

    it('should render html with map data', function() {
      expect(templateAsHtml).toBeDefined();
      expect(scope.mapData).toBeDefined();
    });

    it('should render the map', function() {
      let mapContainer = compiledTemplate.find('.moloch-map-container');
      expect(mapContainer).toBeDefined();
      expect(mapContainer.length).toBeGreaterThan(0);

      let jvectormap = mapContainer.find('.jvectormap-container');
      expect(jvectormap).toBeDefined();
      expect(jvectormap.length).toBeGreaterThan(0);
    });

    it('should be able to toggle map', function() {
      isolateScope.toggleMap();
      expect(isolateScope.state.open).toBeTruthy();

      isolateScope.toggleMap();
      expect(isolateScope.state.open).toBeFalsy();
    });

    it('should be able to toggle src/dst countries', function() {
      isolateScope.toggleSrcDst('src');
      expect(isolateScope.state.src).toBeFalsy();
      isolateScope.toggleSrcDst('src');
      expect(isolateScope.state.src).toBeTruthy();

      isolateScope.toggleSrcDst('dst');
      expect(isolateScope.state.dst).toBeFalsy();
      isolateScope.toggleSrcDst('dst');
      expect(isolateScope.state.dst).toBeTruthy();
    });

  });

})();
