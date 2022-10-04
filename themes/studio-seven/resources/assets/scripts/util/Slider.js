import SlideManager from './SlideManager'

export default class Slider {
  constructor({ el, pagers, data, cb }) {
    this.el = el
    this.pagers = pagers
    this.data = data
    this.cb = cb
    this.inView = false

    this.bindMethods()
  }

  init() {
    this.instance = new SlideManager({
      length: this.data.length,
      loop: true,
      callback: (event) => {
        this.old = event.previous
        this.current = event.new
        this.direction = event.direction

        this.cb(this.data[this.old], this.data[this.current]).then(this.instance.done.bind(this.instance))
      }
    })

    this.listener('add')
  }

  bindMethods() {
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.key = this.key.bind(this)
  }

  listener(a) {
    if (this.pagers) {
      this.pagers[0][a + 'EventListener']('click', this.prev)
      this.pagers[1][a + 'EventListener']('click', this.next)
    }
    document[a + 'EventListener']('keydown', this.key)
  }

  destroy() {
    this.listener('remove')
  }

  prev() {
    this.instance.prev()
  }

  next() {
    this.instance.next()
  }

  key(e) {
    if (!this.inView) return

    if (e.key === 'ArrowLeft') this.prev()
    else if (e.key === 'ArrowRight') this.next()
  }
}
