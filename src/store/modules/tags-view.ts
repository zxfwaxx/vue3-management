import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { type RouteLocationNormalized } from "vue-router"
import { type RouteLocation } from "vue-router"

export type ITagView = Partial<RouteLocation>

export const useTagsViewStore = defineStore("tag-view", () => {
    const visitedViews = ref<ITagView[]>([])
    const cachedViews = ref<string[]>([])

    const addTagView = (view: ITagView) => {
        const isExist = visitedViews.value.some(item => {
            return item.path === view.path
        })
        if (isExist) {
            return
        }
        visitedViews.value.push(Object.assign({}, view))
    }
    return {
        addTagView,
        visitedViews
    }
})