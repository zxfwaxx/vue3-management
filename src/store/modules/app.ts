import { defineStore } from "pinia"
import { ref } from 'vue'


export const useAppStore = defineStore('app', () => {
    const sideFlag = ref<boolean>(false)
    const toggleSidebar = () => {
        sideFlag.value = !sideFlag.value
    }
    return { 
        sideFlag,
        toggleSidebar
    }
})