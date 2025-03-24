<script setup lang="ts">
const { active } = defineProps<{ active?: boolean }>()
</script>

<template>
  <button type="button" class="icon-button" :class="{ active: active }">
    <!-- 무지개 CSS 적용을 위한 태그 -->
    <span class="icon-button-active" v-if="active"></span>
    <span class="icon">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
  margin: 0;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  position: relative;
  background-color: transparent;
  border: 1.5px solid var(--border-color);
  border-radius: 6px;
  /* border 색이 변할 경우 적용 */
  transition: border-color 0.2s;
}

.icon-button:hover {
  border-color: var(--hover-border-color);
}

.icon-button.active,
.icon-button.active:hover {
  border-color: transparent;
}

/* 무지개 테두리 회전 애니메이션 */
.icon-button-active {
  position: absolute;
  inset: 0;
  border-radius: 6px;
  border: 2px solid transparent;
  background-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red);
  background-origin: border-box;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  to {
    --angle: 360deg;
  }
}

/* CSS Houdini 기능 중 하나로, CSS 사용자 정의 속성(--angle)을 등록하는 역할 */
@property --angle {
  /* <angle>을 지정하여 이 속성이 각도 값만 받을 수 있음을 명시 */
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

/* 아이콘 영역 (가운데 빈 공간) */
.icon {
  position: absolute;
  inset: 1px;
  border-radius: 6px;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
