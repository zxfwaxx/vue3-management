<template>
  <div class="login">
    <div class="login-form">
      <el-col :span="24" class="login-col">
        <el-card shadow="hover"> V3 admin-management </el-card>
      </el-col>
      <el-form
        ref="ruleFormRef"
        :model="loginForm"
        :rules="rules"
        :size="formSize"
        status-icon
      >
        <el-form-item prop="username">
          <el-input
            v-model.trim="loginForm.username"
            placeholder="用户名"
            type="text"
            tabindex="1"
            size="large"
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <i-ep-user />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="loginForm.password"
            placeholder="密码"
            type="password"
            tabindex="2"
            size="large"
            show-password
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <i-ep-lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            size="large"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { type LoginRequestData } from "@/api/login/types/login";
import { useRouter } from "vue-router";
import { setToken } from "@/utils/cookie";

const router = useRouter();

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const loginForm: LoginRequestData = reactive({
  username: "admin",
  password: "",
});
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 5, message: "长度在3到5位之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 5, message: "长度在3到5位之间", trigger: "blur" },
  ],
});
let loading = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      setTimeout((): void => {
        loading.value = false;
        setToken("z-token");
        router.push({ path: "/" });
      }, 1000);
    } else {
      loading.value = false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    width: 480px;
    padding: 20px 50px 50px 50px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;

    .login-col {
      margin-bottom: 20px;
      text-align: center;
      font-weight: bolder;
    }

    .el-button {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
