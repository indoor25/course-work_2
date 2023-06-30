import {btnPlay, btnPause, slides, btnIndicators} from "./elements.js";

let currentSlide = 0
let idInterval = null
const interval = 1500

export const createElements = ({
                                 type: type,
                                 attr = {},
                                 container = null,
                                 actions = {},
                                 position = 'append'
                               }) => {
  let elem = document.createElement(type)
  for (const elemKey in attr) {
    elem.setAttribute(elemKey, attr[elemKey])
  }
  if (container) {
    switch (position) {
      case 'append':
        container.append(elem)
        break
      case 'prepend':
        container.prepend(elem)
        break
      case 'after':
        container.after(elem)
        break
      case 'before':
        container.before(elem)
        break
    }
  }
  if (Object.keys(actions).length !== 0)
    for (const elemKey in actions) {
      elem.addEventListener(elemKey, actions[elemKey])
    }
  return elem
}

function showBtnPlay() {
  btnPause.style.display = 'none'
  btnPlay.style.display = 'block'
}

function showBtnPause() {
  btnPause.style.display = 'block'
  btnPlay.style.display = 'none'
}

export function nthSlide(number) {
  slides[currentSlide].classList.toggle('active')
  btnIndicators[currentSlide].classList.toggle('indicator__active')

  currentSlide = (number) % slides.length
  slides[currentSlide].classList.toggle('active')
  btnIndicators[currentSlide].classList.toggle('indicator__active')
}

export function goIndicator(e) {
  const {target} = e
  pause()
  nthSlide(+target.dataset.numberValue)
}

export function nextSlide() {
  pause()
  nthSlide(currentSlide + 1)
}

export function tick() {
  nthSlide(currentSlide + 1)
  showBtnPause()
}

export function prevSlide() {
  pause()
  nthSlide((currentSlide < 1) ? slides.length - 1 : currentSlide - 1)
}

export function pause() {
  clearInterval(idInterval)
  showBtnPlay()
}

export function play() {
  initSlider()
  showBtnPause()
}

export function initSlider() {
  return idInterval = setInterval(tick, interval)
}
