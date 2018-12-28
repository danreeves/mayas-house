async function loadImage(url) {
  let response = await fetch(url)
  let data = await response.blob()
  let size = await getImageSize(data)
  const bitmap = await createImageBitmap(data)
  return { ...size, data, bitmap }
}

async function getImageSize(blob) {
  let url = URL.createObjectURL(blob)
  let img = document.createElement('IMG')
  let promise = new Promise(resolve => {
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      })
    }
    img.src = url
  })
  return promise
}

export class Game {
  constructor ({ canvas }) {
    this.canvas = document.querySelector(canvas)
    this.ctx = this.canvas.getContext('2d')
    this.run = this.run.bind(this)

    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
    this.loadAssets.call(this)
    this.run()
  }

  async loadAssets () {
    this.bg = await loadImage('assets/map.png')
  }

  run () {
    requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      if (!this.bg) {
        this.ctx.font = '32px serif'
        this.ctx.fillText('Loading...', this.canvas.width / 2 - 50, this.canvas.height / 2 - 16)
      } else {
        this.ctx.fillStyle = '#80B3E5'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        let heightRatio = this.canvas.height * 1.25 / this.bg.height
        this.ctx.drawImage(
          this.bg.bitmap, // Image
          0, // Source x
          0, // Source y
          this.bg.width, // Source width
          this.bg.height, // Source height
          -40, // Canvas x
          0, // Canvas y
          (this.bg.width * heightRatio) + 80, // canvas width
          this.canvas.height * 1.25 // Canvas height
        )
      }

      this.run()
    })
  }
}
