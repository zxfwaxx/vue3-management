<template>
  <div class="head-top">
    <Breadcrumb
      class="head-icon"
      :is-active="sidebar"
      @toggle-click="toggleSidebar"
    />
    <div class="login-out">
      <el-dropdown class="right-menu-item">
        <div>
          <el-icon :size="30"><i-ep-UserFilled /></el-icon>
          <span
            style="
              display: inline-block;
              margin-left: 10px;
              vertical-align: 9px;
              font-size: 16px;
            "
            >zxf</span
          >
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "../Breadcrumb/index.vue";
import { useAppStore } from "@/store/modules/app";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user"

const userStore = useUserStore()
const router = useRouter();
const appStore = useAppStore();

const toggleSidebar = (id: number) => {
  appStore.toggleSidebar();
};

const sidebar = computed(() => {
  return appStore.sideFlag;
});

function logout(): void {
  userStore.logout()
  router.push("/login");
}
</script>

<style lang="scss" scoped>
.head-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  background: #fff;
  .head-icon {
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
  }

  .login-out {
    margin: 0 20px;
  }
}
</style>
