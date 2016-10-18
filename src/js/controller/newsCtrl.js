var app = require('../app')

// 调用Api 服务
app.registerController('newsCtrl', ['$scope', 'News', function($scope, News){
  News.query(function(data){
    $scope.news = data;
  });

  $scope.numPages = 8;
  $scope.currentPage = 1;

  // 删除数据
  $scope.remove = function($event, news){
    //..... 确认删除
    //
    
    // 删除请求
    News.remove({id: news.id}, function(data){
      console.log(data);
    });
  };
}]);


app.registerController('newsDetailCtrl', ['$scope', 'news', 'News', function($scope, news, News){
  $scope.news = news;
}]);

app.registerController('newsSaveCtrl', ['$scope', 'news', 'News', '$state', function($scope, news, News, $state){
  $scope.news = news;
  $scope.save = function($event){
    $scope.newsForm.submited = true;

    if($scope.newsForm.$invalid){
      return ;
    }else{
      // POST 数据
      // 
      console.log($scope.news);
      News.update({}, 
        angular.extend({},$scope.news, {_id: undefined}), 
        function(data){
          $state.go('news.list')
        });
    }
  };
}]);
