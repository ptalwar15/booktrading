angular.module('userService',[])

	.factory('User',['$http',function($http){

		//create a new object
		var userFactory = {};

		//get a single user
		userFactory.get = function(id) {
			return $http.get('/api/users/'+id);
		};

		//get all users 
		userFactory.all = function() {
			return $http.get('/api/users/');
		};

		//create a user 
		userFactory.create = function(userData) {
			return $http.post('/api/users',userData);
		};

	  // update a user
	   userFactory.update = function(username,userData) {
	     return $http.put('/api/users/',{'username':username,'password':userData.currentPassword,'newPassword':userData.newPassword,'city':userData.city,'state':userData.state});
	   };
	 
	   // delete a user
	   userFactory.delete = function(id) {
	     return $http.delete('/api/users/' + id);
	   };
	 
	   // return our entire userFactory object
	   return userFactory;

	}]);
	