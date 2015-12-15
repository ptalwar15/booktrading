angular.module('bookCtrl',['userService','bookService'])
	.controller('bookController',['$rootScope','Auth','Book','Books',function($rootScope,Auth,Book,Books){
		var vm = this;
		vm.message="";
		vm.newBook="";
		vm.isLoading=true;
		vm.Books=Books;
		//check to see if user is logged in on every request
		Auth.getUser().then(function(response){
					vm.user = response.data;
					//console.log(vm.user);
					Book.getMyBooks(vm.user.username).then(function(response){
						vm.isLoading=false;
						//console.log(response.data);
						vm.Books.myBooks = response.data;
					});
		});
		vm.addBook = function() {
				vm.isLoading=true;
				Book.addBook(vm.newBook,vm.user.username).success(function(data){
					vm.isLoading=false;
					vm.newBook="";
					//console.log(data);
					vm.message = data.message;
					Book.getMyBooks(vm.user.username).success(function(data){
						//console.log(data);
						vm.Books.myBooks = data;
					});
				});
		};
		
		
		

	}])

	.controller('allBookController',['Book','Books',function(Book,Books){
		var vm = this;
		vm.Books = Books;
		Book.getAllBooks().success(function(data){
			vm.Books.allBooks = data;
		})
	}])