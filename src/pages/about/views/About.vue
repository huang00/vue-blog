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
    <custom-select style="margin-left: 50px;"></custom-select>
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
      msg: 'Welcome to about',
      model9: 'London',
      value: 'item3'
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
<style scoped lang="scss">
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
  }
</style>
