<template>
<div style="width:150px">
  <el-form id="form1" method="post" ref="form" :model="form">
    <el-form-item label="用户名">
      <el-input name="username" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" name="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
</el-form>
</div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit () {
        var form1 = document.getElementById('form1')
        form1.action = '/login'
        form1.submit()
      }
    }
  }
</script>
