$(document).ready(function() {
    $( "#statistic_btn" ).click(function() {
		$(".header").html('<div class="link-icon"><img src="images/fi-rr-chart-pie.svg" alt=""></div><div class="link-text">Статистика</div>');
		// $.ajax({
		// 	type: "POST",
		// 	url: "",
		// 	data: {},
		// 	dataType: "html",
		// 	success: function(data){
				
		// 	}
		// });
	});
	$( "#history_btn" ).click(function() {
        $(".header").html('<div class="link-icon"><img src="images/fi-rr-time-past.svg" alt=""></div><div class="link-text">История</div>');
		// $.ajax({
		// 	type: "POST",
		// 	url: "",
		// 	data: {},
		// 	dataType: "html",
		// 	success: function(data){
				
		// 	}
		// });
	});
	$( "#orders_btn" ).click(function() {
        $(".header").html('<div class="link-icon"><img src="images/fi-rr-document.svg" alt=""></div><div class="link-text">Заявки</div>');
		// $.ajax({
		// 	type: "POST",
		// 	url: "",
		// 	data: {},
		// 	dataType: "html",
		// 	success: function(data){
				
		// 	}
		// });
	});
	$( "#sklad_btn" ).click(function() {
        $(".header").html('<div class="link-icon"><img src="images/fi-rr-apps.svg" alt=""></div><div class="link-text">Склад</div>');
		// $.ajax({
		// 	type: "POST",
		// 	url: "",
		// 	data: {},
		// 	dataType: "html",
		// 	success: function(data){
				
		// 	}
		// });
	});
	$( "#printers_btn" ).click(function() {
        $(".header").html('<div class="link-icon"><img src="images/fi-rr-print.svg" alt=""></div><div class="link-text">Принтеры и МФУ</div>');
		// $.ajax({
		// 	type: "POST",
		// 	url: "",
		// 	data: {},
		// 	dataType: "html",
		// 	success: function(data){
				
		// 	}
		// });
	});
	$( "#settings_btn" ).click(function() {
        $(".header").html('<div class="link-icon"><img src="images/fi-rr-settings.svg" alt=""></div><div class="link-text">Настройки</div>');
		// $.ajax({
		// 	type: "POST",
		// 	url: "",
		// 	data: {},
		// 	dataType: "html",
		// 	success: function(data){
				
		// 	}
		// });
	});
	$( "#cartridge_add" ).click(function() {
        $("#cartridge_block").append('<div class="item"><div class="tooltip" data-text="TK-1170"><img src="images/tk-1170.png" alt=""></div></div>');
		// $.ajax({
		// 	type: "POST",
		// 	url: "",
		// 	data: {},
		// 	dataType: "html",
		// 	success: function(data){
				
		// 	}
		// });
	});
});