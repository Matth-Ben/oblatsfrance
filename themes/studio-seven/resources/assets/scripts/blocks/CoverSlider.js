import Block from './Block'
import SlideManager from '../util/SlideManager'
import gsap from 'gsap'

export default class CoverSlider extends Block {
  onEnterCompleted() {
    super.onEnterCompleted()

    this.currentIndex = 0

    this.createSlider()
    this.setHeight()
  }

  init() {
    for (let i = 1; i < this.slides.length; i++) {
      const { wrapper, image } = this.slides[i]

      gsap.set(image, { xPercent: 100 })
      gsap.set(wrapper, { xPercent: -100 })
    }
  }

  bindMethods() {
    super.bindMethods()

    this.prevSlide = this.prevSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.goTo = this.goTo.bind(this)
  }

  getElems() {
    this.slides = []
    this.$wrapper = this.el.querySelector('.b-cover-slider__items')
    this.$wrappers = this.el.querySelectorAll('.wrapper')
    this.$items = this.el.querySelectorAll('.b-cover-slider__item')
    this.$itemsImg = this.el.querySelectorAll('.b-cover-slider__imgs-item')
    this.$contents = this.el.querySelectorAll('.b-cover-slider__item')
    this.$pagerLeft = this.el.querySelector('.b-cover-slider__nav-left')
    this.$pagerRight = this.el.querySelector('.b-cover-slider__nav-right')

    for (let i = 0; i < this.$items.length; i++) {
      this.slides.push({
        wrapper: this.$wrappers[i],
        image: this.$itemsImg[i],
        content: this.$contents[i]
      })
    }
  }

  setHeight() {
    setTimeout(() => {
      this.$wrapper.style.height = this.$items[0].offsetHeight + 'px'
    }, 100)
  }


  events() {
    super.events()

    if (this.$items.length > 1) {
      this.$pagerLeft.addEventListener('click', this.prevSlide)
      this.$pagerRight.addEventListener('click', this.nextSlide)
    }
  }

  createSlider() {
    this.slider = new SlideManager({
      el: this.$wrapper,
      callback: (event) => {
        this.oldIndex = event.previous
        this.currentIndex = event.new
        this.direction = event.direction

        this.onSlideChange(this.slides[this.oldIndex], this.slides[this.currentIndex])
          .then(() => {
            this.slider.done()
          })
      }
    })
  }

  onSlideChange(old, current) {
    return new Promise((resolve) => {
      const heightWrapper = this.$items[this.currentIndex].offsetHeight;

      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 0.8
        },
        onComplete: () => {
          resolve()
        }
      })

      tl.to(this.$wrapper, {
        height: heightWrapper,
        delay: 0.3
      }, 0)

      tl.to(current.image, {
        xPercent: 0
      }, 0)

      tl.to(current.wrapper, {
        xPercent: 0
      }, 0)

      tl.to(current.content, {
        opacity: 1,
        delay: 0.6
      }, 0)

      tl.to(old.image, {
        xPercent: -100 * this.direction
      }, 0)

      tl.to(old.wrapper, {
        xPercent: 100 * this.direction
      }, 0)

      tl.to(old.content, {
        opacity: 0
      }, 0)

      if (this.currentIndex + 1 < this.slider.max) {
        this.$pagerRight.classList.remove('disabled')
      } else if (!this.$pagerRight.classList.contains('disabled')) {
        this.$pagerRight.classList.add('disabled')
      }

      if (this.currentIndex > 0) {
        this.$pagerLeft.classList.remove('disabled')
      } else if (!this.$pagerLeft.classList.contains('disabled')) {
        this.$pagerLeft.classList.add('disabled')
      }
    })
  }

  prevSlide() {
    this.slider.prev()
  }

  nextSlide() {
    this.slider.next()
  }

  goTo(i) {
    this.slider.goTo(i)
  }

  resize() {
    super.resize()

    this.setHeight()

    this.slider.goTo(0)
  }

}
