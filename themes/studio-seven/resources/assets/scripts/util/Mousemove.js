/* eslint-disable brace-style */

export default class MouseMove {
  constructor(el) {
    this.el = el

    this.mouseData = {
      mousePos: [0, 0],
      direction: [0, 0],
      speed: [0, 0]
    }

    this.out = this.mouseData

    this.listener('add')
  }

  on() {
    this.listener('add')
  }

  off() {
    this.listener('remove')
  }

  listener (a) {
    const command = a + 'EventListener'

    // eslint-disable-next-line max-statements-per-line
    this.el[command]('mousemove', (e) => { this.update(e) })
  }

  update (e) {
    const mousePos = [e.offsetX, e.offsetY]
    const speed = [mousePos[0] - this.mouseData.mousePos[0], mousePos[1] - this.mouseData.mousePos[1]]

    // eslint-disable-next-line prefer-const
    let direction = [this.mouseData.direction[0], this.mouseData.direction[1]]

    if (Math.sign(speed[0]) !== 0 || Object.is(Math.sign(speed[0]), -0)) direction[0] = Math.sign(speed[0])
    if (Math.sign(speed[1]) !== 0 || Object.is(Math.sign(speed[1]), -0)) direction[1] = Math.sign(speed[1])


    this.mouseData = {
      mousePos,
      direction,
      speed
    }

    this.out = this.mouseData
  }
}
