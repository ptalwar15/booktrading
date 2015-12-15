angular.module('bookService',[])
	.factory('Book',['$http',function($http){
		var bookFactory = {};
		bookFactory.getMyBooks = function(username) {
			return $http.get('/api/books/'+username);
		};

		bookFactory.addBook = function(newBook,username) {
			return $http.post('/api/books',{'newBook':newBook,'username':username})
		};
		bookFactory.getAllBooks = function() {
			return $http.get('/api/books');
		}
		return bookFactory;
	}])

	.service('Books',[function(){
		this.myBooks = [];
	}])