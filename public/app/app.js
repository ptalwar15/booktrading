 angular.module('bookTradingApp', [
   'ngAnimate',
   'app.routes', 
   'authService', 
   'mainCtrl', 
   'userCtrl', 
   'bookCtrl', 
   'userService',
   'bookService'
 ])

 //application configuration to integrate token into requests
 .config(function($httpProvider){
 	//attach our auth interceptor to the http requests
 	$httpProvider.interceptors.push('AuthInterceptor');
 })

 //The httpProvider will now attach the token to each request.