let headDocument = document.querySelector('head')
console.log(headDocument);
let style = document.createElement('style')
style.innerHTML = `

  height: 100vh;
}

.slides {
  margin: 0;
  padding: 0;

  list-style: none;
}

.slide {
  position: absolute;
  z-index: -999;

  width: 100%;
  height: 100%;

  -webkit-transition: opacity 1s;
       -o-transition: opacity 1s;
          transition: opacity 1s;
  text-align: center;

  opacity: 0;
  color: #ffffff;
  background-position: 50% 50%;
  background-size: cover;

  font-size: 40px;

  inset: 0;
}

.active {
  z-index: 0;

  opacity: 1;
}

.btn__controls {
  position: absolute;
  top: 50%;

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -ms-flex-align: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
          transform: translateY(-50%);
}
.btn__control {
  color: white;

  font-size: 3em;
}
.btn__play {
  cursor: pointer;
  -webkit-transition: 1s;
       -o-transition: 1s;
          transition: 1s;

  opacity: 0;

  font-size: 10em;
}
.btn__play:hover {
  opacity: 1;
}
.btn__pause {
  cursor: pointer;
  -webkit-transition: 1s;
       -o-transition: 1s;
          transition: 1s;

  opacity: 0;

  font-size: 10em;
}
.btn__pause:hover {
  opacity: 1;
}
.btn__prev {
  display: grid;
  -ms-flex-line-pack: center;
  align-content: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: start;

  width: 10%;
}
.btn__prev::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  width: 10%;

  content: "";
  -webkit-transition: opacity 0.5s;
       -o-transition: opacity 0.5s;
          transition: opacity 0.5s;

  opacity: 0;
  background: -webkit-gradient(linear, left top, right top, from(rgba(21, 21, 23, 0.8)), color-stop(98%, rgba(0, 0, 0, 0)));
  background: -o-linear-gradient(left, rgba(21, 21, 23, 0.8) 0%, rgba(0, 0, 0, 0) 98%);
  background:    linear-gradient(90deg, rgba(21, 21, 23, 0.8) 0%, rgba(0, 0, 0, 0) 98%);
}
.btn__prev:hover::before {
  opacity: 1;
}
.btn__next {
  display: grid;
  -ms-flex-line-pack: center;
  align-content: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: end;

  width: 10%;
  height: 100%;
}
.btn__next::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;

  width: 10%;

  content: "";
  -webkit-transition: opacity 0.5s;
       -o-transition: opacity 0.5s;
          transition: opacity 0.5s;

  opacity: 0;
  background: -webkit-gradient(linear, left top, right top, from(rgba(21, 21, 23, 0)), color-stop(98%, rgba(0, 0, 0, 0.8)));
  background: -o-linear-gradient(left, rgba(21, 21, 23, 0) 0%, rgba(0, 0, 0, 0.8) 98%);
  background:    linear-gradient(90deg, rgba(21, 21, 23, 0) 0%, rgba(0, 0, 0, 0.8) 98%);
}
.btn__next:hover::before {
  opacity: 1;
}

.fa-chevron-left {
  z-index: 10;

  cursor: pointer;

  text-shadow: 0 0 8px #ffffff;

  margin-inline: 20px;
}

.fa-chevron-right {
  z-index: 10;

  cursor: pointer;

  text-shadow: 0 0 8px #ffffff;

  margin-inline: 20px;
}

.indicators__container {
  position: absolute;
  bottom: 60px;
  left: 50%;

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
          transform: translateX(-50%);

  gap: 20px;
}
.indicators__item {
  width: 50px;
  height: 20px;

  cursor: pointer;

  border: 2px solid #ffffff;
  background-color: rgba(68, 89, 110, 0.4);
  -webkit-box-shadow: #ffffff -1px 1px 7px 2px;
          box-shadow: #ffffff -1px 1px 7px 2px;
}

.indicator__active {
  background-color: #ffffff;
}

@media (max-height: 767.8px) {
  .indicators__container {
    bottom: 30px;
  }
  .indicators__item {
    width: 30px;
    height: 15px;
  }
}

@media (max-width: 767.8px) {
  .btn__play {
    font-size: 5em;
  }
  .btn__pause {
    font-size: 5em;
  }
  .indicators__container {
    bottom: 30px;
  }
  .indicators__item {
    width: 30px;
    height: 15px;
  }
}
`
headDocument.append(style)
