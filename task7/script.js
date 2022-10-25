$(document).ready(function() {
    $('.gallery').slick({
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                cssEase: 'linear'
              }
            }
        ],
    });
});