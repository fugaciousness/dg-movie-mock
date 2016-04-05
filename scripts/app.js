(function () {
	var dgMovieApp = angular.module('dgMovieApp',[]);

	dgMovieApp.controller('MovieController', ['$scope', '$http', function($scope, $http ){
		$scope.movieList = [];
		$scope.movieDetailsList = [];
		$scope.toggle1 = false;
		$scope.toggle2 = false;
		
		$http.get('https://www.omdbapi.com/?s=Batman')
			.then( function(response){
				//get the list of movies
				$scope.movieList = response.data.Search;
				//iterate through each of them to get the movie id
				$scope.movieList.forEach($scope.getMovieDetails);				 
			})
			.catch(function(response){
				console.error('no movies returned');
			});	
		
		//get the details for each movie and save them in an array
		$scope.getMovieDetails = function( movieResult ){
			//get the id
			var id=movieResult.imdbID;
			//construct the url for the details
			var url = 'http://www.omdbapi.com/?i=' + id;
			$http.get(url)
			.then( function(response){
				//build array of movie details
				$scope.movieDetailsList.push(response.data);						 
			})
			.catch(function(response){
				console.error('no movie details returned');
			});	
		};
	}]);

	//movie tile element that displays detail content and links to IMDB
	dgMovieApp.directive('movieTile', function() {

		//on button click, launch new browser window for that movie
		var link = function(scope, element, attr) {
			scope.linkToIMDB = function(){
				scope.imdbURL = 'http://www.imdb.com/title/'+scope.movie.imdbID;
				window.open(scope.imdbURL);
			},
			//create the poster locally, in case there is an issue with accessing it live
			scope.createPoster = function(){
				scope.poster = './content/posters/'+scope.movie.imdbID+'.jpg';
				return( scope.poster );
			}
		};
 
		return{
			restrict:'E',
			templateUrl:'content/html/movieTile.html',
			link: link			
		};
	});

}());