import Splitting from 'splitting'

export default class WrapLines {
  constructor({ el, className = 'line', properties = [] }) {
    this.el = el
    this.html = el.innerHTML
    this.className = className
    this.properties = properties

    this.wrap()
  }

  wrap() {
    // eslint-disable-next-line object-property-newline
    const lines = new Splitting({ target: this.el, by: 'lines' })[0].lines

    let html = ''

    for (let i = 0; i < lines.length; i++) {
      const lineEl = document.createElement('div')
      const line = document.createElement('div')

      lineEl.classList.add('l-wrap')

      this.properties.forEach((property) => {
        lineEl.dataset[property.type] = `${property.value}`
      })

      line.classList.add(this.className)
      line.style.setProperty('--w-line-index', i)

      for (let j = 0; j < lines[i].length; j++) {
        const word = lines[i][j]
        const whitespace = word.nextSibling

        line.appendChild(word)
        whitespace && line.appendChild(whitespace)
      }

      lineEl.appendChild(line)
      html += lineEl.outerHTML
    }

    this.el.innerHTML = html
  }
}
