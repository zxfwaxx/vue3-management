
import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router"

/* 基础路由 */

export const baseRouter: RouteRecordRaw[] = [
    {
        path: "/login",
        component: () => import("@/views/login/index.vue"),
        meta: {
            hidden: true
        }
    },
    {
        path: "/",
        component: () => import("@/layout/index.vue"),
        redirect: "/dashboard",
        children: [
            {
                path: "dashboard",
                component: () => import("@/views/dashboard/index.vue"),
                name: "Dashboard",
                meta: {
                    title: "首页",
                    svgIcon: "dashboard",
                    affix: true
                }
            }
        ]
    },

]

export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: "/permission",
        redirect: "/permission/page",
        component: () => import("@/layout/index.vue"),
        name: "Permission",
        meta: {
            title: "权限管理",
            svgIcon: "lock",
            roles: ["admin", "editor"], // 可以在根路由中设置角色
            alwaysShow: true // 将始终显示根菜单
        },
        children: [
            {
                path: "page",
                component: () => import("@/views/permission/page.vue"),
                name: "PagePermission",
                meta: {
                    title: "页面权限",
                    roles: ["admin"] // 在子导航中设置角色
                }
            },
            {
                path: "directive",
                component: () => import("@/views/permission/directive.vue"),
                name: "DirectivePermission",
                meta: {
                    title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
                }
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: baseRouter
})



/** 重置路由 */
export function resetRouter() {
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    try {
        console.log(router.getRoutes(), " router.getRoutes()")
        router.getRoutes().forEach((route) => {
            const { name, meta } = route
            if (name && meta.roles?.length) {
                router.hasRoute(name) && router.removeRoute(name)
            }
        })
    } catch (error) {
        // 强制刷新浏览器
        window.location.reload()
    }
}

export default router