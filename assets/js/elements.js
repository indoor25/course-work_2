import {createElements} from './main.js'
import {
  play,
  prevSlide,
  pause,
  nextSlide,
  goIndicator
} from "./main.js";

export let slides
export let btnPlay
export let btnPause
export let btnNext
export let btnIndicators = []
export const Elements = () => {
  slides = document.querySelectorAll('.slide')
  const sliderContainer = document.querySelector('.slider__container')
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

  for (let i = 0; i < slides.length; i++) {
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
}

