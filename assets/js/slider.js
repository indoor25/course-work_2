export function Slider(conf) {
  const defaultSettings = {
    autoPlay: true,
    direction: 'forward', //forward or back
    myInterval: 1500,
    container: '.slider__container'
  }

  if (Object.keys(conf).length === 0) conf = defaultSettings
  const {container} = conf
  this.autoPlay = conf.autoPlay
  this.direction = conf.direction
  this.interval = conf.interval
  this.sliderContainer = document.querySelector(container)
  this.slidesContainer = document.querySelector('#slides')
  this.sliderElement = this.slidesContainer.querySelectorAll('.slide')
  this.SLIDES_LENGTH = this.sliderElement.length
  this.positionStart = 0
  this.positionEnd = 0
  this.btnIndicators = []
  this.currentSlide = 0
  this.idInterval = null
  this.playNow = false
  const createElements = ({
                            type: type,
                            attr = {},
                            container = null,
                            actions = {},
                            position = 'append'
                          }) => {
    this.elem = document.createElement(type)
    for (const elemKey in attr) {
      this.elem.setAttribute(elemKey, attr[elemKey])
    }
    if (container) {
      switch (position) {
        case 'append':
          container.append(this.elem)
          break
        case 'prepend':
          container.prepend(this.elem)
          break
        case 'after':
          container.after(this.elem)
          break
        case 'before':
          container.before(this.elem)
          break
      }
    }
    if (Object.keys(actions).length !== 0)
      for (const elemKey in actions) {
        this.handler = actions[elemKey]
        this.elem.addEventListener(elemKey, this.handler.bind(this))
      }
    return this.elem
  }
  this.btnControls = createElements({
    type: 'div',
    attr: {'class': 'btn__controls'},
    container: this.sliderContainer
  })

  this.btnPrev = createElements({
    type: 'div',
    attr: {'id': 'btn-prev', 'class': 'btn__control btn__prev'},
    container: this.btnControls
  })
  createElements({
    type: 'i',
    attr: {'class': 'fa-solid fa-chevron-left'},
    container: this.btnPrev,
    actions: {'click': this.prevSlide}
  })

  this.btnPlay = createElements({
    type: 'div',
    attr: {'id': 'btn-play', 'class': 'btn__control btn__play'},
    container: this.btnControls,
  })
  createElements({
    type: 'i',
    attr: {'class': 'fa-regular fa-circle-play'},
    container: this.btnPlay,
    actions: {'click': this.play}
  })

  this.btnPause = createElements({
    type: 'div',
    attr: {'id': 'btn-pause', 'class': 'btn__control btn__pause'},
    container: this.btnControls,
  })
  createElements({
    type: 'i',
    attr: {'class': 'fa-regular fa-circle-pause'},
    container: this.btnPause,
    actions: {'click': this.pause}
  })

  this.btnNext = createElements({
    type: 'div',
    attr: {'id': 'btn-next', 'class': 'btn__control btn__next'},
    container: this.btnControls
  })
  createElements({
    type: 'i',
    attr: {'class': 'fa-solid fa-chevron-right'},
    container: this.btnNext,
    actions: {'click': this.nextSlide}
  })

  this.indicators = createElements({
    type: 'div',
    attr: {'class': 'indicators__container'},
    container: this.sliderContainer
  })

  for (let i = 0; i < this.SLIDES_LENGTH; i++) {
    let element = createElements({
        type: 'div',
        container: this.indicators,
        actions: {'click': this.goIndicator},
        get attr() {
          if (i === 0) {
            return {'class': 'indicators__item indicator__active', 'data-number-value': i}
          } else {
            return {'class': 'indicators__item', 'data-number-value': i}
          }
        }
      }
    )
    this.btnIndicators.push(element)
  }
}


