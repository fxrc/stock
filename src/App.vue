<template>
  <div id="app">
    <p>
      <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item v-if="seen" index="/login">{{ message }}</el-menu-item>
        <el-submenu v-if="!seen" index="/login">
          <template slot="title">{{ message }}</template>
          <el-menu-item><a href="/logout">注销</a></el-menu-item>
        </el-submenu>
        <el-menu-item index="/register">注册</el-menu-item>
        <el-menu-item index="/show">信息概览</el-menu-item>
        <el-menu-item index="/zixuan">自选股</el-menu-item>
      </el-menu>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1',
        message: '登录',
        seen: true
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    },
    mounted: function () {
      var xmlhttp
      var dataObject
      xmlhttp = new XMLHttpRequest()
      function c (a) {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200 && xmlhttp.responseText) {
          dataObject = JSON.parse(xmlhttp.responseText)
          a.message = dataObject
        }
        if (a.message === '登录') {
          a.seen = true
        } else {
          a.seen = false
        }
      }
      var _this = this
      xmlhttp.onreadystatechange = function () { c(_this) }
      xmlhttp.open('GET', 'http://127.0.0.1:1000/username', true)
      xmlhttp.send()
    }
  }
</script>

<style>

</style>
