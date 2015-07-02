// function login(){
// 	// alert("here");
// 	var data = $('#sign_div').serialize();
// 	$.ajax({                                                                                                                           
// 	     type:"POST",                                                                                                                    
// 	     url: "/loginself",                                                                                                    
// 	     data: data,                                                                                     
// 	     success: function(response){                                                                      
// 	     	console.log(response['success']);
// 	     	console.log(typeof(response));
// 	     	if (response['success']=='True')
// 	     		window.location = response.next
// 	     	else
// 	     		alert('Username or Password Incorret')
// 	     		// window.location = response.next 
// 	     	// window.location = response; 
// 	     	// window.location = "/"                                                                                                          
// 	     },                                                                                                                              
// 	     error: function(xhr, ajaxOptions, thrownError){
// 	      alert( $('#login_error').text('Username already taken. Please select another one.'));
// 	  	}, 
// 	 });  

// }

competitorsApp.controller('MainCtl',['$scope','$http',function($scope,$http){
	$scope.submit = function(){
	var data = $('#signinForm').serialize();
	console.log(data);
	$.ajax({                                                                                                                           
	     type:"POST",                                                                                                                    
	     url: "/loginself",                                                                                                    
	     data: data,                                                                                     
	     success: function(response){                                                                      
	     	console.log(response['success']);
	     	console.log(typeof(response));
	     	if (response['success']=='True')
	     		window.location = response.next
	     	else
	     		alert('Username or Password Incorret')                                                                                                   
	     },                                                                                                                              
	     error: function(xhr, ajaxOptions, thrownError){
	      	alert( $('#login_error').text('Username already taken. Please select another one.'));
	  	}, 
	 });  
	}


}])