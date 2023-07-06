import {Slider} from './slider.js'

const conf = {
  autoPlay: true,
  direction: 'forward', //forward or back
  interval: 1500,
  container: '.slider__container'
}

const slider = new Slider(conf)
slider.init()

