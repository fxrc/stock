<template>
<div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="股票代码">
      <el-input v-model="formInline.code" placeholder="股票代码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="Data"
    height="500"
    style="width: 100%">
    <el-table-column
      prop="code"
      label="股票代码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="price"
      label="最新价格">
    </el-table-column>
    <el-table-column
      label="查看">
      <template scope="scope">
        <router-link :to="scope.row.code">查看</router-link>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
  <el-pagination
    @current-change="handleCurrentChange"
    layout="prev, pager, next"
    :total="300">
  </el-pagination>
  </div>
</div>
</template>

<script>
  export default {
    mounted: function () {
      this.load(1)
    },
    methods: {
      load: function (pageNum) {
        var xmlhttp
        var dataObject
        xmlhttp = new XMLHttpRequest()
        function c (a) {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            dataObject = JSON.parse(xmlhttp.responseText)
            var i = (pageNum - 1) * 10
            var p = i
            for (var j = 0; i < p + 10; i++, j++) {
              a.$set(a.Data, j, {code: dataObject[i]['code'], name: dataObject[i]['name'], price: dataObject[i]['price']})
            }
          }
        }
        var _this = this
        for (var i = 0; i < 10; i++) {
          this.Data.pop()
        }
        for (var j = 0; j < 10; j++) {
          this.Data.push()
        }
        xmlhttp.onreadystatechange = function () { c(_this) }
        xmlhttp.open('GET', 'http://127.0.0.1:1000/showzixuan', true)
        xmlhttp.send()
      },
      handleCurrentChange: function (val) {
        this.currentPage = val
        this.load(this.currentPage)
      },
      onSubmit () {
        console.log('submit!')
      }
    },
    data () {
      return {
        Data: [],
        currentPage: 1,
        formInline: {
          code: ''
        }
      }
    }
  }
</script>
