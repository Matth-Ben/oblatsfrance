import store from './store'

export default class Observer {
  constructor() {
    this.onObserve = this.onObserve.bind(this)
    this.observed = []

    this.initObserver()
  }

  initObserver() {
    this.observer = new IntersectionObserver(this.onObserve, {
      rootMargin: '0px',
      threshold: 0
    })
  }

  on() {
    this.observed = []
    this.$elems = document.querySelectorAll('.observe')

    for (let i = 0; i < this.$elems.length; i++) {
      this.observe({
        el: this.$elems[i],
        repeat: this.$elems[i].dataset.observerRepeat !== undefined,
        class: true
      })
    }
  }

  off() {
    for (let i = 0; i < this.observed.length; i++) this.unobserve(this.observed[i].el)
  }

  observe(observable) {
    this.observed.push(observable)
    this.observer.observe(observable.el)
  }

  unobserve(el) {
    this.observer.unobserve(el)
  }

  onObserve(entries) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]

      if (entry.isIntersecting) {
        const target = this.observed.filter((obs) => obs.el === entry.target)[0]

        target.hasIntersected = true
        target.cb && target.cb(true)
        target.class && target.el.classList.add('in-view')
        !target.repeat && this.unobserve(target.el)
      } else {
        const target = this.observed.filter((obs) => obs.el === entry.target)[0]

        if (target.hasIntersected) {
          target.repeat && target.class && target.el.classList.remove('in-view')
          target.repeat && target.cb && target.cb(false)
          target.once && store.smoothScroll.direction === 1 && this.unobserve(target.el)
        }
      }
    }
  }
}
