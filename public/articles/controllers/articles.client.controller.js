//Invocar modo JavaScript 'strict'

'use strict';
//Crear el controller 'article'
angular.module('articles').controller('ArticleController', ['$scope', '$routeParams', '$location', 'Authentication', 'Articles',
	function($scope, $routeParams, $location, Authentication, Articles){
		//Exponer el service Authencation
		$scope.authentication = Authentication;

	//Crear un uevo metodo controller para crear nuevos articles
		$scope.create = function(){
			//Usar los campos para crear nuevos articles
			var article = new Articles({
				titulo: this.titulo,
				contenido: this.contenido
			});
			//usar el metodo '$Save' de article para enviar una peticion POST apropiada
			article.$save(function(response){
				//si un articulo fue creado de modo correcto, redireccionar al usuario a la pagina de articulo
				$location.path('articles/' + response._id);
			}, function(errorResponse){
				//En otro caso, presentar al usuario el mensaje de error
				$scope.error = errorResponse.data.message;
			});
		};

		//Crear un nuevo metodo controller para recuperar una lista de articulos
		$scope.find = function(){
			//usar el metodo 'query' de article´para enviar una peticion GET apropiada
			$scope.article = Articles.guery();
		};
		// Crear un nuevo metodo controller para recuperar un unico articulo
		$scope.findOne = function(){
			//Usar el metodo 'get' de article para enviar una peticion GET apropiada
			$scope.article = Articles.get({
				articleId: $routeParams.articleId
			});
		};

	//Crear un nuevo metodo controller para actualizar un unico article
		$scope.update = function() {
			//Usar el metodo '$update' de article para enviar una peticion Put apropiada
			$scope.article.$update(function() {
				//si un article fue actualizado de modo correcto, redirijir el user a la pagina del article
			$location.path('articles/' + $scope.article._id);
			}, function(errorResponse){
				//En otro caso, presentar al usuario el mensaje de error
				$scope.error = errorResponse.data.message;
			});	
		};
	
	//Crear un nuevo metodo controller para borrar un unico article
		$scope.delete = function(article){
			//Si un articulo fue enviado al metodo, borrarlo
			if(article){
				//Usar el metodo '$remove' del articulo para borrar el articulo
				article.$remove(function(){
					//Eliminar el articulo de la lista de articulos
					for(var i in $scope.articles){
						if($scope.articles[i] === article){
							$scope.articles.splice(i, 1);
						}
					}
				});
			} else {
				//En otro caso, usar el metodo '$remove' de article para borrar el article
				$scope.article.$remove(function(){
					$location.path('articles');
				});
			}

		};

		}
	]);