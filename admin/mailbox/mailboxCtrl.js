'use strict';

angular.module('newApp')
  .controller('mailboxCtrl', ['$scope', 'mailBoxService', 'dataService', function ($scope, mailBoxService, dataService) {
      $scope.$on('$viewContentLoaded', function () {
          mailBoxService.init();

          $scope.test = "Hello Test";

          dataService.getMailList().success(function(data) {
          
          $scope.$evalAsync(function () {
            $scope.emails = [];
          
          for(var i=0; i<data.length; i++) {
            $scope.emails.push({
                avatar: '../../../assets/global/images/avatars/avatar4_big.png',
                sender: data[i].Sender,
                subject: data[i].Subject,
                date: data[i].CreatedAt,
                content: data[i].HtmlMessage
            })
          }

          
          });
        });
      });



  }]);
