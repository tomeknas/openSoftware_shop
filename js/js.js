'use strict'

var app = angular.module('app', ['angular-storage']);
	app.controller('ctrl', ['$scope', 'store', function($scope, store){
		
    var inBasket=0;
    var qa=0;
    if (store.get('cart')) {
          $scope.order = store.get('cart'); 
          for (var i = 0; i < $scope.order.length; i++){
        inBasket += $scope.order[i].qty*$scope.order[i].price;
        qa += parseInt($scope.order[i].qty);

          };
        }else{
          $scope.order=[];
        }
    $scope.totalPrice = inBasket;
    $scope.totalQty = qa;



    $scope.addProduct = function(product){
          var wzor = /^[0-9]+$/;
          if(product.name && wzor.test(product.qty) && wzor.test(product.price)){

              $scope.order.push({
              name:product.name,
              qty:product.qty,
              price:product.price 
            });
              $scope.summ = product.qty*product.price;
              $scope.product = [];
              $scope.totalPrice += $scope.summ;
              $scope.totalQty += parseInt(product.qty);
              store.set('cart', $scope.order);
          }
            else{
              return false;
            }
   };

    
    $scope.clearBasket=function(){

    }
		

    
	}]);
