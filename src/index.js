import './scss/index.scss';
import 'materialize-css';

import {formHander, formHandler} from './components/subscribe-form';

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.carousel-slider');

    if(slider) {
        const instance = M.Carousel.init(slider, {
            fullWidth: true,
            indicators: true
        });
    }

    const elems = document.querySelectorAll('.sidenav');
    if(elems) {
        const instances = M.Sidenav.init(elems);
    }   

    const sbscrbForm = document.getElementById('subscribe');
    if(sbscrbForm) {
        formHandler(sbscrbForm);
    }
});