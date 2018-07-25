<template>
  <div class="index">
    <app-header :currLocation="'index'"></app-header>
    <div class="banner"></div>
    <main>
      <template>
        <Table ref="tableEmpty" id="tableEmpty" :columns="columns1" :data="data1" no-data-text="暂时无数据"></Table>
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
      data1: []
    }
  },
  methods: {
    parentHandlerChange(value) {
      console.log('value, ', value)
    },
    emptyTable () {
      this.$nextTick(() => {
        let table = document.getElementById('tableEmpty')
        let tableDody = table.getElementsByClassName('ivu-table-tip')[0]
        tableDody.innerHTML = `<div class="empty"></div>`
      })
      
    }
  },
  mounted () {
    this.emptyTable()
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
