$(document).ready(function() {
  $(".login").addClass('animate__backInUp');
  $( ".btn-access" ).on( "click", function() {
    $(".login").removeClass('animate__backInUp');
      let login = $("#login").val();
      if(login == ""){
        $(".login").toggleClass('animate__shakeX');
        
      }else{
        $(".login").toggleClass('animate__backOutDown');
      }
  });
});