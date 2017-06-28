<template>
  <div>
    <div id="main1" style="width: 600px;height:400px;"></div>
    <div id="main2" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted: function () {
    this.load1()
    this.load2()
  },
  methods: {
    load1: function () {
      var xmlhttp
      var dataObject
      xmlhttp = new XMLHttpRequest()
      function c (a) {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          dataObject = JSON.parse(xmlhttp.responseText)
          var rawData = dataObject
          var myChart = echarts.init(document.getElementById('main1'))
          var dates = rawData.map(function (item) {
            return item[0]
          })
          var data = rawData.map(function (item) {
            return [+item[1], +item[2], +item[4], +item[3]]
          })
          var option = {
            backgroundColor: '#21202D',
            legend: {
              data: ['日K'],
              inactiveColor: '#777',
              textStyle: {
                color: '#fff'
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                  color: '#376df4',
                  width: 2,
                  opacity: 1
                }
              }
            },
            xAxis: {
              type: 'category',
              data: dates,
              axisLine: { lineStyle: { color: '#8392A5' } }
            },
            yAxis: {
              scale: true,
              axisLine: { lineStyle: { color: '#8392A5' } },
              splitLine: { show: false }
            },
            grid: {
              bottom: 80
            },
            dataZoom: [{
              textStyle: {
                color: '#8392A5'
              },
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              dataBackground: {
                areaStyle: {
                  color: '#8392A5'
                },
                lineStyle: {
                  opacity: 0.8,
                  color: '#8392A5'
                }
              },
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }, {
              type: 'inside'
            }],
            animation: false,
            series: [
              {
                type: 'candlestick',
                name: '日K',
                data: data,
                itemStyle: {
                  normal: {
                    color: '#FD1050',
                    color0: '#0CF49B',
                    borderColor: '#FD1050',
                    borderColor0: '#0CF49B'
                  }
                }
              }
            ]
          }
          myChart.setOption(option)
        }
      }
      var _this = this
      xmlhttp.onreadystatechange = function () { c(_this) }
      xmlhttp.open('GET', 'http://127.0.0.1:1000/k?code=' + this.$route.params.code, true)
      xmlhttp.send()
    },
    load2: function () {
      var myChart = echarts.init(document.getElementById('main2'))
      this.data = []
      var myDate = new Date()
      var xmlhttp
      xmlhttp = new XMLHttpRequest()
      function c (_this) {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          _this.data = JSON.parse(xmlhttp.responseText)
        }
      }
      var _this = this
      xmlhttp.onreadystatechange = function () { c(_this) }
      xmlhttp.open('GET', 'http://127.0.0.1:1000/allprice?code=' + this.$route.params.code, true)
      xmlhttp.send()
      var option = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0]
            var date = new Date(params.name)
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          min: myDate.toLocaleDateString() + ' 9:30:00',
          max: myDate.toLocaleDateString() + ' 15:00:00',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          scale: true,
          boundaryGap: [0.01, 0.01],
          splitLine: {
            show: false
          }
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.data
        }]
      }
      function si (_this) {
        var xmlhttp
        var d
        xmlhttp = new XMLHttpRequest()
        function c (data) {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            d = JSON.parse(xmlhttp.responseText)
            data.push(d)
            myChart.setOption(
              {
                series: [{
                  data: data
                }]
              })
          }
        }
        xmlhttp.onreadystatechange = function () { c(_this.data) }
        xmlhttp.open('GET', 'http://127.0.0.1:1000/price?code=' + _this.$route.params.code, true)
        xmlhttp.send()
      }
      setInterval(si, 1000, this)
      myChart.setOption(option)
    }
  }
}

</script>
