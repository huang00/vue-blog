<template>
  <div class="calendar" ref="calendar">
    <div class="head">
      <ul class="clearfix">
        <li class="grid row0 column0 title">{{ dateFormat(today) }}</li>
        <li @click="batchOperation(item)" :class="['grid', 'row0', 'column' + (index+1)]" v-for="(item, index) in data.dateList" :key="index">
          <p class="date">{{ dateFormat(item.date, '-', true) }}
            <span v-if="isEqual(item.date, today) || getFestival(item.date)" :class="['mark', isEqual(item.date, today)?'today':'festival']" >{{ isEqual(item.date, today)?'今天':getFestival(item.date) }}</span>
          </p>
          <p class="week">周{{ getWeek(item.date) }}</p>
          <p class="week">剩{{ item.remainRoom }}间</p>
        </li>
      </ul>
    </div>
    <div class="body">
      <ul class="clearfix" v-for="(item, index) in data.roomTypeList" :key="index">
        <li :class="['grid', 'column0', 'title', 'row' + (index+1)]">{{ item.name }}</li>
        <li @click="singleOperation(subItem, item.id)" :class="['grid', 'row' + (index+1), 'column' + (key+1), subItem.remainRoom?'':'remainNot']" v-for="(subItem, key) in item.roomAmount" :key="key">
          <span class="num" v-if="subItem.status === 0">{{ subItem.remainRoom }}</span>
          <span class="stop" v-if="subItem.status === 1">停售</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  data () {
    return {
      today: new Date(),
      festivalList: [
        { date: '1533830400000', name: '中秋' },
        { date: '1533571200000', name: '国庆' }
      ],
      data: {
        dateList: [],
        roomTypeList: [
          {
            name: '大床房',
            id: 1,
            roomAmount: [
              { date: +new Date(), remainRoom: 5, status: 0 },
              { date: +new Date() + 24 * 3600000, remainRoom: 3, status: 1 },
              { date: +new Date() + 24 * 3600000 * 2, remainRoom: 6, status: 1 },
              { date: +new Date() + 24 * 3600000 * 3, remainRoom: 10, status: 1 },
              { date: +new Date() + 24 * 3600000 * 4, remainRoom: 20, status: 0 },
              { date: +new Date() + 24 * 3600000 * 5, remainRoom: 20, status: 0 },
              { date: +new Date() + 24 * 3600000 * 6, remainRoom: 0, status: 0 },
              { date: +new Date() + 24 * 3600000 * 7, remainRoom: 20, status: 1 },
              { date: +new Date() + 24 * 3600000 * 8, remainRoom: 20, status: 0 },
              { date: +new Date() + 24 * 3600000 * 9, remainRoom: 10, status: 0 },
              { date: +new Date() + 24 * 3600000 * 10, remainRoom: 20, status: 0 },
              { date: +new Date() + 24 * 3600000 * 11, remainRoom: 20, status: 0 },
              { date: +new Date() + 24 * 3600000 * 12, remainRoom: 0, status: 0 },
              { date: +new Date() + 24 * 3600000 * 13, remainRoom: 20, status: 0 }
            ]
          },
          {
            name: '标准房',
            id: 2,
            roomAmount: [
              { date: +new Date(), remainRoom: 5, status: 0 },
              { date: +new Date() + 24 * 3600000, remainRoom: 0, status: 0 },
              { date: +new Date() + 24 * 3600000 * 2, remainRoom: 6, status: 0 },
              { date: +new Date() + 24 * 3600000 * 3, remainRoom: 0, status: 0 },
              { date: +new Date() + 24 * 3600000 * 4, remainRoom: 20, status: 0 },
              { date: +new Date() + 24 * 3600000 * 5, remainRoom: 20, status: 0 },
              { date: +new Date() + 24 * 3600000 * 6, remainRoom: 0, status: 0 },
              { date: +new Date() + 24 * 3600000 * 7, remainRoom: 20, status: 0 },
              { date: +new Date() + 24 * 3600000 * 8, remainRoom: 80, status: 0 },
              { date: +new Date() + 24 * 3600000 * 9, remainRoom: 20, status: 1 },
              { date: +new Date() + 24 * 3600000 * 10, remainRoom: 0, status: 0 },
              { date: +new Date() + 24 * 3600000 * 11, remainRoom: 10, status: 0 },
              { date: +new Date() + 24 * 3600000 * 12, remainRoom: 0, status: 0 },
              { date: +new Date() + 24 * 3600000 * 13, remainRoom: 40, status: 0 }
            ]
          },
          {
            name: '双人房',
            id: 3,
            roomAmount: [
              { date: +new Date(), remainRoom: 5, status: 0 },
              { date: +new Date() + 24 * 3600000, remainRoom: 0, status: 0 },
              { date: +new Date() + 24 * 3600000 * 2, remainRoom: 6, status: 0 },
              { date: +new Date() + 24 * 3600000 * 3, remainRoom: 0, status: 0 },
              { date: +new Date() + 24 * 3600000 * 4, remainRoom: 20, status: 0 },
              { date: +new Date() + 24 * 3600000 * 5, remainRoom: 20, status: 0 },
              { date: +new Date() + 24 * 3600000 * 6, remainRoom: 0, status: 0 },
              { date: +new Date() + 24 * 3600000 * 7, remainRoom: 20, status: 0 },
              { date: +new Date() + 24 * 3600000 * 8, remainRoom: 80, status: 0 },
              { date: +new Date() + 24 * 3600000 * 9, remainRoom: 20, status: 1 },
              { date: +new Date() + 24 * 3600000 * 10, remainRoom: 0, status: 0 },
              { date: +new Date() + 24 * 3600000 * 11, remainRoom: 10, status: 0 },
              { date: +new Date() + 24 * 3600000 * 12, remainRoom: 0, status: 0 },
              { date: +new Date() + 24 * 3600000 * 13, remainRoom: 40, status: 0 }
            ]
          }
        ]
      }
    }
  },
  methods: {
    batchOperation (item) {
      /* 批量操作 */
      let list = this.data.roomTypeList
      let operationList = []
      for (let i = 0, len = list.length; i < len; i++) {
        let subList = list[i].roomAmount
        for (let j = 0, l = subList.length; j < l; j++) {
          if (this.dateFormat(item.date) === this.dateFormat(subList[j].date)) {
            operationList.push(subList[j])
          }
        }
      }
      let all = operationList.every((item) => {
        return item.status === 1
      })
      if (all) {
        operationList.map((item) => {
          item.status = 0
        })
      } else {
        operationList.map((item) => {
          item.status = 1
        })
      }
    },
    singleOperation (item, id) {
      /* 单个操作 */
      item.status = item.status === 0 ? 1 : 0
    },
    getWeek (date) {
      date = parseFloat(date) ? parseFloat(date) : date
      let upperCaseList = ['日', '一', '二', '三', '四', '五', '六']
      if (date) {
        date = new Date(date)
        let week = upperCaseList[date.getDay()]
        return week
      }
    },
    getFestival (date) {
      /* 获取节日名称 */
      let list = this.festivalList
      date = this.dateFormat(date)
      for (let i = 0, len = list.length; i < len; i++) {
        if (date === this.dateFormat(list[i].date)) {
          return list[i].name
        }
      }
      return null
    },
    dateFormat (date, symbol, year) {
      /* 格式化时间 */
      date = parseFloat(date) ? parseFloat(date) : date
      if (date) {
        symbol = symbol || '-'
        date = new Date(date)
        if (year) {
          return `${date.getMonth() + 1}${symbol}${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
        }
        return `${date.getFullYear()}${symbol}${date.getMonth() + 1}${symbol}${date.getDate()}`
      }
    },
    isEqual (date01, date02) {
      /* 判断两个时间是否相等 */
      date01 = this.dateFormat(date01)
      date02 = this.dateFormat(date02)
      return date01 === date02
    },
    selectColor () {
      let colorPicker = this.$refs.colorPicker
      colorPicker.click()
      console.log('color, ', this.color)
    },
    getData () {
      let datelist = []
      datelist.push({ date: +new Date(), remainRoom: 5 })
      for (let i = 1; i < 14; i++) {
        let len = 24 * 3600000 * i
        datelist.push({
          date: +new Date() + len, remainRoom: 5
        })
      }
      this.data.dateList = datelist
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    let calendar = this.$refs.calendar
    this.$nextTick(() => {
      /* let grids = calendar.getElementsByClassName('grid')
      for (let i = 0, len = grids.length; i < len; i++) {
        console.log(grids[i])
        grids[i].addEventListener('mouseover', function() {
          console.log(this)
        })
      } */
    })
  }
}
</script>

<style lang="scss" scoped>
@import './calendar'
</style>
