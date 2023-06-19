<template>
  <div class="side-item">
    <div
      class="side-item-content first-level"
      v-if="!props.item.meta?.hidden"
      :class="{ 'simple-mode': props.isCollapse }"
    >
      <template
        v-if="
          !alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild?.children
        "
      >
        <SidebarItemLink
          v-if="theOnlyOneChild.meta"
          :to="resolvePath(theOnlyOneChild.path)"
        >
          <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
            <el-icon><i-ep-Setting /></el-icon>
            <template v-if="theOnlyOneChild.meta.title" #title>
              {{ theOnlyOneChild.meta.title }}
            </template>
          </el-menu-item>
        </SidebarItemLink>
      </template>
      <el-sub-menu v-else :index="resolvePath(props.item.path)" teleported>
        <template #title>
          <el-icon><i-ep-Setting /></el-icon>
          <span v-if="props.item.meta && props.item.meta.title">{{
            props.item.meta.title
          }}</span>
        </template>
        <template v-if="props.item.children">
          <sidebar-item
            v-for="child in props.item.children"
            :key="child.path"
            :item="child"
            :is-collapse="props.isCollapse"
            :is-first-level="false"
            :base-path="resolvePath(child.path)"
          />
        </template>
      </el-sub-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, computed } from "vue";
import { type RouteRecordRaw } from "vue-router";
import { isExternal } from "@/utils/validate";
import SidebarItemLink from "./SidebarItemLink.vue";
import path from "path-browserify";

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
  isCollapse: {
    type: Boolean,
    default: false,
  },
  isFirstLevel: {
    type: Boolean,
    default: true,
  },
  basePath: {
    type: String,
    default: "",
  },
});

const alwaysShowRootMenu = computed(() => {
  return props.item.meta && props.item.meta.alwaysShow;
});

const showingChildNumber = computed(() => {
  console.log(props.item, "props.item");
  if (props.item.children) {
    const getChildrenNum = props.item.children.filter(
      // 此操作过滤出有children的路由，并且不隐藏的路由菜单
      (item) => !(item.meta && item.meta.hidden)
    );
    return getChildrenNum.length;
  }
  return 0;
});

// 此操作过滤仅有一个子路由的路由
const theOnlyOneChild = computed(() => {
  // 超过一个就返回空
  if (showingChildNumber.value > 1) {
    return null;
  }
  // 如果有1个的 就进行判断
  if (props.item.children) {
    for (const child of props.item.children) {
      // 就是很明显过滤出 拥有一个子路由的那个子路由
      if (!child.meta || !child.meta.hidden) {
        return child;
      }
    }
  }

  // 都不符合就返回自己
  return { ...props.item, path: "" };
});

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>

<style lang="scss" scoped>
.el-icon {
  width: 1em;
  margin-right: 12px;
  font-size: 18px;
}
.simple-mode {
  &.first-level {
    :deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        display: none;
      }
      span {
        visibility: hidden;
      }
    }
  }
}
</style>
