angular.module('mailbord').controller('mailbox','$scope', 'dataService', function($scope, dataService) {
    $scope.emails = [];

    dataService.getMailList().success(function(data) {
        for(var i=0; i<data.length; i++) {
            $scope.emails.push({
                sender: data[i].Sender,
                subject: data[i].Subject,
                date: data[i].CreatedAt,
                content: data[i].HtmlMessage
            })
          }
    });
});