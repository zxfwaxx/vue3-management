<template>
  <div :class="{ 'has-logo': showSidebarLogo }">
    <SidebarLogo  :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="v3SidebarMenuBgColor"
        :text-color="v3SidebarMenuTextColor"
        :active-text-color="v3SidebarMenuActiveTextColor"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- :router="true"
           暂未开启路由模式，采用自定义组件进行跳转
      -->
        <SidebarItemVue
          v-for="route in permissionStore.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SidebarLogo from "./SidebarLogo.vue";
import SidebarItemVue from "./SidebarItem.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { getCssVariableValue } from "@/utils";
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
const v3SidebarMenuBgColor = getCssVariableValue("--v3-sidebar-menu-bg-color");
const v3SidebarMenuTextColor = getCssVariableValue(
  "--v3-sidebar-menu-text-color"
);
const v3SidebarMenuActiveTextColor = getCssVariableValue(
  "--v3-sidebar-menu-active-text-color"
);
const route = useRoute();
const isCollapse = computed(() => {
  return !appStore.sideFlag
})
const showSidebarLogo = ref(true);

const permissionStore = usePermissionStoreHook();

const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta?.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

.el-scrollbar {
  height: 100%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item) {
  height: var(--v3-sidebar-menu-item-height);
  line-height: var(--v3-sidebar-menu-item-height);
  &.is-active,
  &:hover {
    background-color: var(--v3-sidebar-menu-hover-bg-color);
  }
  display: block;
  * {
    vertical-align: middle;
  }
}

.el-menu--collapse {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        color: var(--v3-sidebar-menu-active-text-color) !important;
        // @include tip-line;
      }
    }
  }
}
</style>
