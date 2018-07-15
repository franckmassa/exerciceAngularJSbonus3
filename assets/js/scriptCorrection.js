var form = angular.module('form',['ngRoute']);
//à l'ouverture de la page index création du tableau qui récupèrera les données
form.run(['$rootScope',function($rootScope){
  $rootScope.subjects = [];
  $rootScope.lastnames = [];
  $rootScope.emails = [];
  $rootScope.texts = [];
}]);
//affichage des différentes vues
form.config(function($routeProvider){
  $routeProvider
    .when('/', {templateUrl: 'views/form.html', controller: 'formCtrl'})
    .when('/mailcontent/:index', {templateUrl: 'views/mailContent.html', controller: 'mailContentCtrl'})
    .otherwise({redirectTo: '/'});
  });
//controller de la vue form.html
form.controller('formCtrl',['$scope', '$rootScope', function($scope, $rootScope){
  //affichage du message d'erreur
  $scope.incorrectEntry = 'Saisie incorrecte';
  //regex du formulaire
  $scope.regexLastname = '^[a-zA-Zéèêëîïôç-]+$';
  $scope.regexEmail = '^[a-z0-9._-]+[@][a-z.-]+[.][a-z]{2,3}$';
  $scope.regexSubject = '^[a-zA-Z0-9&\'àéèêëîïôùç!?+-/_: ]+$';
  //fonction envoyant les données dans le tableau
  $rootScope.showSubject = function(){
    $rootScope.subjects.push($scope.userSubject);
    $rootScope.lastnames.push($scope.userLastname);
    $rootScope.emails.push($scope.userEmail);
    $rootScope.texts.push($scope.userText);
  };
}]);
//controller de la vue mailContent.html
form.controller('mailContentCtrl',['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams){
  //affichage des données récupérées dans le tableau par leur index
  $scope.subject = $rootScope.subjects[$routeParams.index];
  $scope.lastname = $rootScope.lastnames[$routeParams.index];
  $scope.email = $rootScope.emails[$routeParams.index];
  $scope.text = $rootScope.texts[$routeParams.index];
}]);
