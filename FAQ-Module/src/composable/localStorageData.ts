import { faqItem } from "@/constants/faqItem"
import type { FaqData } from "@/interfaces/faqPayload"

export function getLocalStorageData() {
    const getFaqItemData:any = localStorage.getItem(faqItem) ? localStorage.getItem(faqItem) : ''
    return JSON.parse(getFaqItemData)
}