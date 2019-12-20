$(document).ready(function () {
    $('.quienes-wrapper').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      infinite: true,
      pauseOnHover: false,
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2
        }
      }, {
        breakpoint: 520,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      }, {
        breakpoint: 1068,
        settings: {
          arrows: false,
          slidesToShow: 3
        }
      }]
    });
  });
  
