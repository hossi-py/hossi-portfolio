<script setup lang="ts">
import { computed } from 'vue'

const imageUrl = computed(() => {
  const num = Math.floor(Math.random() * 5) + 1
  return `/src/assets/images/cherry-blossom-leaf-${num}.png`
})

const petalStyle = computed(() => {
  const duration = randomBetween(10, 18)
  const delay = randomBetween(0, 8)

  return {
    left: `${randomBetween(-10, 100)}%`, // 화면 바깥쪽에서도 애니메이션 시작하도록
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`, // 천천히 떨어지는 효과
    transform: `scale(${randomBetween(0.4, 0.6)}) rotate(${randomBetween(0, 360)}deg)`, // 크기 랜덤으로 조정
    opacity: randomBetween(0.7, 1), // 투명도 추가
    zIndex: Math.floor(randomBetween(5, 15)), // zIndex가 모두 동일하지 않게
  }
})

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}
</script>

<template>
  <img class="falling-petal" :src="imageUrl" alt="petal" :style="petalStyle" />
</template>

<style scoped>
.falling-petal {
  position: absolute;
  top: -10%;
  width: 24px;
  height: auto;
  pointer-events: none;
  user-select: none;
  /* 성능 최적화 => transform이 바뀔 거라고 브라우저에 알려줌 */
  will-change: transform;
  animation-name: fall;
  /* 가속도 곡선 => 부드럽게 흔들리며 떨어지는 효과 */
  animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
  /** 애니메이션 무한 반복 */
  animation-iteration-count: infinite;
}

@keyframes fall {
  0% {
    transform: translateX(0) translateY(0) rotate(0deg);
  }
  30% {
    transform: translateX(-10vw) translateY(30vh) rotate(60deg);
  }
  60% {
    transform: translateX(10vw) translateY(60vh) rotate(120deg);
  }
  100% {
    transform: translateX(-5vw) translateY(100vh) rotate(180deg);
  }
}
</style>
