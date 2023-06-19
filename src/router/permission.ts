import router from "@/router"
import { getToken } from "@/utils/cookie"
import { useUserStoreHook } from "@/store/modules/user"
import { usePermissionStoreHook } from "@/store/modules/permission"
import asyncRouteSettings from "@/config/async-route"
import { whiteList } from "@/config/white-list"


router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStoreHook()
    const usePermissionStore = usePermissionStoreHook()
    if (getToken()) {
        if (to.path === "/login") {
            // 如果已经登录，并准备进入 Login 页面，则重定向到主页
            next({ path: "/" })
        } else {
            if (userStore.roles.length === 0) {
                if (asyncRouteSettings.open) {
                    // const roles = userStore.roles
                    const roles = ['admin']
                    userStore.roles = ['admin']
                    usePermissionStore.setRoutes(roles)
                }
                // 将'有访问权限的动态路由' 添加到 Router 中
                usePermissionStore.dynamicRoutes.forEach((route) => {
                    router.addRoute(route)
                })
                // 确保添加路由已完成
                // 设置 replace: true, 导航将不会留下历史记录
                next({ ...to, replace: true })
            } else {
                // 此步骤必须，不然跳转不到应该去的页面
                next()
            }
        }
    } else {
        // 如果没有 Token
        if (whiteList.indexOf(to.path) !== -1) {
            // 如果在免登录的白名单中，则直接进入
            next()
        } else {
            // 其他没有访问权限的页面将被重定向到登录页面
            next("/login")
        }
    }
})