 angular.module('app.routes', ['ngRoute'])
 
 .config(function($routeProvider, $locationProvider) {
 
   $routeProvider
 
     // home page route
     .when('/', {
       templateUrl : 'app/views/pages/home.html',
       controller: 'mainController',
       controllerAs: 'main'
     })
 	  .when('/signup',{
      templateUrl: 'app/views/pages/signup.html',
      controller: 'userCreateController',
      controllerAs: 'user'
    })
 	// login page
   .when('/login', {
     templateUrl : 'app/views/pages/login.html',
       controller  : 'mainController',
       controllerAs: 'login'
   })
   .when('/mybooks',{
      templateUrl: 'app/views/pages/books/mybooks.html',
      controller: 'bookController',
      controllerAs: 'book'
   })
   .when('/allbooks',{
      templateUrl: 'app/views/pages/books/allbooks.html',
      controller: 'allBookController',
      controllerAs: 'book'
   })
   .when('/settings',{
      templateUrl: 'app/views/pages/settings.html',
      controller: 'userEditController',
      controllerAs: 'user'
   })
   // show all users
 	.when('/users', {
	   templateUrl: 'app/views/pages/users/all.html',
	   controller: 'userController',
	   controllerAs: 'user'
	 })
  // form to create a new user
 // same view as edit page
 .when('/users/create', {
   templateUrl: 'app/views/pages/users/single.html',
   controller: 'userCreateController',
   controllerAs: 'user'
 })

 // page to edit a user
 .when('/users/:user_id', {
   templateUrl: 'app/views/pages/users/single.html',
   controller: 'userEditController',
   controllerAs: 'user'
 })
 .otherwise({redirectTo:'/'});
   // get rid of the hash in the URL
   $locationProvider.html5Mode(true);
 
 });