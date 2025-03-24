<script setup lang="ts">
import type { CustomButtonProps } from '@/types/components/custom-button.type'

const {
  icon = '',
  type = 'primary',
  size = 'sm',
  loading = false,
  loadingSize = 16,
  minWidth = 80,
  disabled = false,
} = defineProps<CustomButtonProps>()
</script>

<template>
  <button
    :class="['custom-button', type, size]"
    :style="{
      minWidth: `${minWidth}px`, // 버튼 최소 너비 설정
    }"
    :disabled="loading || disabled"
  >
    <!-- 로딩 중이면 스피너 표시 -->
    <span
      v-if="loading"
      class="loader"
      :style="{
        width: `${loadingSize}px`,
        height: `${loadingSize}px`,
      }"
    ></span>

    <!-- 아이콘이 있을 때 렌더링 (로딩 중 아닐 때만) -->
    <i v-if="icon && !loading" :class="['icon', `icon-${icon}`]"></i>

    <!-- 슬롯이 있을 때만 렌더링 (로딩 중 아닐 때만) -->
    <span v-if="$slots.default && !loading">
      <slot />
    </span>
  </button>
</template>

<style scoped>
/* 기본 버튼 스타일 */
.custom-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
}

/* 버튼 타입 */
.custom-button.primary {
  background: #007bff;
  color: white;
}
.custom-button.secondary {
  background: #6c757d;
  color: white;
}
.custom-button.danger {
  background: #dc3545;
  color: white;
}
.custom-button.success {
  background: #28a745;
  color: white;
}

/* 버튼 크기 */
.custom-button.sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}
.custom-button.lg {
  padding: 1rem 1.5rem;
  font-size: 1.125rem;
}

/* 버튼 로딩 중 스타일 */
.custom-button:disabled {
  opacity: 0.6;
  cursor: default;
}

/* 로딩 스피너 */
.loader {
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 스피너 회전 애니메이션 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
