import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { usePermissionStore } from "./permission"
import { type RouteRecordRaw } from "vue-router"
import { getToken,removeToken } from "@/utils/cookie"
import { type LoginRequestData } from "@/api/login/types/login"
import  { resetRouter } from "@/router"

export const useUserStore = defineStore("user", () => {
    const token = ref<string>(getToken() || "")
    const roles = ref<string[]>([])
    const username = ref<string>("")
    const permissionStore = usePermissionStore()

    /** 设置角色数组 */
    const setRoles = (value: string[]) => {
        roles.value = value
    }

    /** 登录 */
    const login = (loginData: LoginRequestData) => {


    }

    /** 登出 */
    const logout = () => {
        removeToken()
        token.value = ""
        roles.value = []
        resetRouter()
    }
    return { token, roles, username, setRoles, login ,logout}
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
    return useUserStore(store)
}
