<script setup lang="ts">
import type { CustomButtonProps } from '@/types/components/custom-button.type'
import { computed } from 'vue'

const {
  label = '',
  iconOnly = false,
  size = 24,
  rounded = false,
  loading = false,
  disabled = false,
} = defineProps<CustomButtonProps>()

const sizeMap = {
  small: 24,
  medium: 36,
  large: 48,
}

const buttonSize = computed(() => {
  if (typeof size === 'number') return size
  return sizeMap[size] || sizeMap.medium
})

const buttonStyle = computed(() =>
  // icon만 존재했을 때
  iconOnly
    ? {
        padding: 0,
        width: buttonSize.value + 'px',
        height: buttonSize.value + 'px',
        borderRadius: rounded ? '50%' : '20%',
      }
    : {
        fontSize: size + 'px',
      },
)

/** loading 혹은 disabled 넘겨줬을 때 버튼 클릭 방지 */
const isDisabled = computed(() => loading || disabled)
</script>

<template>
  <button
    :class="['custom-button', { loading, disabled: isDisabled, 'icon-only': iconOnly }]"
    :style="buttonStyle"
    :disabled="isDisabled"
  >
    <template v-if="loading">
      <span class="button-spinner"></span>
    </template>

    <template v-else>
      <!-- slot이 있을 땐 label 무시 -->
      <slot v-if="$slots.default" />
      <template v-else>{{ label }}</template>
    </template>
  </button>
</template>

<style scoped>
/* 기본적인 버튼 스타일 */
.custom-button {
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  color: var(--text-color);
  transition: opacity 0.3s;
}

/** 아이콘만 사용 */
.custom-button.icon-only {
  background: transparent;
}

/** 비활성화 상태 */
.custom-button.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.custom-button.small {
  font-size: 12px;
}

.custom-button.medium {
  font-size: 14px;
}

.custom-button.large {
  font-size: 16px;
}

/* 로딩 상태 시 스피너 스타일 */
.button-spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
