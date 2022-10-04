import gsap from 'gsap'
import store from './store'

export default class Loader {
  constructor() {
    this.getElems()
  }

  getElems() {
    store.panel = document.querySelector('.panel')
  }

  play() {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          store.menu && !store.detect.isMobile && store.menu.init()

          resolve()
        }
      })

      // eslint-disable-next-line prefer-reflect
      tl
        .to(store.panel, {
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
        .call(() => {
          window.dispatchEvent(new CustomEvent('loaderComplete'))
          store.isFirstLoaded = true
        }, [], 0)
    })
  }
}
