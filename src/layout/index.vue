<template>
  <div class="app-wrapper" :class="classObj">
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <TopHead />
      <TagsView v-show="showTagsView" />
      <router-view> </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sidebar } from "./components";
import { computed } from "vue";
import TopHead from "./components/TopHead/index.vue";
import TagsView from "./components/TagsView/index.vue";
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
const showTagsView = computed(() => {
  return true;
});

const classObj = computed(() => {
  return {
    "hide-sidebar": !appStore.sideFlag,
  };
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.sidebar-container {
  transition: width 0.28s;
  width: var(--v3-sidebar-width) !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: var(--v3-sidebar-width);
  position: relative;
}

.hide-sidebar {
  .main-container {
    margin-left: var(--v3-sidebar-hide-width);
  }
  .sidebar-container {
    width: var(--v3-sidebar-hide-width) !important;
  }
}
</style>
