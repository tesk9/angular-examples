var exampleApp = angular.module("exampleApp", [])
  .controller("ExampleController", ["$scope", "$http", function($scope, $http) {
    $http.get('/public/content.json')
      .success(function(data) {
        $scope.content = data;
      })
      .error(function(err) {
        console.error(err);
      });
  }]);