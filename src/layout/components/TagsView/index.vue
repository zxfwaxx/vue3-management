<template>
  <div class="tags-view-content">
    <div class="tags-view-wrapper">
      <el-icon class="arrow left">
        <i-ep-ArrowLeftBold />
      </el-icon>
      <el-scrollbar ref="scrollbarRef">
        <div ref="scrollbarContentRef" class="scrollbar-content">
          <router-link
            ref="tagRefs"
            v-for="tag in tagsViewStore.visitedViews"
            :key="tag.path"
            :class="isActive(tag) ? 'active' : ''"
            :to="{ path: tag.path, query: tag.query }"
            class="tags-view-item"
          >
            {{ tag.meta?.title }}
            <el-icon v-if="!isAffix(tag)" :size="12">
              <i-ep-Close />
            </el-icon>
          </router-link>
        </div>
      </el-scrollbar>
      <el-icon class="arrow right">
        <i-ep-ArrowRightBold />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import {
  type RouteRecordRaw,
  RouterLink,
  useRoute,
  useRouter,
} from "vue-router";
import { type ITagView, useTagsViewStore } from "@/store/modules/tags-view";
import { usePermissionStore } from "@/store/modules/permission";

import path from "path-browserify";

const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();
const tagsViewStore = useTagsViewStore();

watch(
  route,
  () => {
    addTags();
  },
  {
    deep: true,
  }
);

let affixTags: ITagView[] = [];

const isActive = (tag: ITagView) => {
  return tag.path === route.path;
};

const isAffix = (tag: ITagView) => {
  return tag.meta?.affix;
};
// 初始化时，过滤固定在tags中的路由名称也就是默认值
const filterAffixTags = (routes: RouteRecordRaw[], basePath = "/") => {
  let tags: ITagView[] = [];
  routes.forEach((item) => {
    if (item.meta?.affix) {
      const tagPath = path.resolve(basePath, route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    if (item.children) {
      const childTags = filterAffixTags(item.children, item.path);
      if (childTags.length >= 1) {
        tags = tags.concat(childTags);
      }
    }
  });
  return tags;
};

const initTags = () => {
  affixTags = filterAffixTags(permissionStore.routes);
  console.log(affixTags, "affixTags");
  for (const tag of affixTags) {
    // 必须含有 name 属性
    if (tag.name) {
      tagsViewStore.addTagView(tag);
    }
  }
};

const addTags = () => {
  console.log(route,'route')
  if (route.name) {
    tagsViewStore.addTagView(route);
  }
};
onMounted(() => {
  initTags();
  addTags();
});
</script>

<style lang="scss" scoped>
.tags-view-content {
  height: var(--v3-tagsview-height);
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 #00000010, 0 0 3px 0 #00000010;
  .tags-view-wrapper {
    height: 100%;
    user-select: none;
    display: flex;
    justify-content: space-between;
    .arrow {
      width: 40px;
      height: 100%;
      cursor: pointer;
    }

    .el-scrollbar {
      flex: 1;
      // 横向超出窗口长度时，显示滚动条
      white-space: nowrap;
      .scrollbar-content {
        display: inline-block;
      }
    }

    .roter-links {
      height: 100%;
      line-height: calc(var(--v3-tagsview-height) - 1px);
    }
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid var(--v3-tagsview-tag-border-color);
      border-radius: var(--v3-tagsview-tag-border-radius);
      color: var(--v3-tagsview-tag-text-color);
      background-color: var(--v3-tagsview-tag-bg-color);
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 5px;
      }
      &:last-of-type {
        margin-right: 5px;
      }
      &.active {
        background-color: var(--v3-tagsview-tag-active-bg-color);
        color: var(--v3-tagsview-tag-active-text-color);
        border-color: var(--v3-tagsview-tag-active-border-color);
        &::before {
          content: "";
          background-color: var(--v3-tagsview-tag-active-before-color);
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      .el-icon {
        margin: 0 2px;
        vertical-align: middle;
        border-radius: 50%;
        &:hover {
          background-color: var(--v3-tagsview-tag-icon-hover-bg-color);
          color: var(--v3-tagsview-tag-icon-hover-color);
        }
      }
    }
  }
}
</style>
