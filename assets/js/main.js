const slides = document.querySelectorAll('.slide')
const btnPlay = document.getElementById('btn-play')
const btnPause = document.getElementById('btn-pause')
const btnNext = document.getElementById('btn-next')
const btnPrev = document.getElementById('btn-prev')
let currentSlide = 0
let idInterval = null
const interval = 2000


function showBtnPlay() {
  btnPause.style.display = 'none'
  btnPlay.style.display = 'block'
}

function showBtnPause() {
  btnPause.style.display = 'block'
  btnPlay.style.display = 'none'
}

function nextSlide() {
  pause()
  slides[currentSlide].classList.toggle('active')
  currentSlide = (currentSlide + 1) % slides.length
  console.log(slides.length);
  slides[currentSlide].classList.toggle('active')
  play()
}

function prevSlide() {
  pause()
  slides[currentSlide].classList.toggle('active')
  if (currentSlide < 1) currentSlide = slides.length
  currentSlide = (currentSlide - 1) % slides.length
  slides[currentSlide].classList.toggle('active')
  play()
}

function pause() {
  clearInterval(idInterval)
  showBtnPlay()
}

function play() {
  initSlider()
  showBtnPause()
}

function initSlider() {
  return idInterval = setInterval(nextSlide, interval)
}

initSlider()
btnPause.addEventListener('click', pause)
btnPlay.addEventListener('click', play)
btnNext.addEventListener('click', nextSlide)
btnPrev.addEventListener('click', prevSlide)
