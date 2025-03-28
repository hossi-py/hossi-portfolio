<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null) // canvas DOM에 접근할 ref 변수
let ctx: CanvasRenderingContext2D | null = null // canvas 2D context 저장을 위한 변수 (도형, 이미지, 텍스트 등을 그림)
let animationId: number // animation 요청 및 중단
let tick = 0 // 눈송이가 흔들리게 하는 틱 증가 변수

const snowflakes: Snowflake[] = []
const maxFlakes = 200
let ground: number[] = [] // 바닥 각 x좌표별 눈 높이 정보 저장

const snowImages = [new Image(), new Image()]
snowImages[0].src = '/src/assets/images/snow-1.png'
snowImages[1].src = '/src/assets/images/snow-2.png'

class Snowflake {
  x!: number
  y!: number
  size!: number
  speed!: number
  image: HTMLImageElement
  windOffset = Math.random() * 100 // 눈송이마다 고유한 바람 진동 위상 (tick과 관련)

  /** constructor => 클래스의 인스턴스를 생성할 때 자동으로 호출되는 함수 */
  constructor() {
    // 눈송이 이미지 랜덤으로 하고 초기화
    this.image = snowImages[Math.floor(Math.random() * snowImages.length)]
    this.reset()
  }

  /** 눈송이 정보를 초기화하고 화면 밖으로 나갈 경우 reset하여 다시 내리게 하는 효과 */
  reset() {
    this.x = Math.random() * (canvas.value?.width || 0)
    this.y = -Math.random() * 50
    this.size = Math.random() * 12 + 6
    this.speed = Math.random() * 1 + 0.5
  }

  /** 위치, 속도 업데이트 */
  update() {
    const x = Math.floor(this.x)
    const groundY = ground[x] || canvas.value!.height // 현재 바닥 높이

    const maxHeight = canvas.value!.height * 0.3 // 최대 높이 제한 (30% 이상 쌓이면 중단)

    if (groundY <= maxHeight) {
      this.reset() // 너무 많이 쌓이면 새로운 눈으로 reset
      return
    }

    // 눈이 바닥에 닿았을 때
    if (this.y + this.size >= groundY) {
      const spread = Math.floor(this.size / 1.2) // 쌓이는 눈이 퍼지는 정도 조절
      for (let dx = -spread; dx <= spread; dx++) {
        const gx = x + dx
        if (gx >= 0 && gx < ground.length) {
          const distance = Math.abs(dx)
          const intensity = Math.pow(1 - distance / (spread + 1), 2) // 곡선을 부드럽게
          ground[gx] -= this.size * 0.5 * intensity // 눈 쌓기
        }
      }
      this.reset()
    } else {
      this.y += this.speed // 눈을 아래로 이동시킴
      // 좌우로 살짝 흔들리게
      this.x += Math.sin(tick + this.windOffset) * 0.3
    }
  }

  /** 화면에 눈송이 그리기 */
  draw() {
    if (!ctx || !this.image.complete) return
    ctx.save() // 현재 캔버스 상태 저장
    ctx.globalAlpha = 0.9 // 부드러운 느낌 (투명도)
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
    ctx.restore() // 이전 상태 복구 (그리는 대상마다 설정이 다를 때 사용)
  }
}

/** 바닥에 쌓인 눈 그리는 함수 */
function drawGround() {
  if (!ctx || !canvas.value) return

  for (let x = 0; x < canvas.value.width; x++) {
    const groundY = ground[x]
    const height = canvas.value.height - groundY

    const grad = ctx.createLinearGradient(0, groundY, 0, canvas.value.height)
    grad.addColorStop(0, '#fff') // 위쪽은 흰색
    grad.addColorStop(1, '#d0d0d0') // 아래쪽은 살짝 회색 섞기

    ctx.fillStyle = grad
    ctx.fillRect(x, groundY, 3, height) // 각 x 좌표마다 3px 너비로 눈을 그린다 (값이 작을수록 뾰족한 형태)
  }
}

/** 뾰족하게 쌓인 눈을 평탄하게 */
function smoothGround() {
  for (let i = 1; i < ground.length - 1; i++) {
    ground[i] = (ground[i - 1] + ground[i] + ground[i + 1]) / 3
  }
}

/** 프레임마다 애니메이션 수행 */
function animate() {
  if (!ctx || !canvas.value) return
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height) // 캔버스 초기화
  tick += 0.01

  for (const flake of snowflakes) {
    flake.update()
    flake.draw()
  }

  smoothGround()
  drawGround()
  animationId = requestAnimationFrame(animate) // 다음 프레임 예약
}

onMounted(() => {
  const cvs = canvas.value
  if (!cvs) return
  cvs.width = window.innerWidth
  cvs.height = window.innerHeight
  ctx = cvs.getContext('2d') // 2D 캔버스 설정

  ground = new Array(cvs.width).fill(cvs.height) // 바닥 초기화

  for (let i = 0; i < maxFlakes; i++) {
    snowflakes.push(new Snowflake()) // 눈송이 생성
  }

  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <canvas ref="canvas" class="snow-canvas"></canvas>
</template>

<style scoped>
.snow-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  pointer-events: none;
}
</style>
