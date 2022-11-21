import gsap from 'gsap'
import store from './store'

export default class Menu {
  constructor() {
    this.menuOpen = false
    this.searchOpen = false
    this.isAnimating = false

    this.bindMethods()
    this.getElems()
    this.addEvents()
    this.init()

    this.onPageChange(window.location.href)
  }

  bindMethods() {
    this.toggle = this.toggle.bind(this)
  }

  getElems() {
    this.$toggler = document.querySelector('.header-top__toggler')
    this.$top = document.querySelector('.header-top')
    this.$nav = document.querySelector('.header-nav')
    this.$items = this.$nav.querySelectorAll('.header-nav__item-link')
    this.$languages = this.$nav.querySelectorAll('.lang-item__label')
    this.$login = this.$nav.querySelector('.login-label')
    this.$search = this.$nav.querySelector('.search')
    this.$searchBar = document.querySelector('.header-search')
    this.$searchButton = document.querySelectorAll('.search')
    this.$address = this.$nav.querySelector('.header-nav__address')
    this.$founder = this.$nav.querySelector('.header-nav__founder')
  }

  addEvents() {
    this.$toggler && this.$toggler.addEventListener('click', this.toggle)

    for (let i = 0; i < this.$searchButton.length; i++) {
      this.$searchButton[i] && this.$searchButton[i].addEventListener('click', this.toggleSearch.bind(this, i))
    }
  }

  init() {
    const tl = gsap.timeline({
      onStart: () => {
        resolve()
      }
    })

    tl
      .set(this.$nav, { xPercent: window.innerWidth < 1025 ? 100 : 0 })
      .set(this.$items, { yPercent: window.innerWidth < 1025 ? 100 : 0 })
      .set([this.$languages, this.$login], { yPercent: 100 })
      .set([this.$address, this.$founder], { opacity: 0 })
      .set(this.$searchBar, { yPercent: -100 })
      .set(this.$search, {
        scale: 0.5,
        opacity: 0
      })
  }

  toggle() {
    if (this.isAnimating) return

    if (this.menuOpen) this.close()
    else this.open()
  }

  toggleSearch(i) {
    if (this.searchOpen) this.closeSearch(i)
    else this.openSearch(i)
  }

  open() {
    return new Promise((resolve) => {
      this.menuOpen = true
      this.$toggler.classList.add('open')

      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 0.75
        },
        onStart: () => {
          this.menuOpen = true
        }
      })

      tl
        .fromTo(this.$nav, { xPercent: 100 }, { xPercent: 0 }, 0)
        .fromTo(this.$items, {
          yPercent: 100
        }, {
          yPercent: 0,
          stagger: 0.06
        }, 0.04)
        .fromTo(this.$languages, {
          yPercent: 100
        }, {
          yPercent: 0,
          stagger: 0.06
        }, 0.5)
        .fromTo(this.$search, {
          scale: 0,
          opacity: 0
        }, {
          scale: 1,
          opacity: 1
        }, 0.55)
        .fromTo(this.$login, { yPercent: 100 }, { yPercent: 0 }, 0.6)
        .fromTo(this.$address, { opacity: 0 }, { opacity: 1 }, 0.7)
        .fromTo(this.$founder, { opacity: 0 }, { opacity: 1 }, 0.8)

      resolve()
    })
  }

  close() {
    return new Promise((resolve) => {
      this.menuOpen = false
      this.$toggler.classList.remove('open')

      const tl = gsap.timeline({
        onStart: () => {
          this.menuOpen = false
        }
      })

      tl.fromTo(this.$nav, {
        xPercent: 0
      }, {
        xPercent: 100,
        duration: 0.75,
        ease: 'power3.out'
      }, 0)

      resolve()
    })
  }

  openSearch(i) {
    return new Promise((resolve) => {
      this.searchOpen = true
      this.$searchButton[i].classList.add('open')

      const tl = gsap.timeline({
        defaults: {
          duration: 0.75,
          ease: 'power3.out'
        },
        onStart: () => {
          this.searchOpen = true
        }
      })

      tl.fromTo(this.$searchBar, { yPercent: -100 }, { yPercent: 0 }, 0)

      resolve()
    })
  }

  closeSearch(i) {
    return new Promise((resolve) => {
      this.searchOpen = false
      this.$searchButton[i].classList.remove('open')

      const tl = gsap.timeline({
        defaults: {
          duration: 0.75,
          ease: 'power3.out'
        },
        onStart: () => {
          this.searchOpen = false
        }
      })

      tl.fromTo(this.$searchBar, { yPercent: 0 }, { yPercent: -100 }, 0)

      resolve()
    })
  }

  resize() {
    this.init()

    if (this.menuOpen) this.close()
    if (this.searchOpen) this.closeSearch()
  }

  scroll() {
    if (store.detect.isMobile) return

    const last = this.currentScroll
    const scroll = store.smoothScroll.scroll

    this.currentScroll = scroll

    if (last < this.currentScroll && this.currentScroll > store.w.h) {
      gsap.to([this.$top, this.$nav, this.$searchBar], {
        y: -126,
        duration: 0.8,
        ease: 'power3.out'
      })
    } else if (last >= this.currentScroll) {
      gsap.to([this.$top, this.$nav, this.$searchBar], {
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
    }
  }

  // eslint-disable-next-line no-unused-vars
  onPageChange(loc) {
    if (this.menuOpen) this.close()
    if (this.searchOpen) this.closeSearch()
  }
}

