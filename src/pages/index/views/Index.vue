<template>
  <div class="index">
    <app-header :currLocation="'index'"></app-header>
    <div class="banner"></div>
    <main>
      <template>
        <Table ref="tableEmpty" id="tableEmpty" :columns="columns1" :data="data1" no-data-text="暂时无数据"></Table>
      </template>
      <DatePicker type="date" ref="datePicker" @on-open-change="open" placeholder="Select date" :options="options" style="width: 200px"></DatePicker>
      <hr style="margin: 20px 0;">
      <app-modal v-model="modal1"
        :title="'我是title'"
        :width="600" @on-ok="ok" @on-cancel="cancel" @on-visible-change="change">
      </app-modal>
      <button @click="modal1 = !modal1">modal1</button>
      <button @click="sendRequest">sendRequest</button>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'
import AppModal from '@/components/AppModal'
import axios from 'axios'

export default {
  name: 'index',
  components: {
    AppHeader,
    AppFooter,
    AppModal
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
              template: '<Select v-model="model1" @on-change="handlerChange" style="width:100px">' +
                        '<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>' +
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
                handlerChange (value) {
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
      data1: [],
      options: {
        disabledDate (data) {},
        shortcuts: [{
          text: '记住',
          value (data) {
            return new Date('2018-07-29')
          }
          // onClick () {
          //   console.log('click')
          // }
        }]
      },
      modal1: false
    }
  },
  methods: {
    parentHandlerChange (value) {
      console.log('value, ', value)
    },
    open (boo) {
      console.log(this.$refs.datePicker)
    },
    emptyTable () {
      this.$nextTick(() => {
        let table = document.getElementById('tableEmpty')
        let tableDody = table.getElementsByClassName('ivu-table-tip')[0]
        tableDody.innerHTML = `<div class="empty"></div>`
      })
    },
    ok () {
      console.log('你点击了确认')
    },
    cancel () {
      console.log('你点击了取消')
    },
    change (val) {
      console.log(val)
    },
    sendRequest () {
      axios.get('/users').then(res => {
        if (res.data.code === '000000') {
          console.log('success, ', res.data.content)
        }
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
