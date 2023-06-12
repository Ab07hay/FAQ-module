import { faqItem } from "@/constants/faqItem"
import type { FaqData } from "@/interfaces/faqPayload"
//below function is use to get the data from local storage
export function getLocalStorageData() {
    const getFaqItemData:any = localStorage.getItem(faqItem) ? localStorage.getItem(faqItem) : ''
    return JSON.parse(getFaqItemData)
}
//below function is use to set the data in local storage

export function setLocalStorageData(item:FaqData[]) {
    localStorage.setItem(faqItem, JSON.stringify(item))
    
}