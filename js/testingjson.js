
$(function (){
   var content = [];
   var $name = $("#name"); 
   var $telephone = $("#telephone");
   var $orders = $('#orders');
   var showError = $("#showErro");

   $("#showIdeal").mouseover(function() {
      $(this).append( "<img src='img/pop.png'/>" );
   });
   $(".btn-info").one('click',function(){
      $(".orderMealpage").removeClass("hide").fadeIn();                        
   });
   function addOrder(order) {
      $orders.append("<li> name: " + order.name + ", table:" + order.table + "</li>" );
   }   
   $.ajax({   	
        type: 'GET',
        url: 'data/RestaurantTables.json',
        success: function(tables){
               $.each(tables,function(i,table){
                var tableId = table.TableId;
                var tableName = table.TableName;
                var tableMenu = table.TableMenu;
                var tableFor = table.TableFor;
                content.push("<ul><li>" + tableName + "<span>" + tableId + "</span>" + "</li></ul>");                  
                  $(".btn-warning").one('click',function(){
                      $("#tables3").append("<ul><li>" + tableMenu + "</ul></li>");
					  $(".choiceTablepage").removeClass("hide").fadeIn("slow");
                  });				  
               });     
                $("#tables").html(content);                
        },
        error: function(){
            alert('error loading');
        }         	         
           		    	                         
    });//end of ajax get
	
	$("#add-order").on('click', function() {
      var order = {
        name: $name.val(),
        telephone: $telephone.val()
      };
      $.ajax({
        type: "GET",
        url: 'data/orders.json',
        data: order,
        success: function(Order) {
          $orders.append("<li> your name: " + order.name + ", Your telephone:" + order.telephone + "</li>" );
			      $(".thankyoupage").append("<h2>Thank you ," + "<span>" + order.name + "</span>" + " ,for your purchase");
          },
          error: function() {
            alert("error loading to order");
          }
      });	  
  });//end of add-order button action
	  
  $("#choiceTable").on('click', function(){
      var nameChoice = $("input#choicename").val();
		  var tableChoice = $("input[type='checkbox']:checked").val();
        if($("input[type='checkbox']").is(":checked") && $(nameChoice) !== 'undefined' )  {  
          $(".showTable").fadeIn().append("<h4>" + nameChoice + " ,your choice is : " + tableChoice + "</h4>");
            $(".orderMealpage").removeClass("hide").fadeIn("slow");			
          }else {
            $(".showTable").fadeIn().append("<h4>Please choice your table & your name</h4>");
            $(".orderMealpage").addClass("hide");			
          }         
  });
		
  $("#deleteTable").on('click', function(){
		  var nameChoice = $("input#choicename").val();
	    var tableChoice = $("input[type='checkbox']:checked").val();	
		  if( nameChoice.length > 0 || tableChoice !== undefined ) {
			  $("input#choicename").val('');
              $(".showTable").fadeOut();			  
		  } else {
			$showError.after(function(){
				var errorMessage = "Please fill your info";
				return "<h4>" + errorMessage + "</h4>";
			});  
		  }
	});	

}); 
