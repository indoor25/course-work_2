export function Slider(conf) {
  const defaultSettings = {
    autoPlay: true,
    direction: 'forward', //forward or back
    interval: 1500,
    container: '.slider__container',
    slidesClass: '.slide'
  }

  if (Object.keys(conf).length < 5) conf = defaultSettings
  this.slidesClass = conf.slidesClass
  this.container = conf.container
  this.autoPlay = conf.autoPlay
  this.direction = conf.direction
  this.interval = conf.interval
  this.sliderContainer = document.querySelector(this.container)
  this.slidesContainer = this.sliderContainer.querySelector('#slides')
  this.sliderElement = this.slidesContainer.querySelectorAll(this.slidesClass)
  this.SLIDES_LENGTH = this.sliderElement.length
  this.positionStart = 0
  this.positionEnd = 0
  this.btnIndicators = []
  this.currentSlide = 0
  this.idInterval = null
  this.playNow = false

  this.btnControls = this.createElements({
    type: 'div',
    attr: {'class': 'btn__controls'},
    container: this.sliderContainer
  })

  this.btnPrev = this.createElements({
    type: 'div',
    attr: {'id': 'btn-prev', 'class': 'btn__control btn__prev'},
    container: this.btnControls
  })
  this.createElements({
    type: 'i',
    attr: {'class': 'fa-solid fa-chevron-left'},
    container: this.btnPrev,
    actions: {'click': this.prevSlide}
  })

  this.btnPlay = this.createElements({
    type: 'div',
    attr: {'id': 'btn-play', 'class': 'btn__control btn__play'},
    container: this.btnControls,
  })
  this.createElements({
    type: 'i',
    attr: {'class': 'fa-regular fa-circle-play'},
    container: this.btnPlay,
    actions: {'pointerup': this.play}
  })

  this.btnPause = this.createElements({
    type: 'div',
    attr: {'id': 'btn-pause', 'class': 'btn__control btn__pause'},
    container: this.btnControls,
  })
  this.createElements({
    type: 'i',
    attr: {'class': 'fa-regular fa-circle-pause'},
    container: this.btnPause,
    actions: {'pointerup': this.pause}
  })

  this.btnNext = this.createElements({
    type: 'div',
    attr: {'id': 'btn-next', 'class': 'btn__control btn__next'},
    container: this.btnControls
  })
  this.createElements({
    type: 'i',
    attr: {'class': 'fa-solid fa-chevron-right'},
    container: this.btnNext,
    actions: {'click': this.nextSlide}
  })

  this.indicators = this.createElements({
    type: 'div',
    attr: {'class': 'indicators__container'},
    container: this.sliderContainer
  })

  for (let i = 0; i < this.SLIDES_LENGTH; i++) {
    let element = this.createElements({
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

  createElements({
                   type: type,
                   attr = {},
                   container = null,
                   actions = {},
                   position = 'append'
                 }) {
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
  },

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
    this.btnPause.style.opacity = 1
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
    this.btnControls.addEventListener('mouseleave', this.play.bind(this))
    this.btnControls.addEventListener('mouseenter', this.pause.bind(this))
  },

  play() {
    if (!this.playNow) {
      this.idInterval = setInterval(() => this.sliderDirection(this.direction), this.interval)
      this.enableBtnPause()
      this.playNow = true
    }
  },
  init() {
    if (this.autoPlay) this.play()
    this.addListeners()
  },
  constructor: Slider,
}


