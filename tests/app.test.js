describe('ComconTestTests', function () {
	beforeEach(angular.mock.module('ComconTest'));
	
	describe('controller', function() {	
		beforeEach(angular.mock.inject(function(_$controller_) {
			$controller = _$controller_;

		}));

		it('tableCtrl should has showList scope method', function() {
			var $scope = {};
			var controller = $controller('TableCtrl', {$scope: $scope});
			expect($scope.showList).toBeDefined();
		});
	});

	describe('filter', function() {
		beforeEach(angular.mock.inject(function(_$filter_){
			$filter = _$filter_;
		}));

		it('groupByGenre filter should divide array by genres', function() {
			var filter = $filter('GroupByGenre');
			var inputData = [
				{genre: 'man', name: 'A'},
				{genre: 'woman', name: 'B'}
			];
			var outData = {
				man: [{name: 'A'}],
				woman: [{name: 'B'}]
			};
			expect(filter(inputData)).toEqual(outData);
		});
	});

	describe('API service', function() {
		var API;
		beforeEach(function() {
			module(function($provide) {
				$provide.value('$q', {defer: jasmine.createSpy()});
			});

			module(function($provide) {
				$provide.value('$timeout', {});
			});

			inject(function($injector) {
				API = $injector.get('API');
			});
			
		});

		it('should have request methods', function() {
			expect(API.getTableData).toBeDefined();
			expect(API.getListData).toBeDefined();
		});
	});
});