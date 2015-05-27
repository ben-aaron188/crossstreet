//core
//randomdigit function
function randomdigit(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//timing
var now = (function() {
  var performance = window.performance || {};
  performance.now = (function() {
    return performance.now ||
      performance.webkitNow ||
      performance.msNow ||
      performance.oNow ||
      performance.mozNow ||
      function() {
        return new Date().getTime();
      };
  })();
  return performance.now();
});

//shuffle
function shuffle(array) {
  var newarr = [];
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    newarr[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue;
  }
  return newarr;
};

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());

function get_boundary(object) {
  object_position = object.offset();
  object_height = object.height();
  object_width = object.width();
  object_left = object_position.left;
  object_top = object_position.top;
  object_right = object_left + object_width;
  object_bottom = object_top + object_height;
}

function get_coordinates(object1, object2) {
  object1_position = object1.position();
  object1_height = object1.height();
  object1_width = object1.width();
  object1_left = object1_position.left;
  object1_top = object1_position.top;
  object1_right = object1_left + object1_width;
  object1_bottom = object1_top + object1_height;
  object2_position = object2.position();
  object2_height = object2.height();
  object2_width = object2.width();
  object2_left = object2_position.left;
  object2_top = object2_position.top;
  object2_right = object2_left + object2_width;
  object2_bottom = object2_top + object2_height;
}

function find_ids(class_name) {
  $.each($(class_name), function() {
    ids = this.id;
    array_of_ids.push(ids);
  });
}

function left() {
  animationframeID = requestAnimationFrame(left);
  collision_detector();
  overflow_detector();
  $("#player").css({
    left: "-=10"
  })
}

function right() {
  animationframeID = requestAnimationFrame(right);
  collision_detector();
  overflow_detector();
  $("#player").css({
    left: "+=10"
  })
}

function css_center(object, relative_object){
  if (typeof relative_object === "undefined" || relative_object === null) {
    relative_object = object;
  }
  object.css({
    "margin-left": -($(relative_object).width() / 2),
    "margin-top": -($(relative_object).height() / 2)
  })
}

function autoSizeText() {
  var el, elements, _i, _len, _results;
  elements = $('.resize');
  console.log(elements);
  if (elements.length < 0) {
    return;
  }
  _results = [];
  for (_i = 0, _len = elements.length; _i < _len; _i++) {
    el = elements[_i];
    _results.push((function(el) {
      var resizeText, _results1;
      resizeText = function() {
        var elNewFontSize;
        elNewFontSize = (parseInt($(el).css('font-size').slice(0, -2)) - 1) + 'px';
        return $(el).css('font-size', elNewFontSize);
      };
      _results1 = [];
      while (el.scrollHeight > el.offsetHeight) {
        _results1.push(resizeText());
      }
       return _results1;
    })(el));
  }
  return _results;
};
