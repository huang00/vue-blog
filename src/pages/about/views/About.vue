<template>
  <div class="about">
    <app-header :currLocation="'about'"></app-header>
    <h1 @click="show = !show" style="margin-top: 500px;">{{ msg }}</h1>
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
      <Select v-model="model9" style="width:200px" class="product-select">
          <Option value="New York" label="New York">
            <div class="item-li">
              <span class="room-status">预</span>
              <span style="margin-left: 10px;">大床房&lt;含早&gt;</span>
            </div>
          </Option>
      </Select>
    </template>
    <br style="margin: 20px 0;">
    <custom-select style="margin-left: 50px;" :data="dataList" v-model="value"></custom-select>
    <hr style="margin: 20px 0;">
    <Loading :show="show" :end="end"></Loading>
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
      show: false,
      end: false
    }
  },
  methods: { },
  created () {
    setTimeout(() => {
      console.log('end----about------')
      this.end = false
    }, 5000)
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
        .ivu-select-dropdown-list {
          .ivu-select-item {
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
