import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * ref로 지정한 DOM 요소 위에 마우스 커서가 올라와 있는지를 감지
 * @param targetRef
 */
export function useHover(targetRef: Ref<HTMLElement | null>) {
  const isHover = ref(false)

  const handleMouseEnter = () => {
    isHover.value = true
  }

  const handleMouseLeave = () => {
    isHover.value = false
  }

  onMounted(() => {
    if (targetRef.value) {
      targetRef.value.addEventListener('mouseenter', handleMouseEnter)
      targetRef.value.addEventListener('mouseleave', handleMouseLeave)
    }
  })

  onUnmounted(() => {
    if (targetRef.value) {
      targetRef.value.removeEventListener('mouseenter', handleMouseEnter)
      targetRef.value.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  return { isHover }
}
