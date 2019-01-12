<template>
  <div class="index">
    <app-header :currLocation="'index'"></app-header>
    <div
      style="
        height: 500px;
        border: 1px solid red;
      "
    >
      <div style="position: relative; border: 1px solid blue; width: 300px; margin-left: 200px;">
        <tabs-nav
          :list="list"
        >
        </tabs-nav>
      </div>
    </div>
    <div class="banner"></div>
    <main>
      <template>
        <Table ref="tableEmpty" id="tableEmpty" :columns="columns1" :data="data1" no-data-text="暂时无数据"></Table>
      </template>
      <DatePicker type="date" ref="datePicker" @on-open-change="open" placeholder="Select date" :options="options" style="width: 200px"></DatePicker>
      <hr style="margin: 20px 0;">
      <app-modal v-model="modal1" itle="我是title" :width="'600px'" @on-ok="ok" @on-cancel="cancel" @on-visible-change="change">
        <span @click="modal2 = true">点击我弹出里面的弹框</span>
      </app-modal>
      <app-modal v-model="modal2" :width="'200px'">
        <h1>哈哈 我是第二个弹窗</h1>
      </app-modal>
      <button @click="modal1 = true">modal1</button>
      <button @click="sendRequest">sendRequest</button>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "@/components/Header";
import AppFooter from "@/components/Footer";
import AppModal from "@/components/app-modal";
import axios from "axios";
import TabsNav from '../components/TabsNav'

export default {
  name: "index",
  components: {
    AppHeader,
    AppFooter,
    AppModal,
    TabsNav
  },
  data() {
    const vm = this;
    return {
      value: [20, 50],
      columns1: [
        {
          title: "Name",
          key: "name",
          renderHeader(h) {
            return h({
              template:
                '<Select v-model="model1" @on-change="handlerChange" style="width:100px">' +
                '<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>' +
                "</Select>",
              data() {
                return {
                  cityList: [
                    {
                      value: "New York",
                      label: "New York"
                    },
                    {
                      value: "London",
                      label: "London"
                    }
                  ],
                  model1: ""
                };
              },
              methods: {
                handlerChange(value) {
                  vm.parentHandlerChange(value);
                }
              }
            });
          }
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data1: [],
      options: {
        disabledDate(data) {},
        shortcuts: [
          {
            text: "记住",
            value(data) {
              return new Date("2018-07-29");
            }
            // onClick () {
            //   console.log('click')
            // }
          }
        ]
      },
      modal1: false,
      modal2: false,
      list: ['1', '2', '3', '4', '5', '6']
    };
  },
  methods: {
    parentHandlerChange(value) {
      console.log("value, ", value);
    },
    open(boo) {
      console.log(this.$refs.datePicker);
    },
    emptyTable() {
      this.$nextTick(() => {
        let table = document.getElementById("tableEmpty");
        let tableDody = table.getElementsByClassName("ivu-table-tip")[0];
        tableDody.innerHTML = `<div class="empty"></div>`;
      });
    },
    ok() {
      console.log("你点击了确认");
    },
    cancel() {
      console.log("你点击了取消");
    },
    change(val) {
      console.log(val);
    },
    sendRequest() {
      axios.get("/users").then(res => {
        if (res.data.code === "000000") {
          console.log("success, ", res.data.content);
        }
      });
    }
  },
  mounted() {
    this.emptyTable();
  }
};
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
