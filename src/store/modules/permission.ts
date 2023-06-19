
import { defineStore } from "pinia"
import { type RouteRecordRaw } from 'vue-router'
import { ref } from "vue"
import asyncRouteSettings from "@/config/async-route"
import { baseRouter, asyncRoutes } from "@/router"
import store from "@/store"

function filterAsyncRouter(routes: RouteRecordRaw[], roles: string[]) {
  const getRoutes: RouteRecordRaw[] = []
  routes.forEach(route => {
    let r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRouter(r.children, roles)
      }
      getRoutes.push(r)
    }
  })
  return getRoutes
}

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => {
      if (route.meta?.roles != undefined) {
        return route.meta.roles.includes(role)
      } else {
        return false
      }
    })
  } else {
    return true
  }
}

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])
  let setRoutes = (roles: string[]) => {
    let accessedRoutes
    if (asyncRouteSettings.open) {
      accessedRoutes = filterAsyncRouter(asyncRoutes, roles)
    } else {
      accessedRoutes = baseRouter
    }
    routes.value = baseRouter.concat(accessedRoutes)
    dynamicRoutes.value = accessedRoutes
  }
  return { routes, dynamicRoutes, setRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
