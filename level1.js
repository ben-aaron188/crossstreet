var animationframeID,
  movementID,
  movementID_array = [],
  count = 0,
  count_runs = 0,
  array_of_ids = [],
  runs = 100000,
  distance = 0,
  ids,
  listen,
  bg_speed,
  bg_speed_proxy,
  errors = 0;

$(document)
  .ready(function() {
    $("#instr, #gameover, #proxy_page, #black_page").css({
      "margin-left": -($(".window").width() / 2),
      "margin-top": -($(".window").height() / 2)
    })
    $("#plus").css({
      "margin-left": -($(".window").width() / 2),
      "margin-top": -($(".window").height() / 20)
    })
    $("#highscore_table").css({
      "margin-left": -($("#highscore_table").width() / 2),
      "margin-top": -($("#highscore_table").height() / 2)
    })
    if (localStorage["lastscore"] > 0) {
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
  .keydown(function(e) {
    var code = e.keyCode || e.which;
    if (code == 66) {
      listen = true;
      init()
    }
    if (listen == true) {
      var code = e.keyCode || e.which;
      count++
      if (count < 2) {
        switch (code) {
          case 37:
            left(12);
            break
          case 39:
            right(12);
            break
        }
      }
    }
  })
  .keyup(function(e) {
    var code = e.keyCode || e.which;
    count = 0
    if (code == 37 || code == 38 || code == 39 || code == 40) {
      cancelAnimationFrame(animationframeID);
    }
  })

function move_car(object, speed) {
  movementID = requestAnimationFrame(function() {
    move_car(object, speed)
  });
  collision_detector();
  object.css({
    top: "+=" + speed
  });
  get_boundary(object);
  if (object_bottom > $(window).height()) {
    reset_car(object);
  }
}

function car_type(object) {
  type = shuffle([1, 2, 3, 4, 5])[0];
  switch (type) {
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

function reset(object) {
  if (count_runs == runs) {
    confirm("Your universe is " + distance + " billion kilometers wide (??!!)")
    clearInterval(pointsInterval)
    disappear()
    cancelAnimationFrame(animationframeID);
    localStorage["lastscore"] = distance;
    $("#player, #background").spStop();
    setTimeout(function() {
      $("#player").toggle("explode");
    }, 1000)
    window.location = "level1.html"
  }
  count_runs++
  var posx = randomdigit(-90, 90);
  var posy = randomdigit(-10, -5);
  object.css({
    "left": posx + "%",
    "top": posy + "%",
    "display": "block"
  });
}

function reset_car(object) {
  add_cars(distance)
  count_runs++
  car_type(object);
  var posx = randomdigit(7, 93);
  var posy = randomdigit(-80, -10);
  object.css({
    "left": posx + "%",
    "top": posy + "%",
    "display": "block"
  });

}

function add_cars(distance) {
  if (distance > 8 && distance <= 16) {
    $("#car_div7").css("display", "block")
  } else if (distance > 16 && distance <= 24) {
    $("#car_div8").css("display", "block")
  } else if (distance > 24 && distance <= 32) {
    $("#car_div9").css("display", "block")
  } else if (distance > 32) {
    $("#car_div10").css("display", "block")
  }
}

function collision_detector() {
  $.each(array_of_ids, function() {
    if ($("#player").overlaps($(window[this])).length > 0) {
      end()
    }
  })
}

function end() {
  clearInterval(pointsInterval)
  disappear()
  cancelAnimationFrame(animationframeID);
  localStorage["lastscore"] = distance_text;
  $("#player, #background").spStop();
  cancelAnimationFrame(movementID);
  $(".car_div").remove();
  setTimeout(function() {
    $("#player").toggle("explode");
  }, 500)
  $("#loser").trigger("play");
  setTimeout(function() {
    $("#gameover, #restart").css("display", "block");
    $("#score").text(distance_text);
    $("#highscore2").text(65.123);
  }, 1000)

}

function collision_effect(object) {
  listen = false
  for (var x = 0; x < 2; x++) {
    object.fadeIn("fast").fadeOut("fast").stop().fadeIn("fast");
  }
  $("#boing").trigger("play");
  distance = distance * (4 / 5)
  reset_all()
}

function init_cars(object) {
  car_type(object);
  var posx = randomdigit(7, 93);
  var posy = randomdigit(-80, -10);
  object.css({
    "left": posx + "%",
    "top": posy + "%",
    "display": "block"
  });
}

function set_player(object) {
  var init_x = randomdigit(10, 90);
  object.css({
    left: init_x + "%"
  });

}

function overflow_detector() {
  var left_boundary = $("#proxy_page").offset().left;
  var right_boundary = ($("#proxy_page").offset().left) + ($("#proxy_page").width());
  var top_boundary = $("#proxy_page").offset().top;
  var bottom_boundary = ($("#proxy_page").offset().top) + ($("#proxy_page").height());
  get_boundary($("#player"));
  if ((object_left < left_boundary) || (object_right > right_boundary) || (object_top < top_boundary)) {
    end()
      //$("#boundary_touched").trigger("play");
      //distance = distance * (3/5)
  }
}

function initial_car_speed() {
  var initial_car_speed = randomdigit(2, 6);
  return initial_car_speed;
}

function points() {
  increment = 0.314159
  pointsInterval = setInterval(function() {
    background_speed(distance);
		//update_car_speed(distance)
    distance = distance + increment;
    distance_text = distance.toFixed(3)
    $("#plus_span").text(distance_text)
  }, 314.159);
}

function init() {
  $("#perm").prop("volume", 0.5).trigger("play");
  $("#gameover").prop("volume", 0.9);
  $("#boing").prop("volume", 1)
  points();
  $('#background').pan({
    fps: 17,
    speed: 14,
    dir: 'down'
  });
  $('#player').sprite({
    fps: 17,
    no_of_frames: 10,
    rewind: false
  });
  $('.car_div').sprite({
    fps: 16,
    no_of_frames: 6
  });
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
  move_car($("#car_div1"), initial_car_speed());
  move_car($("#car_div2"), initial_car_speed());
  move_car($("#car_div3"), initial_car_speed());
  move_car($("#car_div4"), initial_car_speed());
  move_car($("#car_div5"), initial_car_speed());
  move_car($("#car_div6"), initial_car_speed());
  move_car($("#car_div7"), initial_car_speed());
  move_car($("#car_div8"), initial_car_speed());
  move_car($("#car_div9"), initial_car_speed());
  move_car($("#car_div10"), initial_car_speed());
  $("#car_div7, #car_div8, #car_div9, #car_div10").css("display", "none")
}

function disappear() {
  $("#perm").prop("volume", 0.2)
  $(".car_div, #plus").css({
    display: "none"
  })
}

function reset_all() {
  listen = true;
  set_player($("#player"));
  init_cars($("#car_div1"));
  init_cars($("#car_div2"));
  init_cars($("#car_div3"));
  init_cars($("#car_div4"));
  init_cars($("#car_div5"));
  init_cars($("#car_div6"));
}

function func01() {
  window.location = "level1.html"
}

function func02() {
  window.location = "level1.html"
}

function func03() {
  //prompt_text = prompt("Please enter your name", "ABCD1234");
	$("#SUBMIT").click();
}

function shuffle_type() {
  return shuffle([1, 2, 3, 4, 5])[0];
}

function background_speed(distance) {
  updated_speed = 14 + (distance * .25)
  $('#background').spSpeed(updated_speed)
}

function update_car_speed(distance){
	if(distance > 20 && distance <= 30){
		move_car($(".car_div"), 5);
	} else if(distance > 30 && distance <= 40) {

	} else if(distance > 40 && distance <= 50) {

	} else if(distance > 50 && distance <= 60) {

	} else if (distance > 60 && distance <= 70) {

	}else if (distance > 70 && distance <= 80) {

	} else {

	}
}
