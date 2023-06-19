<template>
  <div class="side-head-logo" :class="{ collapse: props.collapse }">
    <transition name="sidebar-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <div style="display: flex">
          <div class="logo">V3</div>
        </div>
      </router-link>
      <router-link v-else key="expand" to="/">
        <div class="text ">Z-Admin</div>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  collapse: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.side-head-logo {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: var(--v3-sidebarlogo-bg-color);
  text-align: center;
  overflow: hidden;

  .sidebar-logo {
    display: none;
  }

  .sidebar-logo-text {
    height: 100%;
    vertical-align: middle;
  }

  .logo {
    margin: 15px 0 0 10px;
    box-sizing: border-box;
    width: 54px;
    height: 54px;
    font-size: 30px;
    line-height: 54px;
    text-align: center;
    border-radius: 50%;
    background-color: rgb(130, 143, 244);
  }

  .text {
    flex: 1;
    color: rgb(192, 239, 255);
    font-size: 25px;
  }
}

.collapse {
  .logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
    font-size: 20px;
    line-height: 32px;
  }

  .text {
    display: none;
  }
}
</style>
