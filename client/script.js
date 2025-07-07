$(document).ready(function () {
  // Scroll to hero button
  $('.hero-btn').on('click', function () {
    $('html, body').animate({
      scrollTop: $('.features').offset().top
    }, 1000);
  });

  // Animate cards on scroll
  function revealOnScroll() {
    $('.card').each(function () {
      var top_of_element = $(this).offset().top;
      var bottom_of_screen = $(window).scrollTop() + $(window).height();

      if (bottom_of_screen > top_of_element + 50) {
        $(this).addClass('animated fadeInUp');
      }
    });
  }

  $(window).on('scroll', revealOnScroll);
});
