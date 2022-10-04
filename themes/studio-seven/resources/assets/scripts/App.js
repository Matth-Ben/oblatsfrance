import 'whatwg-fetch'
import 'intersection-observer'

import LazyLoad from 'vanilla-lazyload'
import Highway from '@dogstudio/highway'
import { throttle, debounce } from 'throttle-debounce'
import { listen } from 'quicklink'

// Utils
import Loader from './util/Loader'
import Menu from './util/Menu'
import Anchor from './util/Anchor'
import store from './util/store'
import Observer from './util/Observer'
import locomotiveScroll from 'locomotive-scroll'
import Lenis from '@studio-freight/lenis'

// Routes
import Page from './routes/Page'

// Transitions
import Fade from './transitions/Fade'

export default class App {

  /**
  * Loads the page
  * then calls `this.start()` when DOM is ready
  */
  constructor() {
    this.resize = this.resize.bind(this)
    this.scroll = this.scroll.bind(this)
    this.update = this.update.bind(this)

    this.raf = null

    this.resizeDebounced = debounce(100, this.resize)
    this.resizeThrottled = throttle(150, this.resize)

    if (!store.scrollEngine) {
      this.scrollDebounced = debounce(100, this.scroll)
      this.scrollThrottled = throttle(50, this.scroll)
    }

    store.w = {
      w: window.innerWidth,
      h: window.innerHeight,
      pR: Math.min(window.devicePixelRatio, 2)
    }

    this.start()
  }

  /**
  * Inits everything that is app-wide
  * ie: Menu, scroll / resize events...
  *
  * @returns {void}
  */
  start() {
    if (store.scrollEngine === 'locomotive-scroll') this.initLocomotiveScroll()
    else if (store.scrollEngine === 'lenis') this.initLenis()
    else this.initObserver()

    store.loader = new Loader()
    this.menu = new Menu()
    this.anchor = new Anchor()
    this.lazyLoad = new LazyLoad()

    this.initHighway().then(() => {
      this.events()
      this.update()

      if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

      window.scrollTo(0, 0)

      // Detach adminbar links
      const adminbarLinks = document.body.querySelectorAll('#wpadminbar a')

      adminbarLinks && store.router.detach(adminbarLinks)

      if (store.scrollEngine === 'locomotive-scroll') store.smoothScroll && store.smoothScroll.update()

      this.checkAnchor()
    })
  }

  initObserver() {
    store.observer = new Observer()
  }

  initLocomotiveScroll() {
    /* eslint-disable-next-line */
    store.smoothScroll = new locomotiveScroll({
      el: document.body.querySelector('.js-scroll'),
      smooth: true,
      passive: true,
      inertia: 1.0
    })
  }

  initLenis() {
    store.smoothScroll = new Lenis({
      lerp: 0.08,
      smooth: true,
      direction: 'vertical'
    })

    document.documentElement.classList.add('lenis')
    this.initObserver()
  }

  /**
  * Starts an Highway instance
  * with our Views and Transitions
  *
  * @returns {void}
  */
  initHighway() {
    return new Promise((resolve) => {
      store.router = new Highway.Core({
        renderers: { page: Page },
        transitions: { default: Fade }
      })

      this.setCurrentRenderer()
        .then(resolve)
    })
  }

  setCurrentRenderer() {
    return new Promise((resolve) => {
      store.router.properties.renderer.then(() => {
        this.currentRenderer = store.router.To ? store.router.To : store.router.From

        resolve(this.currentRenderer)
      })
    })
  }

  resize() {
    store.w = {
      w: window.innerWidth,
      h: window.innerHeight,
      pR: Math.min(window.devicePixelRatio, 2)
    }

    this.currentRenderer.resize()
    this.menu && this.menu.resize()
  }

  scroll(e) {
    store.scrollEngine === 'lenis' && (store.smoothScroll.direction = this.oldScroll <= e ? 1 : -1)
    this.currentRenderer.scroll(e)
    this.menu && this.menu.scroll()
    this.oldScroll = e
  }

	update() {
    store.scrollEngine === 'lenis' && store.smoothScroll.raf()
		this.currentRenderer.update()
		requestAnimationFrame(this.update)
	}

  events() {
    window.addEventListener('resize', this.resizeThrottled)
    window.addEventListener('resize', this.resizeDebounced)
    window.addEventListener('orientationchange', this.resize)

    if (store.scrollEngine === 'locomotive-scroll') {
      store.smoothScroll && store.smoothScroll.on('scroll', this.scroll)
      store.smoothScroll.on('call', (value, way, object) => {
        this.currentRenderer.inView(value, way, object)
      })
    } else if (store.scrollEngine === 'lenis') {
      store.smoothScroll.on('scroll', ({ scroll }) => {
        this.scroll(scroll)
      })
    } else {
      window.addEventListener('scroll', this.scrollThrottled)
      window.addEventListener('scroll', this.scrollDebounced)
    }

    store.router.on('NAVIGATE_IN', () => {
      this.setCurrentRenderer().then((renderer) => {
        document.title = renderer.properties.page.title
      })

      this.lazyLoad.update()
    })

    store.router.on('NAVIGATE_END', ({ to, location }) => {
      if (typeof ga !== 'undefined') {
        ga('set', 'location', location.href);
        ga('set', 'page', location.pathname)
        ga('set', 'title', to.page.title)
        ga('send', 'pageview')
      }

      this.menu.onPageChange(location.href)

      this.checkAnchor(location)
      listen({ el: to.view })

      this.detachAdminBarLinks(to)
    })

    window.addEventListener('highwayredirect', (e) => {
      store.router.redirect(e.detail.url)
    })
  }

  detachAdminBarLinks(to) {
    const adminBarLinks = document.body.querySelectorAll('#wpadminbar a')
    const newAdminBarLinks = to.page.body.querySelectorAll('#wpadminbar a')

    for (let i = 0; i < newAdminBarLinks.length; i++) adminBarLinks[i].href = newAdminBarLinks[i].href

    store.router.detach(adminBarLinks)
  }

  checkAnchor(location = null) {
    const bodyClassSubmit = Array.from(document.body.classList).find((elt) => elt.includes('formsubmit'))
    let anchor = null

    if (location && location.anchor) anchor = location.anchor
    else if (bodyClassSubmit) {
      const validate = document.querySelector('#gform_confirmation_message_' + bodyClassSubmit.split('-')[1])
      const error = document.querySelector('#gform_wrapper_' + bodyClassSubmit.split('-')[1])

      if (validate) anchor = 'gform_confirmation_message_' + bodyClassSubmit.split('-')[1]
      else if (error) anchor = 'gform_wrapper_' + bodyClassSubmit.split('-')[1]
    } else {
      const idx = window.location.href.indexOf('#')

      if (idx !== -1) anchor = window.location.href.substring(idx + 1)
    }

    if (anchor) {
      const el = document.querySelector('#' + anchor)

      if (el) {
        if (store.scrollEngine === 'locomotive-scroll') {
          store.smoothScroll.scrollTo(el)
          store.smoothScroll.update()
        } else if (store.scrollEngine === 'lenis') {
          store.smoothScroll.scrollTo(el)
        } else {
          const elRect = el.getBoundingClientRect()

          window.scrollTo(0, elRect.top)
        }
      }
    }
  }
}
