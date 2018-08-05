<template>
  <div class="live">
    <app-header :currLocation="'live'"></app-header>
    <main>
      <div class="roomAmount">
        <div class="calendar">
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
              <!-- <li class="grid row0 column0 title">2018-7-16</li>
              <li class="grid row0 column1">
                <p class="date">7-16 <span class="mark today">今天</span></p>
                <p class="week">周{{'三'}}</p>
                <p class="week">剩{{'4'}}间</p>
              </li>
              <li class="grid row0 column4">
                <p class="date">7-19 <span class="mark festival">中秋</span></p>
                <p class="week">周{{'六'}}</p>
                <p class="week">剩{{'4'}}间</p>
              </li> -->
            </ul>
          </div>
          <div class="body">
            <ul class="clearfix" v-for="(item, index) in data.roomTypeList" :key="index">
              <li class="grid row1 column0 title" :class="['grid', 'column0', 'title', 'row' + (index+1)]">{{ item.name }}</li>
              <li @click="singleOperation(subItem, item.id)" :class="['grid', 'row' + (index+1), 'column' + (key+1), subItem.remainRoom?'':'remainNot']" v-for="(subItem, key) in item.roomAmount" :key="key">
                <span class="num" v-if="subItem.status === 0">{{ subItem.remainRoom }}</span>
                <span class="stop" v-if="subItem.status === 1">停售</span>
              </li>
            </ul>
            <!-- <ul class="clearfix">
              <li class="grid row1 column0 title">{{ '大床房' }}</li>
              <li class="grid row1 column1">
                <span class="num">{{ 5 }}</span>
                <span class="stop">停止销售</span>
              </li>
              <li class="grid row1 column2">
                <span class="num">{{ 30 }}</span>
                <span class="stop">停止销售</span>
              </li>
              <li class="grid row1 column3">
                <span class="num">{{ 2 }}</span>
                <span class="stop">停止销售</span>
              </li>
              <li class="grid row1 column4">
                <span class="num">{{ 5 }}</span>
                <span class="stop">停止销售</span>
              </li>
            </ul> -->
          </div>
        </div>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'

export default {
  name: 'live',
  components: {
    AppHeader,
    AppFooter
  },
  data () {
    return {
      today: new Date(),
      festivalList: [
        { date: '1533830400000', name: '中秋' },
        { date: '1533571200000', name: '国庆' }
      ],
      data: {
        dateList: [
          { date: 1533398400000, remainRoom: 5 },
          { date: 1533484800000, remainRoom: 6 },
          { date: 1533571200000, remainRoom: 10 },
          { date: 1533744000000, remainRoom: 7 },
          { date: 1533830400000, remainRoom: 5 }
        ],
        roomTypeList: [
          { name: '大床房', id: 1, roomAmount: [
            { date: 1533398400000, remainRoom: 5, status: 0 },
            { date: 1533484800000, remainRoom: 3, status: 1 },
            { date: 1533571200000, remainRoom: 6, status: 1 },
            { date: 1533744000000, remainRoom: 10, status: 1 },
            { date: 1533830400000, remainRoom: 20, status: 0 }
          ]},
          { name: '标准房', id: 2, roomAmount: [
            { date: 1533398400000, remainRoom: 5, status: 0 },
            { date: 1533484800000, remainRoom: 0, status: 0 },
            { date: 1533571200000, remainRoom: 6, status: 0 },
            { date: 1533744000000, remainRoom: 0, status: 0 },
            { date: 1533830400000, remainRoom: 20, status: 0 }
          ]}
        ]
      }
    }
  },
  methods: {
    batchOperation (item) {
      /* 批量操作 */
      console.log('item', item)
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.live {
  main {
    height: 500px;
    .roomAmount {
      width: 1035px;
      margin: 0 auto;
      border-left: 1px solid #E4E4E4;
      border-top: 1px solid #E4E4E4;
      height: 300px;
      .calendar {
        .head {
          .grid {
            background-color: #EFEFEF;
            height: 65px;
            line-height: 65px;
            .mark {
              display: inline-block;
              width:32px;
              height:16px;
              border-radius:8px;
              font-size: 10px;
              line-height: 16px;
              text-align: center;
              margin-left: 5px;
              color: white;
            }
            p { line-height: 19px; }
            .mark.today { background-color: #F51C1C; }
            .mark.festival { background-color: #0366B2; }
          }
          .grid:not(.column0) { cursor: pointer; padding-top: 5px; }
        }
        .body {
          .grid {
            .stop {
              display: block;
              background-color: #0B8CEF;
              width:73px;
              height:54px;
              font-size: 14px;
              color: #FFFFFF;
            }
          }
        }
        .grid {
          width: 74px;
          height: 55px;
          line-height: 55px;
          text-align: center;
          border-right: 1px solid #E4E4E4;
          border-bottom: 1px solid #E4E4E4;
          cursor: pointer;
        }
        .grid.title { width: 133px; cursor: default; }
        .grid.remainNot { background-color: #F6F6F6; }
        .grid:hover:not(.title):not(.row0) { background-color: #F6F6F6; }
      }
      .clearfix {
        li { float: left; }
      }
    }
  }
}
</style>
