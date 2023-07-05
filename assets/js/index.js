import {initSlider} from "./main.js";

const conf = {
  autoPlay: true,
  direction: 'forward', //forward or back
  interval: 1500,
  container: '.slider__container'
}

// initSlider(conf)

const slider = new Slider(conf)
slider.init()

console.log(slider);

