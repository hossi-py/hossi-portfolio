import { ref, watch, type Ref } from 'vue'

/**
 * Depth 애니메이션 적용 시 곡선과 직선의 부드러운 전환
 * @param targetDepth
 * @param duration
 * @returns
 */
export function useAnimatedDepth(targetDepth: Ref<number>, duration = 200) {
  // 애니메이션이 적용된 깊이 값
  const animatedDepth = ref(0)

  // 현재 실행 중인 애니메이션 frameId ID (중복 실행 방지)
  let frameId: number | null = null

  // 애니메이션 시작 시간 (requestAnimationFrame의 timestamp와 비교하기 위함)
  let startTime: number | null = null

  // 애니메이션 시작 시점의 깊이 값
  let startValue = 0

  const animate = (timestamp: number) => {
    if (startTime === null) startTime = timestamp

    const elapsed = timestamp - startTime // 경과 시간
    const progress = Math.min(elapsed / duration, 1) // 진행도 게산 (1을 넘지 않음)
    animatedDepth.value = startValue + (targetDepth.value - startValue) * progress

    if (progress < 1) {
      frameId = requestAnimationFrame(animate)
    } else {
      frameId = null
      startTime = null
    }
  }

  /** targetDepth 변동할 때마다 애니메이션 제어 */
  watch(
    targetDepth,
    (newVal) => {
      if (frameId) cancelAnimationFrame(frameId)
      startValue = animatedDepth.value
      startTime = null
      frameId = requestAnimationFrame(animate)
    },
    { immediate: true },
  )

  return animatedDepth
}
