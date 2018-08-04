<template>
  <div class="live">
    <app-header :currLocation="'live'"></app-header>
    <main>
      <div class="roomAmount">
        <div class="calendar">
          <div class="head">
            <ul class="clearfix">
              <li class="grid row0 column0 title">2018-7-16</li>
              <li class="grid row0 column1">
                <p class="date">7-16 <span class="mark today">今天</span></p>
                <p class="week">周{{'三'}}</p>
                <p class="week">剩{{'4'}}间</p>
              </li>
              <li class="grid row0 column2">
                <p class="date">7-17 </p>
                <p class="week">周{{'四'}}</p>
                <p class="week">剩{{'4'}}间</p>
              </li>
              <li class="grid row0 column3">
                <p class="date">7-18 </p>
                <p class="week">周{{'五'}}</p>
                <p class="week">剩{{'4'}}间</p>
              </li>
              <li class="grid row0 column4">
                <p class="date">7-19 <span class="mark festival">中秋</span></p>
                <p class="week">周{{'六'}}</p>
                <p class="week">剩{{'4'}}间</p>
              </li>
            </ul>
          </div>
          <div class="body">
            <ul class="clearfix">
              <li class="grid row1 column0 title">{{ '大床房' }}</li>
              <li class="grid row1 column1 haltSales">
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
              <li class="grid row1 column4 haltSales">
                <span class="num">{{ 5 }}</span>
                <span class="stop">停止销售</span>
              </li>
            </ul>
            <ul class="clearfix">
              <li class="grid row2 column0 title">{{ '大床房' }}</li>
              <li class="grid row2 column1">
                <span class="num">{{ 5 }}</span>
                <span class="stop">停止销售</span>
              </li>
              <li class="grid row2 column2 haltSales">
                <span class="num">{{ 30 }}</span>
                <span class="stop">停止销售</span>
              </li>
              <li class="grid row2 column3">
                <span class="num">{{ 2 }}</span>
                <span class="stop">停止销售</span>
              </li>
              <li class="grid row2 column4 remainNot">
                <span class="num">{{ 0 }}</span>
                <span class="stop">停止销售</span>
              </li>
            </ul>
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
    return { }
  },
  methods: { }
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
            }
            p { line-height: 19px; }
            .mark.today { background-color: #F51C1C; }
            .mark.festival { background-color: #0366B2; }
          }
          .grid:not(.column0) { cursor: pointer; padding-top: 5px; }
        }
        .body {
          .grid {
            .stop { display: none; }
          }
          .grid.haltSales {
            .stop { display: block; }
            .num { display: none; }
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
