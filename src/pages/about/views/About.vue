<template>
  <div class="about">
    <app-header :currLocation="'about'"></app-header>
    <h1>{{ msg }}</h1>
    <template>
      <Select v-model="model9" style="width:200px" class="product-select">
          <Option value="New York" label="New York">
            <div class="item-li">
              <span class="room-status">预</span>
              <span style="margin-left: 10px;">大床房&lt;含早&gt;</span>
            </div>
          </Option>
          <Option value="London" label="London">
              <div class="item-li">
                <span class="room-status">预</span>
                <span style="float:right;color:#ccc">America</span>
              </div>
          </Option>
          <Option value="Sydney" label="Sydney">
              <div class="item-li">
                <span class="room-status">预</span>
                <span style="float:right;color:#ccc">America</span>
              </div>
          </Option>
      </Select>
    </template>
    <br style="margin: 20px 0;">
    <custom-select style="margin-left: 50px;" :data="dataList" v-model="value"></custom-select>
    <custom-select style="margin-left: 50px;" :data="dataList" v-model="value"></custom-select>
    <custom-select style="margin-left: 50px;" :data="dataList" v-model="value"></custom-select>
    <br style="margin: 20px 0;">
    <div style="border: 1px solid red;" v-html="itemHTML()">
      <!-- <div class="group" v-for="(item, index) in list" :key="index">
        <div class="item">
          <span></span>
        </div>
      </div> -->
      <!-- <div class="group">
        <div class="item">
          <span></span>
        </div>
      </div>
      <div class="group">
        <div class="item">
          <span></span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import customSelect from '../components/customSelect'

export default {
  name: 'about',
  components: {
    AppHeader,
    customSelect
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
      list: [
        {name: 'sdsfsf'},
        {name: 'sdsfsf'},
        {name: 'sdsfsf'},
        {name: 'sdsfsf'},
        {name: 'sdsfsf'},
        {name: 'sdsfsf'},
        {name: 'sdsfsf'},
        {name: 'sdsfsf'},
        {name: 'sdsfsf'},
        {name: 'sdsfsf'},
        {name: 'sdsfsf'}
      ]
    }
  },
  methods: {
    itemHTML () {
      let html = '',
          integer = 0,
          list = this.list;
      let len = 12, n = 0,
          col = /^\d+$/.test(len / 5) ? len / 5 + 1 : Math.ceil(len / 5);
      
      for (let i = 0; i < len; i++) {
        integer = i % 5
        n = Math.ceil((i + 1) / 5)
        if (!integer && n !== col) {
          html += '<div class="group">'
        } else if (!integer && n === col) {
          html += '<div class="group col">'
        }
        html += '<div class="item"><span></span></div>'
        if (integer === 4 || integer === len - 1) {
          html += '</div>'
        }
      }
      return html

    }
  },
  watch: {
    value (val) {
      console.log('value = ', val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .about {
    .product-select {
      .ivu-select-selection {
        border-radius: 0;
      }
      .ivu-select-dropdown {
        border-radius: 0;
        background: red !important;
        .ivu-select-dropdown-list {
          .ivu-select-item {
            // border-bottom: 1px solid #E6E6E6;
            padding-bottom: 0;
            padding-top: 0;
            .item-li {
              border-bottom: 1px solid #E6E6E6;
              padding: 8px 0;
            }
          }
          .ivu-select-item:last-child { .item-li { border: 0; } }
        }
        .room-status {
          display: inline-block;
          width: 16px;
          line-height: 16px;
          background-color: green;
          color: white;
          text-align: center;
          font-size: 10px;
        }
      }
      
    }
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
  }
</style>