Slider.prototype = {

  enableBtnPlay() {
    this.btnPause.style.display = 'none'
    this.btnPlay.style.display = 'flex'
  },

  enableBtnPause() {
    this.btnPause.style.display = 'flex'
    this.btnPlay.style.display = 'none'
  },

  hideBtnPlay() {
    this.btnPlay.style.opacity = 0
    this.btnPlay.style.removeProperty('opacity')
    setTimeout(() => {
      this.btnPlay.style.display = 'none'
      this.btnPause.style.display = 'flex'
    }, 1100)
  },

  showBtnPlay() {
    this.btnPlay.style.display = 'flex'
    this.btnPause.style.display = 'none'
    this.btnPlay.style.opacity = 1
    setTimeout(this.hideBtnPlay.bind(this), 1000)
  },

  hideBtnPause() {
    this.btnPause.style.opacity = 0
    this.btnPause.style.removeProperty('opacity')
    setTimeout(() => {
      this.btnPause.style.display = 'none'
      this.btnPlay.style.display = 'flex'
    }, 1100)
  },

  showBtnPause() {
    this.btnPlay.style.display = 'none'
    this.btnPause.style.display = 'flex'
    this.btnPause.setAttribute('background-color', 'rgba(255, 255, 255, 1)')
    setTimeout(this.hideBtnPause.bind(this), 1000)
  },

  nthSlide(number) {
    this.sliderElement[this.currentSlide].classList.toggle('active')
    this.btnIndicators[this.currentSlide].classList.toggle('indicator__active')

    this.currentSlide = (number + this.SLIDES_LENGTH) % this.SLIDES_LENGTH
    this.sliderElement[this.currentSlide].classList.toggle('active')
    this.btnIndicators[this.currentSlide].classList.toggle('indicator__active')
  },

  goIndicator(e) {
    const {target} = e
    this.pause()
    this.nthSlide(+target.dataset.numberValue)
  },

  nextSlide() {
    this.pause()
    this.nthSlide(this.currentSlide + 1)
  },


  sliderDirection(direction) {
    if (direction === 'forward')
      this.nthSlide(this.currentSlide + 1)
    if (direction === 'back')
      this.nthSlide(this.currentSlide - 1)
    this.enableBtnPause()
    this.playNow = true
  },

  prevSlide() {
    this.pause()
    this.nthSlide(this.currentSlide - 1)
  },

  pause() {
    clearInterval(this.idInterval)
    this.enableBtnPlay()
    this.playNow = false
  },

  keyAction(e) {
    const {code} = e
    switch (code) {
      case 'Space':
        if (this.playNow) {
          this.pause()
          this.showBtnPause()
        } else {
          this.play()
          this.showBtnPlay()
        }
        break
      case 'ArrowLeft':
        this.prevSlide()
        break
      case 'ArrowRight':
        this.nextSlide()
        break
    }
  },

  play() {
    this.startSlider()
    this.enableBtnPause()
  },
  swipeStart(e) {
    if (e instanceof TouchEvent)
      this.positionStart = e.changedTouches[0].clientX
    if (!e.button && e instanceof MouseEvent)
      this.positionStart = e.clientX
  },
  swipeEnd(e) {
    if (e instanceof TouchEvent) {
      this.positionEnd = e.changedTouches[0].clientX
      this.swipeMouse()
    }
    if (!e.button && e instanceof MouseEvent) {
      this.positionEnd = e.clientX
      this.swipeMouse()
    }
  },

  swipeMouse() {
    if ((this.positionStart - this.positionEnd) < -100) this.prevSlide()
    if ((this.positionStart - this.positionEnd) > 100) this.nextSlide()
  },
  addListeners() {
    document.addEventListener('keyup', this.keyAction.bind(this))
    this.btnControls.addEventListener('mousedown', this.swipeStart.bind(this))
    this.btnControls.addEventListener('mouseup', this.swipeEnd.bind(this))
    this.btnControls.addEventListener('touchstart', this.swipeStart.bind(this))
    this.btnControls.addEventListener('touchend', this.swipeEnd.bind(this))
  },

  startSlider() {
    this.idInterval = setInterval(() => this.sliderDirection(this.direction), this.interval)
  },
  init() {
    if (this.autoPlay) this.play()
    this.addListeners()
  },
  constructor: Slider,
}


