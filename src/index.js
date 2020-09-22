import './scss/index.scss';

import 'materialize-css';



document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.carousel-slider');

  if(slider) {
      const instance = M.Carousel.init(slider, {
          fullWidth: true,
          indicators: true
        });
  }

  var elems = document.querySelectorAll('.sidenav');
  if(elems) {
    var instances = M.Sidenav.init(elems);
  }   
});