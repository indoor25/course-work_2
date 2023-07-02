// import {btnPlay, btnPause, slides, btnIndicators} from "./elements.js";

// import {createElements} from './main.js'
// import {
//   play,
//   prevSlide,
//   pause,
//   nextSlide,
//   goIndicator
// } from "./main.js";


export function initSlider(conf) {

  const defaultSettings = {
    autoPlay: true,
    direction: 'forward', //forward or back
    myInterval: 1500,
    container: '.slider__container'
  }

  if (Object.keys(conf).length === 0) conf = defaultSettings
  const {autoPlay} = conf
  const {direction} = conf
  const {interval} = conf
  const {container} = conf

  let sliderElement
  let btnPlay
  let btnPause
  let btnNext
  let btnIndicators = []
  let currentSlide = 0
  let idInterval = null
  let playNow = false


  const createElements = ({
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

  sliderElement = document.querySelectorAll('.slide')
  const sliderContainer = document.querySelector(container)
  const btnControls = createElements({
    type: 'div',
    attr: {'class': 'btn__controls'},
    container: sliderContainer
  })

  const btnPrev = createElements({
    type: 'div',
    attr: {'id': 'btn-prev', 'class': 'btn__control btn__prev'},
    container: btnControls,
    actions: {'click': prevSlide}
  })
  createElements({
    type: 'i',
    attr: {'class': 'fa-solid fa-chevron-left'},
    container: btnPrev
  })

  btnPlay = createElements({
    type: 'div',
    attr: {'id': 'btn-play', 'class': 'btn__control btn__play'},
    container: btnControls,
    actions: {'click': play}
  })
  createElements({
    type: 'i',
    attr: {'class': 'fa-regular fa-circle-play'},
    container: btnPlay
  })

  btnPause = createElements({
    type: 'div',
    attr: {'id': 'btn-pause', 'class': 'btn__control btn__pause', 'style': 'display: none'},
    container: btnControls,
    actions: {'click': pause}
  })
  createElements({
    type: 'i',
    attr: {'class': 'fa-regular fa-circle-pause'},
    container: btnPause
  })

  btnNext = createElements({
    type: 'div',
    attr: {'id': 'btn-next', 'class': 'btn__control btn__next'},
    container: btnControls,
    actions: {'click': nextSlide}
  })
  createElements({
    type: 'i',
    attr: {'class': 'fa-solid fa-chevron-right'},
    container: btnNext
  })

  const indicators = createElements({
    type: 'div',
    attr: {'class': 'indicators__container'},
    container: sliderContainer
  })

  for (let i = 0; i < sliderElement.length; i++) {
    let element = createElements({
        type: 'div',
        container: indicators,
        actions: {'click': goIndicator},
        get attr() {
          if (i === 0) {
            return {'class': 'indicators__item indicator__active', 'data-number-value': i}
          } else {
            return {'class': 'indicators__item', 'data-number-value': i}
          }
        }
      }
    )
    btnIndicators.push(element)
  }

  function showBtnPlay() {
    btnPause.style.display = 'none'
    btnPlay.style.display = 'block'
  }

  function showBtnPause() {
    btnPause.style.display = 'block'
    btnPlay.style.display = 'none'
  }

  function nthSlide(number) {
    sliderElement[currentSlide].classList.toggle('active')
    btnIndicators[currentSlide].classList.toggle('indicator__active')

    currentSlide = (number + sliderElement.length) % sliderElement.length
    sliderElement[currentSlide].classList.toggle('active')
    btnIndicators[currentSlide].classList.toggle('indicator__active')
  }

  function goIndicator(e) {
    const {target} = e
    pause()
    nthSlide(+target.dataset.numberValue)
  }

  function nextSlide() {
    pause()
    nthSlide(currentSlide + 1)
  }


  function tick(direction) {
    if (direction === 'forward')
      nthSlide(currentSlide + 1)
    if (direction === 'back')
      nthSlide(currentSlide - 1)
    showBtnPause()
    playNow = true
  }

  function prevSlide() {
    pause()
    nthSlide(currentSlide - 1)
  }

  function pause() {
    clearInterval(idInterval)
    showBtnPlay()
    playNow = false
  }

  function keyAction(e) {
    const {code} = e
    switch (code) {
      case 'Space':
        playNow ? pause() : play()
        break
      case 'ArrowLeft':
        prevSlide()
        break
      case 'ArrowRight':
        nextSlide()
        break
    }
  }

  function play() {
    startSlider()
    showBtnPause()
  }

  if (autoPlay) play()

  document.addEventListener('keydown', keyAction)

  function startSlider() {
    idInterval = setInterval(() => tick(direction), interval)
  }
}
