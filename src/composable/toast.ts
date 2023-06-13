import { useToast } from 'vue-toastification'

const toast = useToast()
// below function return the toast success message
export function showSuccessToast(message: string) {
  toast.success(message, { timeout: 2000 })
}
