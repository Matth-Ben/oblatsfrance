export default {
  debug: window.App.debug,
  // Available values : locomotive-scroll, lenis, false
  scrollEngine: 'lenis',
  smoothScroll: null,
  observer: null,
  panel: null,
  isFirstLoaded: false,
  modules: {},
  detect: {
    uA: navigator.userAgent.toLowerCase(),
    get iPadIOS13() {
     return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
    },
    get isMobile() {
      return (/mobi|android|tablet|ipad|iphone/).test(this.uA) || this.iPadIOS13
    },
    get isMobileAndroid() {
      return (/android.*mobile/).test(this.uA)
    },
    get isFirefox() {
      return this.uA.indexOf('firefox') > -1
    },
    get isAndroid() {
      return this.isMobileAndroid || !this.isMobileAndroid && (/android/i).test(this.uA)
    },
    get safari() {
        return this.uA.match(/version\/[\d.]+.*safari/)
    },
    get isSafari() {
      return this.safari && !this.isAndroid
    }
  },
  lerp: (s, e, v) => s * (1 - v) + e * v,
  clamp: (v, min, max) => Math.min(Math.max(v, min), max),
  map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
  round: (v, d) => {
    const e = d ? Math.pow(10, d) : 100

    return Math.round(v * e) / e
  },
  wrap: (v, min, max) => {
    const r = max - min
    const func = (e) => (r + (e - min) % r) % r + min

    return v || v === 0 ? func(v) : func
  }
}
