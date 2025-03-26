<script setup lang="ts">
import { useAnimatedDepth } from '@/composables/animatedDepth'
import { useDarkMode } from '@/composables/darkMode'
import { useHoverWithMouse } from '@/composables/hover'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import CustomIcon from './icons/CustomIcon.vue'
import IconThemeToggle from './icons/IconThemeToggle.vue'

const curveWidth = 80 // 곡선이 적용될 좌우 범위
const curveDepth = 20 // 곡선의 깊이 (아래로 움푹 파인 정도)

const headerRef = ref<HTMLElement | null>(null)
const svgWidth = ref(0)

const targetDepth = computed(() => (isHover.value ? 20 : 0))

const { isDark, toggleDarkMode } = useDarkMode()
const { isHover, mouseX, mouseY } = useHoverWithMouse(headerRef)
const animatedDepth = useAnimatedDepth(targetDepth, 250)

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

  const left = Math.max(0, mouseX.value - curveWidth)
  const right = Math.min(width, mouseX.value + curveWidth)

  return `M0,0 L${left},0 Q${mouseX.value},${animatedDepth.value} ${right},0 L${width},0`
})

const svgPathFilter = computed(() => (isHover.value && isDark.value ? 'url(#border-glow)' : 'none'))

const glowColor = computed(() => {
  const x = mouseX.value
  const y = mouseY.value

  const hue = x % 360 // 0 ~ 360도 색상
  const lightness = 60 + (y % 20) // 약간 부드러운 밝기

  return `hsl(${hue}, 100%, ${lightness}%)`
})
</script>

<template>
  <header ref="headerRef" class="header">
    <div class="header-bg">
      <nav class="header-items">
        <div class="header-logo">
          <span class="logo-text">MyApp</span>
        </div>

        <ul class="header-nav">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        <div class="header-actions">
          <CustomIcon @click="toggleDarkMode" active>
            <IconThemeToggle :size="18" :is-dark="isDark" />
          </CustomIcon>
        </div>
      </nav>
    </div>

    <!-- SVG 오버레이: viewBox를 설정하여 y 좌표 0~curveDepth 영역이 보임 -->
    <svg
      v-if="svgWidth"
      :width="svgWidth"
      :height="curveDepth"
      :viewBox="`0 0 ${svgWidth} ${curveDepth}`"
      class="header-svg"
    >
      <defs>
        <!-- 필터 적용 범위 넓게 -->
        <filter id="border-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feFlood :flood-color="glowColor" result="flood" />
          <feComposite in="flood" in2="SourceAlpha" operator="in" result="glowColor" />
          <feGaussianBlur in="glowColor" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        :d="svgPath"
        stroke="var(--border-color)"
        fill="transparent"
        stroke-width="1"
        :filter="svgPathFilter"
      />
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
  padding-bottom: 20px; /** curveDepth 값만큼 아래로 밀어줌 => header-items가 가운데 오도록 */
}

.header-bg {
  width: 100%;
  background: transparent;
  backdrop-filter: blur(5px);
}

.header-items {
  display: flex;
  justify-content: space-between; /* 좌-중앙-우 배치 */
  align-items: center;
  height: var(--header-height);
  padding: 0 16px;
  position: relative;
  z-index: 1;
}

/* 로고 */
.header-logo .logo-text {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--text-color);
  letter-spacing: 0.5px;
  cursor: pointer;
}

/* 가운데 메뉴 */
.header-nav {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.header-nav li {
  cursor: pointer;
  font-size: 0.95rem;
  color: var(--text-color);
  transition: color 0.2s ease;
}

.header-nav li:hover {
  color: var(--accent-color);
}

/* 아이콘 영역 */
.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-svg {
  position: absolute;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
</style>
