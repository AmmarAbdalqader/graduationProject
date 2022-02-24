var config = {
  speed: 3000,
  auto: true, // true or false
  arrows: true, // true or false
  nav: true, // true or false
  navStyle: "default", // square,rectangle, default
};

// Slider core
var slides = $(".slide");
var totalSlides = slides.length;
var currentIndex = 0;

function setSlides() {
  var currentSlide = slides.eq(currentIndex);
  slides.hide();
  currentSlide.fadeIn(1500);
}
setSlides();

// autoplay
if (config.auto) {
  var autoSlide = setInterval(function () {
    currentIndex += 1;
    if (currentIndex > totalSlides - 1) {
      currentIndex = 0;
    }
    setSlides();
    navigation();
  }, config.speed);
}

// navigation arrows
if (config.arrows) {
  $(".arrow").addClass("active");
  $(".prev").click(function () {
    clearInterval(autoSlide);
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = totalSlides - 1;
    }
    navigation();
    setSlides();
  });
  $(".next").click(function () {
    clearInterval(autoSlide);
    currentIndex += 1;
    if (currentIndex > totalSlides - 1) {
      currentIndex = 0;
    }
    navigation();
    setSlides();
  });
}

// navigation
if (config.nav) {
  for (i = 0; i < slides.length; i += 1) {
    $("<li/>").attr({ class: "nav-item", id: i }).appendTo(".slide-nav");
  }
  $(".nav-item").first().addClass("item-active");
  switch (
    config.navStyle // navigation style
  ) {
    case "square":
      $(".nav-item").addClass("square");
      break;
    case "rectangle":
      $(".nav-item").addClass("rectangle");
      break;
    default:
      $(".nav-item").addClass("dot");
  }
  function navigation() {
    $(".nav-item").removeClass("item-active");
    $(".nav-item").eq(currentIndex).addClass("item-active");
  }
  $(".nav-item").click(function () {
    clearInterval(autoSlide);
    var navNumb = $(this).attr("id");
    currentIndex = navNumb;
    navigation();
    setSlides();
  });
}
