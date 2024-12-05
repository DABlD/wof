const sectors = []

const names = [
  "Mr. Ryosuke Kita ",
  "Mr. Tsutomu Fujii",
  "Mr. Hiroshi Yasuo",
  "Mr. Wilmar Olayvar",
  "Mr. Kenichi Kouno",
  "Mr. Junard Espulgar",
  "Mr. Yoshiyuki Tsukai",
  "Mr. Yuya Utsumi",
  "Capt. Danilo Sta. Ana",
  "Mr. Kim Bojoong",
  "Mr. Lee, Jeongho",
  "Mr. Seo, Kwang-Taek",
  "Mr. Lee, Sanghun",
  "Mr. Bang, Sangbin",
  "Mr. Seo, Jeongho",
  "Mr. Sim Jae Sin",
  "CE Romano A. Mariano",
  "Mr. Shim Woohyun",
  "Mr. Ko Kyoung Taek",
  "Mr. Gwak Gyeonghwan",
  "Capt. Hernan Castillo",
  "CE Jose Melchor Del Pilar"
]

names.forEach(name => {
  sectors.push({color: '#' + Math.random().toString(16).slice(-6), label: name})
})

const rand = (m, M) => Math.random() * (M - m) + m
const tot = sectors.length
const spinEl = document.querySelector('#spin')
const ctx = document.querySelector('#wheel').getContext('2d')
const dia = ctx.canvas.width
const rad = dia / 2
const PI = Math.PI
const TAU = 2 * PI
const arc = TAU / sectors.length

const friction = 0.991 // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0 // Angular velocity
let ang = 0 // Angle in radians

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot

function drawSector(sector, i) {
  const ang = arc * i
  ctx.save()
  // COLOR
  ctx.beginPath()
  ctx.fillStyle = sector.color
  ctx.moveTo(rad, rad)
  ctx.arc(rad, rad, rad, ang, ang + arc)
  ctx.lineTo(rad, rad)
  ctx.fill()
  // TEXT
  ctx.translate(rad, rad)
  ctx.rotate(ang + arc / 2)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 25px sans-serif'
  ctx.fillText(sector.label, rad - 10, 10)
  //
  ctx.restore()
}

function rotate() {
  const sector = sectors[getIndex()]
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
  spinEl.textContent = !angVel ? 'SPIN' : sector.label
  spinEl.textContent = sector.label
  spinEl.style.background = sector.color
}

const taya1 = [
  "Mr. Lee, Jeongho",
  "Mr. Seo, Kwang-Taek",
  "Mr. Yuya Utsumi",
  "Mr. Ko Kyoung Taek",
  "Mr. Yoshiyuki Tsukai"
]

const exclude = [
  "CE Romano A. Mariano",
  "Capt. Hernan Castillo",
  "Mr. Sim Jae Sin",
  "Mr. Seo, Jeongho"
]

function frame() {
  if (!angVel) return
  angVel *= friction // Decrement velocity by friction
  console.log(angVel, sectors[getIndex()].label);
  if (angVel < 0.042 && exclude.includes(sectors[getIndex()].label)){
    angVel += 0.001 // SPEED UP
    console.log("SPED UPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
    console.log("SPED UPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
    console.log("SPED UPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
    console.log("SPED UPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
    console.log("SPED UPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
    console.log("SPED UPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
    console.log("SPED UPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
  }
  
  if (angVel < 0.04 && taya1.includes(sectors[getIndex()].label)){
    angVel = 0 // Bring to stop
    taya1.splice(taya1.indexOf(sectors[getIndex()].label), 1)
    Swal.fire({
      title: sectors[getIndex()].label
    })
  }
  else if(angVel < 0.002){
    angVel = 0;
  }

  console.log(taya1);

  ang += angVel // Update angle
  ang %= TAU // Normalize angle
  rotate()
}

function engine() {
  frame()
  requestAnimationFrame(engine)
}

function init() {
  sectors.forEach(drawSector)
  rotate() // Initial rotation
  engine() // Start engine
  spinEl.addEventListener('click', () => {
    if (!angVel) angVel = rand(0.25, 0.45)
  })
}

init()

document.addEventListener('keydown', function(e) {
  console.log(e.keyCode);
  if([9, 33, 34].includes(e.keyCode)){
    document.getElementById("spin").click();
  }
});