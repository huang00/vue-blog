<template>
  <div class="index">
    <app-header :currLocation="'index'"></app-header>
    <div class="banner"></div>
    <main>
      <template>
        <Table :columns="columns1" :data="data1"></Table>
      </template>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'

export default {
  name: 'index',
  components: {
    AppHeader,
    AppFooter
  },
  data () {
    const vm = this
    return {
      value: [20, 50],
      columns1: [
        {
          title: 'Name',
          key: 'name',
          renderHeader (h) {
            return h({
              template: '<Select v-model="model1" @on-change="handlerChange" style="width:100px">'+
                        '<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>'+
                        '</Select>',
              data () {
                return {
                  cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    }
                  ],
                  model1: ''
                }
              },
              methods: {
                handlerChange(value) {
                  vm.parentHandlerChange(value)
                }
              }
            })
          }
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  methods: {
    parentHandlerChange(value) {
      console.log('value, ', value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.index {
  .banner {
    height: 265px;
    background: url("../assets/img/banner_top.jpg") no-repeat;
    background-size: 120% 100%;
    background-position: -153px;
  }
  main {
    height: 500px;
  }
}
</style>
