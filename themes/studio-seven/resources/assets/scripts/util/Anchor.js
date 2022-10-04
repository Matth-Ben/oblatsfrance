import store from './store'

export default class Anchor {
  constructor() {
    this.offset = store.w.w > 1200 ? -150 : -75
    this.index = 0

    this.getElems()
    this.init()
    this.events()
  }

  getElems() {
    this.$anchors = document.querySelectorAll('a[href^="#"]')
  }

  init() {
    this.anchors = []

    for (let i = 0; i < this.$anchors.length; i++) {
      const id = this.$anchors[i].getAttribute('href')

      if (id !== '#') {
        const element = document.querySelector(id)
        const anchor = document.createElement('div')

        anchor.classList = this.$anchors[i].classList
        anchor.innerHTML = this.$anchors[i].innerHTML

        this.$anchors[i].parentNode.insertBefore(anchor, this.$anchors[i]);
        this.$anchors[i].parentNode.removeChild(this.$anchors[i]);

        this.anchors[this.index] = {
          button: anchor,
          target: element
        }

        this.index++
      }
    }
  }

  events() {
    for (let i = 0; i < this.anchors.length; i++) {
      this.anchors[i].button.addEventListener('click', this.scrollTo.bind(this, i))
    }
  }

  scrollTo(i) {
    store.smoothScroll.scrollTo(this.anchors[i].target, {offset: this.offset})

    if (store.scrollEngine === 'locomotive-scroll') store.smoothScroll.update()
  }
}
