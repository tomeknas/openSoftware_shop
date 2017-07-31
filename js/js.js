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
      if($scope.validate(product)){
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
      confirm('Are you sure you want to delete all the contents of your cart?');
      store.remove('cart');
      $scope.order=[];
      $scope.totalQty = 0 ;
      $scope.totalPrice = 0;
    };

    $scope.validate=function(product){
      var patternNumber = /^\d+$/;
      var patternPrice = /^\d*\.\d*$/;
      if(product.name && patternNumber.test(product.qty) && ( patternPrice.test(product.price)||patternNumber.test(product.price))){
        return true;
      }
      else{
        return false;
      }
    };
		

    
	}]);
