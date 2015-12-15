// start our angular module and inject userService
 angular.module('userCtrl', ['userService'])
 
 // user controller for the main page
 // inject the User factory
 .controller('userController', function(User) {
 
   var vm = this;
 
   // set a processing variable to show loading things
   vm.processing = true;
 
   // grab all the users at page load
   User.all()
     .success(function(data) {
 
       // when all the users come back, remove the processing variable
       vm.processing = false;
 
       // bind the users that come back to vm.users
       vm.users = data;
     });
    vm.deleteUser = function(id) {
      vm.processing = true;

      User.delete(id).success(function(data) {
        User.all().success(function(data) {
          vm.processing = false;
          vm.users = data;
        });
      });
    }
 })

 .controller('userCreateController',function(User,$location){
    var vm = this;

    //variable to hide/show elements of the view
    //differentiates between create or edit pages
    vm.type = 'create';

    //function to create a user
    vm.saveUser = function() {
      vm.processing = true;

      //clear the message
      vm.message = '';

      //use the create function in the userService
      User.create(vm.userData).success(function(data){
        vm.processing = false;

        //clear the form
        vm.userData = {};
        vm.message = data.message;
      });
    }
  })

    .controller('userEditController',function(Auth,User){
    var vm = this;

    //variable to hide/show elements of the view
    //differentiates between create or edit pages
    vm.type = 'edit';

    //function to save the user
    vm.saveUser = function() {
      vm.processing = true;

      //clear the message
      vm.message = '';
        //get the user data for the user you want to edit
    Auth.getUser().success(function(data){
          vm.user = data;
          console.log(vm.user);
        User.update(vm.user.username,vm.userData).success(function(data){
          vm.processing = false;

          vm.userData = {};

          //bind the message from API to vm.message
          vm.message = data.message;
        });
      });
    };
 });
