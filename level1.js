var animationframeID,
movementID,
movementID_array = [],
count = 0,
count_runs = 0,
collision_count = 0,
array_of_ids = [],
runs = 100000,
distance = 0,
ids,
listen,
bg_speed,
bg_speed_proxy,
errors = 0,
retrieved = [];

$(document)
.ready(function(){


$.get("get_score.php", function(data) {
  console.log(data);
}, "json" );


	$("#instr, #gameover, #proxy_page, #black_page, #instruction").css({
		"margin-left": -($(".window").width()/2),
		"margin-top": -($(".window").height()/2)
	})
	$("#plus").css({
		"margin-left": -($(".window").width()/2),
		"margin-top": -($(".window").height()/20)
	})
	$("#highscore_table").css({
		"margin-left": -($("#highscore_table").width()/2),
		"margin-top": -($("#highscore_table").height()/2)
	})
	if(localStorage["lastscore"] > 0){
		$("#lastscore").text(localStorage["lastscore"])
		} else {
		$("#lastscore").text("NA")
	}
	$("#highscore1").text(65.123);
	find_ids($(".car_div"));
	set_player($("#player"));
	init_cars($("#car_div1"));
	init_cars($("#car_div2"));
	init_cars($("#car_div3"));
	init_cars($("#car_div4"));
	init_cars($("#car_div5"));
	init_cars($("#car_div6"));
})
.keydown(function(e){
	var code = e.keyCode || e.which;
	if(code == 66){
		listen = true;
		$("#instr").hide();
		instruction();

	}
	if(listen == true){
		var code = e.keyCode || e.which;
		count++
		if(count < 2){
			if(collision_count < 1){
				switch(code){
				case 37:
					left(12);
					break
				case 39:
					right(12);
					break
				}
			} else if(collision_count > 1 && collision_count < 2){
				switch(code){
				case 37:
					left(8);
					break
				case 39:
					right(8);
					break
				}
			} else {
				switch(code){
				case 37:
					left(5);
					break
				case 39:
					right(5);
					break
				}
			}
		}
	}
})
.keyup(function(e) {
		var code = e.keyCode || e.which;
		count = 0
		if(code == 37 || code == 38 || code == 39 || code == 40){
			cancelAnimationFrame(animationframeID);
		}
})

function move_car(object, speed){
	movementID = requestAnimationFrame(function(){
		move_car(object, speed)
	});
	collision_detector();
	object.css({
			top: "+=" + speed
		 });
		 get_boundary(object);
		 if(object_bottom > $(window).height()){
			 reset_car(object);
		 }
}

function car_type(object){
	type = shuffle([1, 2, 3, 4, 5])[0];
	switch(type){
	case 1:
		object.css({
		background: "transparent url(images/meteo1.png) no-repeat"
		})
		break;
	case 2:
		object.css({
		background: "transparent url(images/meteo2.png) no-repeat"
		})
		break;
	case 3:
		object.css({
		background: "transparent url(images/meteo3.png) no-repeat"
		})
		break;
	case 4:
		object.css({
		background: "transparent url(images/meteo4.png) no-repeat"
		})
		break;
	case 5:
		object.css({
		background: "transparent url(images/meteo5.png) no-repeat"
		})
		break;
	}
}

function reset(object){
	if(count_runs == runs){
		confirm("Your universe is " + distance + " billion kilometers wide (??!!)")
		clearInterval(pointsInterval)
		disappear()
		cancelAnimationFrame(animationframeID);
		localStorage["lastscore"] = distance;
		$("#player, #background").spStop();
		setTimeout(function(){
		$("#player").toggle("explode");
		}, 1000)
		window.location = "level1.html"
	}
	count_runs++
	var posx = randomdigit(-90, 90);
	var posy = randomdigit(-10, -5);
	object.css({
			"left" : posx + "%",
			"top" : posy + "%",
			"display" : "block"
			});
}

function reset_car(object){
	if(count_runs == runs){
		confirm("Your universe is " + distance_text + " billion kilometers wide (??!!)")
		clearInterval(pointsInterval)
		disappear()
		cancelAnimationFrame(animationframeID);
		localStorage["lastscore"] = distance_text;
		$("#player, #background").spStop();
		setTimeout(function(){
		$("#player").toggle("explode");
		}, 1000)
		window.location = "level1.html"
	}
	add_cars(distance)
	count_runs++
	car_type(object);
	var posx = randomdigit(7, 93);
	var posy = randomdigit(-50, -10);
	object.css({
			"left" : posx + "%",
			"top" : posy + "%",
			"display" : "block"
			});
}

function add_cars(distance){
	if(distance > 10 && distance <= 20){
		$("#car_div7").css("display", "block")
	} else if (distance > 20 && distance <= 40) {
		$("#car_div8").css("display", "block")
	} else if(distance > 40 && distance <= 55) {
		$("#car_div9").css("display", "block")
	} else if (distance > 70) {
		$("#car_div10").css("display", "block")
	}
}

