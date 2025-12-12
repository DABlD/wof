const sectors = []

const names = [
  "Mr. Ijaz Ahmed Bin Abdul Hamid",
  "Mr. Kazuma Yorozu",
  "Mr. Ryosuke Kita",
  "Mr. Hiroshi Yasuo",
  "Mr. Wilmar E. Olayvar",
  "Capt. Takayuki Mibu",
  "Mr. Junard A. Espulgar",
  // "Mr. Rosano D. Subang",
  // "Mr. Dongchul Jung",
  "Mr. Minho Kim",
  // "Mr. Kwangtaek Seo",
  "Mr. Nae-Eun Jin",
  "Mr. Eejung Kim",
  "Mr. Jeyeong Jeong",
  "CE Romano A. Mariano",
  "Mr. Ko Kyoung Taek",
  "Mr. Gyak Gyeonghwan",
  "Mr. Kang Lee Seong",
  "Capt. Manfred August Ramos"
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
  // spinEl.textContent = sector.label
  spinEl.style.background = sector.color
}

const taya1 = [
  "Mr. Ryosuke Kita",
  "Capt. Takayuki Mibu",
  "Mr. Minho Kim",
  "Mr. Eejung Kim",
  "Mr. Kang Lee Seong"
]

const taya2 = [
  "Mr. Nae-Eun Jin",
]

const exclude = [
  "CE Romano A. Mariano",
  // "Mr. Kwangtaek Seo",
  "Mr. Ijaz Ahmed Bin Abdul Hamid",
  "Mr. Hiroshi Yasuo",
  "Mr. Kazuma Yorozu"
]

function frame() {
  if (!angVel) return
  angVel *= friction // Decrement velocity by friction
  // console.log(angVel, sectors[getIndex()].label);
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
    taya1.splice(taya1.indexOf(sectors[getIndex()].label), 1);
    Swal.fire({
      title: sectors[getIndex()].label,
      timer: 5000
    })
  }
  else if(angVel < 0.04 && (taya1.length == 0 && taya2.length > 0) && taya2.includes(sectors[getIndex()].label)){
    taya2.splice(taya2.indexOf(sectors[getIndex()].label), 1);
    Swal.fire({
      title: sectors[getIndex()].label,
      timer: 5000
    })
    angVel = 0;
  }
  else if(angVel < 0.002){
    angVel = 0;
  }

  // console.log(taya1);

  ang += angVel // Update angle
  ang %= TAU // Normalize angle
  rotate()
}

// function frame2() {
//   if (!angVel) return
//   angVel *= friction // Decrement velocity by friction
//   // console.log(angVel, sectors[getIndex()].label);
//   if (angVel < 0.042 && exclude.includes(sectors[getIndex()].label)){
//     angVel += 0.001 // SPEED UP
//     console.log("SPED UPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
//   }
  
//   if(angVel < 0.002){
//     angVel = 0;
//   }

//   // console.log(taya1);

//   ang += angVel // Update angle
//   ang %= TAU // Normalize angle
//   rotate()
// }

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