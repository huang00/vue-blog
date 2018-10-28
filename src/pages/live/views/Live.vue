<template>
  <div class="live">
    <app-header :currLocation="'live'"></app-header>
    <main>
      <app-calendar></app-calendar>
      <div class="colorPicker">
        <input type="color" v-model="color" style="display: none;" ref="colorPicker">
        <div @click="selectColor" class="showColor" :style="{backgroundColor: color, height: '100%'}"></div>
      </div>
      <hr style="margin: 20px 0;">
      <div style="padding-left: 100px;">
        <app-cascader :test-data="testData"></app-cascader>
      </div>
    </main>
    <app-footer></app-footer>

  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'
import AppCascader from '../components/app-cascader'
import AppCalendar from '../components/app-calendar'

export default {
  name: 'live',
  components: {
    AppHeader,
    AppFooter,
    AppCascader,
    AppCalendar
  },
  data () {
    return {
      color: '#ccc',
      cascaderData: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [
          {
            value: 'nanjing',
            label: '南京',
            children: [
              {
                value: 'fuzimiao',
                label: '夫子庙'
              }
            ]
          },
          {
            value: 'suzhou',
            label: '苏州',
            children: [
              {
                value: 'zhuozhengyuan',
                label: '拙政园'
              },
              {
                value: 'shizilin',
                label: '狮子林'
              }
            ]
          }
        ]
      }],
      testData: {}
    }
  },
  methods: {
    selectColor () {
      let colorPicker = this.$refs.colorPicker
      colorPicker.click()
      console.log('color, ', this.color)
    }
  },
  created () {
    setTimeout(() => {
      this.testData = {
        '2': [{name: 'xiaohuang', age: 34}],
        '3': [{name: 'xiaofang', age: 23}]
      }
    }, 3000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.live {
  main {
    height: 500px;
    .colorPicker {
      height: 40px;
      width: 100px;
      border-radius: 10px;
    }
  }
}
</style>
