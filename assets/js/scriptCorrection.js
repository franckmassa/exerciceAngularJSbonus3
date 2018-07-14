var form = angular.module('form',['ngRoute']);
form.run(['$rootScope',function($rootScope){
  $rootScope.subjects = [];
  $rootScope.lastnames = [];
  $rootScope.emails = [];
  $rootScope.texts = [];
}]);
form.config(function($routeProvider) {
  $routeProvider
    .when('/', {templateUrl: 'views/form.html', controller: 'formCtrl'})
    .when('/mailcontent/:index', {templateUrl: 'views/mailContent.html', controller: 'mailContentCtrl'})
    .otherwise({redirectTo: '/'});
  });
form.controller('formCtrl',['$scope', '$rootScope', function($scope, $rootScope){
  $rootScope.showSubject = function(){
    $rootScope.subjects.push($scope.userSubject);
    $rootScope.lastnames.push($scope.userLastname);
    $rootScope.emails.push($scope.userEmail);
    $rootScope.texts.push($scope.userText);
  };
}]);
form.controller('mailContentCtrl',['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams){
  $scope.subject = $rootScope.subjects[$routeParams.index];
  $scope.lastname = $rootScope.lastnames[$routeParams.index];
  $scope.email = $rootScope.emails[$routeParams.index];
  $scope.text = $rootScope.texts[$routeParams.index];
}]);
