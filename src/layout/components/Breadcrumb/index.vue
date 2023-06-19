<template>
  <div class="bread-crumb">
    <div @click="toggleClick" style="margin: 0 15px">
      <el-icon :size="20" class="icon">
        <i-ep-Fold v-if="props.isActive" />
        <i-ep-Expand v-else />
      </el-icon>
    </div>

    <div class="bread-crumb-item">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item, index) in routerList"
          :key="item.path"
        >
          <span v-if="index === routerList.length - 1">
            {{ item.meta.title }}
          </span>
          <a v-else>
            {{ item.meta.title }}
          </a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { type RouteLocationMatched, useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: "toggle-click", id: number): void;
}>();

const routerList = ref<RouteLocationMatched[]>([]);

const getBreadcrumb = () => {
  routerList.value = route.matched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false;
  });
};
watch(
  () => route.path,
  (path) => {
    if (path.startsWith("/redirect/")) {
      return;
    }
    getBreadcrumb();
  }
);

getBreadcrumb();

function toggleClick(): void {
  emit("toggle-click", 2);
}

</script>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}

.bread-crumb-item {
  float: left;
  // 响应式设计 width = 576  隐藏
  @media screen and (max-width: 576px) {
    display: none;
  }
}

</style>
