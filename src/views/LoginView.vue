<template>
  <div class="login-box">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
      <h2>后台管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="loginBtn" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button class="loginBtn" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { LoginData } from "@/type/login";
import { defineComponent, reactive, toRefs, ref } from "vue";
import { FormInstance } from "element-plus";
import { login } from "@/request/api"
import { useRouter } from "vue-router";

export default defineComponent({
  name:"LoginView",
  setup() {
    const data = reactive(new LoginData());

    const rules = {
      username: [
        {
          required: true, //是否必须字段
          message: "请输入用户名", // 触发的提示信息
          trigger: "blur", // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 3, // 最小字符书
          max: 5, // 最大字符数
          message: "用户名长度需要在3-5个字符之间", // 触发的提示信息
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true, //是否必须字段
          message: "请输入密码", // 触发的提示信息
          trigger: "blur", // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 3, // 最小字符书
          max: 6, // 最大字符数
          message: "密码长度需要在3-6个字符之间", // 触发的提示信息
          trigger: "blur",
        },
      ],
    }

    // 登录
    const ruleFormRef = ref<FormInstance>()
      const router = useRouter()  //-->$router
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      // 对表单的内容进行验证
      // valid布尔类型，为true表示验证成功，反之验证错误
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then((res) => {
            // console.log(res)
            // 1、将token保存
            localStorage.setItem("token", res.data.token)
            // 2、跳转页面
            router.push('/')
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    // 重置
    const resetForm = () => {
      data.ruleForm.username = ""
      data.ruleForm.password = ""
    }

    return {
      ruleFormRef,
      resetForm,
      submitForm,
      ...toRefs(data),
      rules
    };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  widows: 100%;
  height: 100vh;
  background: url("../assets/bg.jpg");

  .demo-ruleForm {
    padding: 50px;
    width: 400px;
    margin: 0 auto;
    background-color: white;
    position: relative;
    top: 200px;
    border-radius: 20px;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .loginBtn {
    width: 48%;
  }
}
</style>
