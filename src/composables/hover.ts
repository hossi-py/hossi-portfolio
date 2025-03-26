import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * ref로 지정한 DOM 요소 위에 마우스 커서 hover 여부 판단 및 X 좌표 계산
 * @param targetRef
 */
export function useHoverWithMouse(targetRef: Ref<HTMLElement | null>) {
  const isHover = ref(false)
  const mouseX = ref(0)
  const mouseY = ref(0)

  const handleMouseEnter = () => (isHover.value = true)
  const handleMouseLeave = () => (isHover.value = false)

  // 헤더 내부에서 마우스 X, Y 좌표 계산 (header에 대한 상대 좌표)
  const handleMouseMove = (e: MouseEvent) => {
    if (targetRef.value) {
      const rect = targetRef.value.getBoundingClientRect()
      mouseX.value = e.clientX - rect.left
      mouseY.value = e.clientY - rect.top
    }
  }

  onMounted(() => {
    if (targetRef.value) {
      targetRef.value.addEventListener('mouseenter', handleMouseEnter)
      targetRef.value.addEventListener('mouseleave', handleMouseLeave)
      targetRef.value.addEventListener('mousemove', handleMouseMove)
    }
  })

  onUnmounted(() => {
    if (targetRef.value) {
      targetRef.value.removeEventListener('mouseenter', handleMouseEnter)
      targetRef.value.removeEventListener('mouseleave', handleMouseLeave)
      targetRef.value.removeEventListener('mousemove', handleMouseMove)
    }
  })

  return { isHover, mouseX, mouseY }
}