function collision_detector(){
	$.each(array_of_ids, function() {
		if($("#player").overlaps($(window[this])).length > 0){
			end()
		}
	})
}

function end(){
	clearInterval(pointsInterval)
	$("#SCORE").val(distance);
	disappear()
	cancelAnimationFrame(animationframeID);
	localStorage["lastscore"] = distance_text;
	$("#player, #background").spStop();
	cancelAnimationFrame(movementID);
	//$(".car_div" ).remove();
	setTimeout(function(){
	$("#player").toggle("explode");
	}, 400)
	$("#loser").trigger("play");
	setTimeout(function(){
		$("#gameover, #restart").css("display", "block");
		$("#score").text(distance_text);
		$("#highscore2").text(65.123);
	}, 2000)

}

function collision_effect(object){
	listen = false
	for(var x = 0; x < 2; x++) {
		object.fadeIn("fast").fadeOut("fast").stop().fadeIn("fast");
	}
	$("#boing").trigger("play");
	distance = distance * (4/5)
	reset_all()
}

function init_cars(object){
	car_type(object);
	var posx = randomdigit(6, 94);
	var posy = randomdigit(-60, -10);
	object.css({
			"left" : posx + "%",
			"top" : posy + "%",
			"display" : "block"
			});
}

function set_player(object) {
	var init_x = randomdigit (10,90);
	object.css({
		left: init_x + "%"
	});

}

function overflow_detector(){
	var left_boundary = $("#proxy_page").offset().left;
	var right_boundary = ($("#proxy_page").offset().left) + ($("#proxy_page").width());
	var top_boundary = $("#proxy_page").offset().top;
	var bottom_boundary = ($("#proxy_page").offset().top) + ($("#proxy_page").height());
	get_boundary($("#player"));
	if((object_left < left_boundary) || (object_right > right_boundary) || (object_top < top_boundary)){
		end()
		//$("#boundary_touched").trigger("play");
		//distance = distance * (3/5)
	}
}

function car_speed() {
	var car_speed = randomdigit (2,4);
	return car_speed;
}

function minus_lives(lives){
	switch(lives){
	case 1:
		$("#p1").addClass("minus")
		break;
	case 2:
		$("#p2").addClass("minus")
		break;
	case 3:
		$("#p3").addClass("minus")
		break;
	}
}

function points(){
	increment = 0.314159
	pointsInterval = setInterval(function(){
		background_speed(distance);
		distance = distance + increment;
		distance_text = distance.toFixed(3)
		$("#plus_span").text(distance_text)
	}, 314.159);
}

function init(){
	$("#instruction").hide();
	$("#perm").prop("volume", 0.5).trigger("play");
	$("#gameover").prop("volume", 0.9);
	$("#boing").prop("volume", 1)
	points();
	$('#background').pan({fps: 17, speed: 14, dir: 'down'});
	$('#player').sprite({fps: 17, no_of_frames: 10, rewind: false});
	$('.car_div').sprite({fps: 12, no_of_frames: 6});
	//
	$("#instr").css("display", "none")
	init_cars($("#car_div1"));
	init_cars($("#car_div2"));
	init_cars($("#car_div3"));
	init_cars($("#car_div4"));
	init_cars($("#car_div5"));
	init_cars($("#car_div6"));
	init_cars($("#car_div7"));
	init_cars($("#car_div8"));
	init_cars($("#car_div9"));
	init_cars($("#car_div10"));
	move_car($("#car_div1"), car_speed());
	move_car($("#car_div2"), car_speed());
	move_car($("#car_div3"), car_speed());
	move_car($("#car_div4"), car_speed());
	move_car($("#car_div5"), car_speed());
	move_car($("#car_div6"), car_speed());
	move_car($("#car_div7"), car_speed());
	move_car($("#car_div8"), car_speed());
	move_car($("#car_div9"), car_speed());
	move_car($("#car_div10"), car_speed());
	$("#car_div7, #car_div8, #car_div9, #car_div10").css("display", "none")
}

function disappear(){
$("#perm").prop("volume", 0.2)
$(".car_div, #plus").css({
display: "none"
})
}

function reset_all(){
	listen = true;
		set_player($("#player"));
		init_cars($("#car_div1"));
		init_cars($("#car_div2"));
		init_cars($("#car_div3"));
		init_cars($("#car_div4"));
		init_cars($("#car_div5"));
		init_cars($("#car_div6"));
}

function func01(){
	window.location = "level1.html"
}

function func02(){
	window.location = "level1.html"
}

function func03(){
	$("#SUBMIT").click();
}

function shuffle_type(){
	return shuffle([1, 2, 3, 4, 5])[0];
}

function background_speed(distance){
	updated_speed = 14 + (distance*.4)
	$('#background').spSpeed(updated_speed)
}

function instruction() {
	$("#instruction").css({display: "block"});
	$(this).on("click", function() {
			init();
	});
}
