import * as PIXI from 'pixi.js'

// create audioelements that are to be looped
const elcount = 10
for (let i = 0; i < elcount; i++) {
  const audioel = document.createElement('AUDIO')
  audioel.src = 'assets/click_silence.mp3'
  audioel.id = 'sound' + i
  document.getElementById('app').appendChild(audioel)
}

const onClick = () => {
  turning = true
  rotationspeed = 0.07 + Math.random() * 0.07
}

const bdiv = document.createElement('div')
const button = document.createElement('button')
bdiv.appendChild(button)
button.appendChild(document.createTextNode('Roll the wheel'))
button.setAttribute('style', 'font-size:18px')
button.addEventListener('click', onClick)

document.getElementById('app').appendChild(bdiv)

const names = ['mickey mouse', 'donald duck', 'uncle scrooge', 'daisy duck']

const app = new PIXI.Application({
  width: 600,
  height: 400,
  backgroundColor: 0x11ffff,
  resolution: window.devicePixelRatio || 1
})
document.getElementById('app').appendChild(app.view)

// Create a new texture
const texture = PIXI.Texture.from('assets/arrow.png')

const middlex = app.screen.width / 2
const middley = app.screen.height / 2

// Create a sprite of arrow
const arrow = new PIXI.Sprite(texture)
arrow.anchor.set(0.5)
arrow.width = 200
arrow.height = 220
arrow.x = middlex
arrow.y = middley
arrow.rotation = Math.random() * 2 * Math.PI

app.stage.addChild(arrow)

let turning = false
let rotationspeed = 0
const friction = 0.00008

// create sectors
let style = new PIXI.TextStyle({
  fontFamily: 'Comic Sans MS',
  fontSize: 18,
  fill: 'white',
  stroke: '#ff3300',
  strokeThickness: 2,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 3,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 3
})

const radius = 140
const sectors = []
names.map((name, i) => {
  const sector = (2 * Math.PI * i) / names.length
  let message = new PIXI.Text(name, style)
  app.stage.addChild(message)
  const messagex = middlex + Math.cos(sector) * radius - message.width / 2
  const messagey = middley + Math.sin(sector) * radius - message.height / 2
  message.position.set(messagex, messagey)
  sectors.push({ name, sector })
})

const tick = 30
let ticked = false
let previousAngle = 0
let currentAudioEl = 0

function gameLoop() {
  //Call this `gameLoop` function on the next screen refresh
  //(which happens 60 times per second)
  requestAnimationFrame(gameLoop)

  const degrees = arrow.rotation * (180 / Math.PI)

  if (rotationspeed < 0 && turning) {
    turning = false
    const finalAngle = degrees % 360
    console.log(finalAngle)
    console.log(sectors)
  }

  const currentAngle = degrees % tick

  if (currentAngle < previousAngle) {
    const audioel = document.getElementById('sound' + currentAudioEl.toString())
    audioel.pause()
    audioel.currentTime = 0
    audioel.play()
    //audio.cloneNode().play();
    currentAudioEl = (currentAudioEl + 1) % elcount
    ticked = false
  }
  previousAngle = currentAngle

  if (turning) {
    arrow.rotation += rotationspeed
    rotationspeed = rotationspeed - friction
  }
}

//Start the loop
gameLoop()
