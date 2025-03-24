export type CustomButtonProps = {
  icon?: string // (예시: 'search')
  type?: 'primary' | 'secondary' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  loadingSize?: number
  minWidth?: number
  disabled?: boolean
}
