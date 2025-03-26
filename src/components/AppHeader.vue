<script setup lang="ts">
import { useHoverWithMouse } from '@/composables/hover'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const headerRef = ref<HTMLElement | null>(null)
const svgWidth = ref(0)

const { isHover, mouseX } = useHoverWithMouse(headerRef)

const curveWidth = 80 // 곡선이 적용될 좌우 범위
const curveDepth = 20 // 곡선의 깊이 (아래로 움푹 파인 정도)

// header 너비 갱신 (윈도우 리사이즈 대응)
const updateSvgWidth = () => {
  if (headerRef.value) {
    svgWidth.value = headerRef.value.clientWidth
  }
}

onMounted(() => {
  updateSvgWidth()
  window.addEventListener('resize', updateSvgWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSvgWidth)
})

// SVG 경로 동적 계산
const svgPath = computed(() => {
  const width = svgWidth.value
  if (width === 0) return ''

  // hover 상태가 아닐 때는 border 모양 유지
  if (!isHover.value) {
    return `M0,0 L${width},0`
  }

  // 마우스 위치를 중심으로 곡선 범위 결정
  const left = Math.max(0, mouseX.value - curveWidth)
  const right = Math.min(width, mouseX.value + curveWidth)

  // 왼쪽부터 직선 → quadratic 커브 (제어점: (mouseX, curveDepth)) → 오른쪽 직선으로 그리기
  return `M0,0 L${left},0 Q${mouseX.value},${curveDepth} ${right},0 L${width},0`
})
</script>

<template>
  <header ref="headerRef" class="header">
    <div class="header-bg">
      <div class="header-items">
        <!-- 헤더 요소 위치 -->
      </div>
    </div>
    <!-- SVG 오버레이: viewBox를 설정하여 y 좌표 0~curveDepth 영역이 보임 -->
    <svg
      v-if="svgWidth"
      :width="svgWidth"
      :height="curveDepth"
      :viewBox="`0 0 ${svgWidth} ${curveDepth}`"
      class="header-svg"
    >
      <path :d="svgPath" stroke="var(--border-color)" fill="transparent" stroke-width="1" />
    </svg>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 10;
}

.header-bg {
  width: 100%;
  height: 100%;
  background: transparent;
  backdrop-filter: blur(5px);
}

.header-items {
  display: flex;
  align-items: center;
}

.header-svg {
  position: absolute;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
</style>
