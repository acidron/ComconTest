App = angular.module('ComconTest', []);
/**
 * API service
 */
App.factory('API', ['$q', '$timeout', function($q, $timeout) {
	var generateCar = function() {
		var cars = ['Mazda', 'Lexus', 'Accura', 'Chevrolet', 'Ford', 'Infinity', 'Dodge'];
		return cars[_.random(0, cars.length - 1)];
	};
	var generateMaritalState = function() {
		var states = ['divorced', 'married', 'single'];
		return states[_.random(0, states.length - 1)];
	};
	return {
		getTableData: function() {
			var deferred = $q.defer();
			$timeout(function() {
				deferred.resolve (
					[
						{genre: 'man', edu: 'low', q: 1443},
						{genre: 'man', edu: 'top', q: 987},
						{genre: 'man', edu: 'phd', q: 64},
						{genre: 'woman', edu: 'low', q: 1567},
						{genre: 'woman', edu: 'top', q: 1145},
						{genre: 'woman', edu: 'phd', q: 45}
					]
				);
			}, 1000);
			return deferred.promise;
		},
		getListData: function(page, genre, education) {
			var deferred = $q.defer();
			$timeout(function() {
				var data = [];
				for (i = 0; i < 10; i++) {
					data.push({
						marital: generateMaritalState(),
						car: generateCar(),
						latitude: _.random(20,60),
						longitude: _.random(20,60)
					});
				}
				deferred.resolve(data);
			}, 1000);
			return deferred.promise;
		}
	}
}]);

/**
 * Group table data by genre
 */
App.filter('GroupByGenre', function() {
	return function(input) {
		var output = {
			man: [],
			woman: []
		};
		_.forEach(input, function(item) {
			if (item.genre == 'man') {
				output.man.push(item);
			} else {
				output.woman.push(item);
			}
			delete item.genre;
		});
		return output;
	}
});


App.controller('TableCtrl', ['$scope', 'API', 'GroupByGenreFilter', function($scope, API, GroupByGenreFilter, ModalService) {
	API.getTableData().then(function(data) {
		$scope.table = GroupByGenreFilter(data);
	});

	$scope.showList = function(genre, edu) {
		$scope.popupApi.show(genre, edu);
	}
}]);

App.directive('popup', ['API', function(API) {
	return {
		scope: {
			api: '='
		},
		templateUrl: 'popupTpl.html',
		restict: 'E',
		link: function(scope, element) {
			element.css({display: "none"});
			scope.cursor = 0;
			scope.loadData = function(cursor) {
				scope.loading = true;
				scope.cursor = cursor;
				API.getListData(cursor, scope.paramsForFetchingData.genre, scope.paramsForFetchingData.edu).then(function(resolvedData) {
					scope.loading = false;
					scope.data = resolvedData;
				});
			};
			scope.api = {
				show: function(paramsForFetchingData) {
					scope.paramsForFetchingData = paramsForFetchingData;
					element.css({display: "block"});
					scope.loadData(0);
				},
				close: function() {
					scope.data = [];
					element.css({display: "none"});
				}
			};
		}
	}
}]);