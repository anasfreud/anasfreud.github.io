$(document).ready(function() {

  const gallery = $('.gallery');

  for (let i = 1; i <= 16; i++) {
    gallery.append(`<img src="images/img${i}.png" alt="img${i}">`);
  }

  gallery.slick({
      dots: true,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
      ],
  });


});