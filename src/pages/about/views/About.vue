<template>
  <div class="about">
    <app-header :currLocation="'about'"></app-header>
    <!-- <h1 @click="show = !show">{{ msg }}</h1> -->
    <br style="margin: 20px 0;">
    <div style="display: flex;">
      <custom-select style="margin-left: 50px;" :data="dataList" v-model="value"></custom-select>
      <custom-select style="margin-left: 50px;" :data="dataList" v-model="value"></custom-select>
      <custom-select style="margin-left: 50px;" :data="dataList" v-model="value"></custom-select>
    </div>
    <hr style="margin: 20px 0;">
    <Loading :show="show" :end="end"></Loading>
    <!-- <div class="scrollView">
      <div class="scrollGroup" ref="scrollGroup">
        <ul ref="scrollContent">
          <li>正在从携程获取信息...</li>
          <li>正在从去哪儿获取信息...</li>
          <li>正在从艺龙获取信息...</li>
        </ul>
      </div>
    </div> -->
    <hr style="margin: 20px 0;">
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import customSelect from '../components/customSelect'
import Loading from '../components/Loading'

export default {
  name: 'about',
  components: {
    AppHeader,
    customSelect,
    Loading
  },
  data () {
    return {
      dataList: [
        {id: '1', label: '大床房<含早>', status: 1},
        {id: '2', label: '大床房<不含早>', status: 2},
        {id: '3', label: '大床房<含晚>', status: 1}
      ],
      msg: 'Welcome to about',
      model9: 'London',
      value: '3',
      show: true,
      end: false
    }
  },
  methods: {
    scroll () {
      let scrollGroup = this.$refs.scrollGroup
      let scrollContent = this.$refs.scrollContent
      let scrollContentClone = scrollContent.cloneNode(true)
      scrollGroup.appendChild(scrollContentClone)
      let height = scrollContent.offsetHeight
      let top = 0
      setInterval(() => {
        if (Math.abs(scrollGroup.style.top.slice(0, -2)) >= height) {
          scrollGroup.style.top = 0
          top = 0
        } else {
          scrollGroup.style.top = top + 'px'
          top -= 2
        }
      }, 100)
      // startScroll()
      // function startScroll() {
      //   window.requestAnimationFrame(startScroll)
      //   if (Math.abs(scrollGroup.style.top.slice(0, -2)) >= height) {
      //     scrollGroup.style.top = 0
      //     top = 0
      //   } else {
      //     scrollGroup.style.top = top + 'px'
      //     top -= 1
      //   }
      // }
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.scroll()
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .about {
    .group {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .item {
        color: red;
        span {
          display: inline-block;
          width: 150px;
          height: 30px;
          background-color: #E6E6E6;
        }
      }
    }
    .group.col {
      justify-content: flex-start;
      .item { width: 20%; }
    }
    .scrollView {
      position: relative;
      width: 200px;
      margin: 0 auto;
      height: 40px;
      overflow: hidden;
      .scrollGroup {
        position: absolute;
        top: 0;
        color: #000000;
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
</style>
