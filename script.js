var data = [];
var un;
var message_global;
var message_x;
var index_message;
var message_reply = [];
var temp = localStorage.getItem("usersinfo");
var data = JSON.parse(temp);
angular.element(document).ready(function(){
 // localStorage.setItem("usersinfo",JSON.stringify(data));
  if (localStorage.getItem("usersinfo") == null)
  {
    localStorage.setItem("usersinfo","[]");
  }
})


var app = angular.module('signup', ["ngRoute"]);

app.controller('signupCtrl',function($scope,$window,$rootScope, $http){
  $http.get("message.json").then(function (response) {
      message_global = response.data;
      localStorage.setItem('messages',JSON.stringify(message_global));
    });
 
  $scope.creataccnt = function(){
    temp = localStorage.getItem("usersinfo");
    data = JSON.parse(temp);
    $scope.user_info = {
      "UserName": $scope.uname,
      "Password": $scope.pword,
      "Firstname": $scope.fname,
      "Lastname": $scope.lname,
      "Email": $scope.eml,
      "Phone": $scope.phn,
      "Location": $scope.lct
    };
    for(i = 0;i < data.length;i++){
      if(data[i].UserName==$scope.uname){
        alert("Username occupied");
        return;
      }
    }
    data.push($scope.user_info)
    localStorage.setItem("usersinfo",JSON.stringify(data));
    window.location.href = "#/login"
  }
  
  $scope.login_home = function()
  {
    temp = localStorage.getItem("usersinfo");
    data = JSON.parse(temp);
    if (data.length > 0)
    {
      for (i = 0;i < data.length;i++)
      {
        if(data[i].UserName == $scope.loginname && data[i].Password == $scope.loginpassword)
        {
          localStorage.setItem("userID", i.toString());
          $window.open('home.html','_self');
          return;
        }
      };
      alert('Invalid username or password')
    }
    else
    {
      alert("No user registered")
    }
  }
})

app.config(function($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl : "login.html"
    })
    .when("/signup", {
        templateUrl : "signup.html",
        controller: "signupCtrl"
    })
    .when("/home", {
        templateUrl : "home.html",
    })
    .when("/messagedetail", {
        templateUrl : "messagedetail.html",
        controller:'customersCtrl'
    })
    .when("/profile", {
        templateUrl : "profile.html",
        controller: "profileCtrl"
    })
    .when("/message", {
        templateUrl : "message.html",
        controller:'customersCtrl'
    })
});

app.controller('profileCtrl',function($scope){
  $scope.user = data[localStorage.getItem("userID")];
  
  $scope.update = function(){
    data[localStorage.getItem("userID")].UserName = $scope.user.UserName;
    data[localStorage.getItem("userID")].Password = $scope.user.Password;
    data[localStorage.getItem("userID")].Firstname = $scope.user.Firstname;
    data[localStorage.getItem("userID")].Lastname = $scope.user.Lastname;
    data[localStorage.getItem("userID")].Email = $scope.user.Email;
    data[localStorage.getItem("userID")].Phone = $scope.user.Phone;
    data[localStorage.getItem("userID")].Location = $scope.user.Location;
    localStorage.setItem("usersinfo",JSON.stringify(data));
  }
});

app.controller('customersCtrl', function($scope) {
      //$scope.myData = message_global;
      temp2 = localStorage.getItem('messages');
      var impoindx = localStorage.getItem('messageindex');
      $scope.myData = JSON.parse(temp2);
      $scope.y = $scope.myData[impoindx];
      
      $scope.important = function(){
        //var local = JSON.parse(localStorage.getItem('messages'));
        
        if($scope.y.important==="0")
        {
          $scope.y.important="1";
        }
        else
        {
          $scope.y.important="0";
        }
        localStorage.setItem("messages",JSON.stringify($scope.myData));
      }

      //console.log($scope.y);
      $scope.delete = function(){
        var temp2 = localStorage.getItem('messageindex');
        $scope.myData.splice(temp2,1);
        localStorage.setItem('messages',JSON.stringify($scope.myData));
        window.location.href = "#/message"
      }
      
      $scope.back = function(){
        window.location.href = "#/message"
      }
      
      $scope.show = function(x){
        message_x = x;
        var local = JSON.parse(localStorage.getItem('messages'));
        for (j = 0;j<local.length;j++){
          if (local[j].recipient==x.recipient && local[j].created_at==x.created_at)
          {
            localStorage.setItem("messageindex", j);
          }
        }
        window.location.href = "#/messagedetail";
      }
      
      $scope.reply = function(){
        message_reply.push($scope.replybox);
        $scope.replyedmessage = message_reply;
      }
        
});