export default class Menu {
  constructor() {
    this.menuOpen = false
    this.isAnimating = false

    this.bindMethods()
    this.getElems()
    this.addEvents()

    this.onPageChange(window.location.href)
  }

  bindMethods() {
    this.toggle = this.toggle.bind(this)
  }

  getElems() {}

  addEvents() {
    this.toggler && this.toggler.addEventListener('click', this.toggle)
  }

  toggle() {
    if (this.isAnimating) return

    if (this.menuOpen) this.close()
    else this.open()
  }

  open() {
    return new Promise((resolve) => {
      this.menuOpen = true
      resolve()
    })
  }

  close() {
    return new Promise((resolve) => {
      this.menuOpen = false
      resolve()
    })
  }

  resize() {}

  scroll() {}

  // eslint-disable-next-line no-unused-vars
  onPageChange(loc) {}
}
