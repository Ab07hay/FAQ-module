import { useToast } from 'vue-toastification'

const toast = useToast()

export function showSuccessToast(message: string) {
  toast.success(message, { timeout: 2000 })
}
