<template>
  <div class="cascader">
    <div class="cascader-rel">
      <input type="hidden" :value="value">
      <div class="input-wrapper">
        <input autocomplete="off" placeholder="请选择" readonly="readonly" class="cascader-input" type="text">
      </div>
      <Icon type="ios-arrow-down" class="cascader-arrow"/>
    </div>
    <div class="select-dropdown">
      <div class="selected">
        <span class="selected-item item" v-for="(item, index) in selectedData" @click="selectedChangeData(index+1)" :key="item.value">{{item.label}}</span>
      </div>
      <div class="select">
        <span class="select-item item" v-for="item in dataPool" @click="selectChangeData(item)" :key="item.value">{{item.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cascader',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    testData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      value: [],
      cache: {},
      selectedData: [],
      dataPool: [],
      progress: 0 // city district street
    }
  },
  methods: {
    selectChangeData (data) {
      /* this.value.push(data.value) */
      let len = 0
      len = this.selectedData.length
      if (this.progress === len) {
        this.selectedData.splice(len, 1, data)
      } else {
        this.selectedData.push(data)
      }
      len = this.selectedData.length
      if (data.children && data.children.length) {
        let list = data.children
        let emptyList = []
        for (let i = 0, len = list.length; i < len; i++) {
          emptyList.push(list[i])
        }
        this.dataPool = emptyList
        this.progress = len
        console.log('progress', this.progress)
        this.cache[len] = {}
        this.cache[len][data.value] = emptyList
      } else {
        return false
      }
      console.log(this.cache)
    },
    selectedChangeData (index) {
      let len = this.selectedData.length
      this.progress = index + 1
      if (len - 1 === index) {
        return false
      }
      this.selectedData = this.selectedData.slice(0, index + 1)
      let list = this.cache[index]
      let emptyList = []
      for (let i = 0, len = list.length; i < len; i++) {
        emptyList.push(list[i])
      }
      this.dataPool = emptyList
    }
  },
  watch: {
    data: {
      handler (value) {
        console.log(value)
      },
      deep: true
    },
    testData: {
      handler (value) {
      },
      deep: true
    }
  },
  created () {
    let list = this.data
    let emptyList = []
    for (let i = 0, len = list.length; i < len; i++) {
      emptyList.push(list[i])
    }
    this.dataPool = emptyList
    this.cache['1'] = emptyList
  }
}
</script>

<style lang="scss" scoped>
.cascader {
  position: relative;
  width: 200px;
  .cascader-rel {
    position: relative;
    .input-wrapper {
      .cascader-input {
        padding: 3px 25px 3px 10px;
        border-radius: 3px;
        width: 100%;
        outline: none;
        border: 1px solid #CACACA;
        line-height: 24px;
        /* border-bottom: 0;
        border-bottom-right-radius: 0; */
      }
    }
    .cascader-arrow {
      position: absolute;
      top: 50%;
      right: 8px;
      line-height: 1;
      margin-top: -7px;
      font-size: 14px;
      color: #808695;
      transition: all .2s ease-in-out;
    }
  }
  .select-dropdown {
    padding-top: 10px;
    padding-bottom: 10px;
    top: 30px;
    // z-index: -1;
    position: absolute;
    border: 1px solid red;
    width: 350px;
    border: 1px solid #CACACA;
    background-color: white;
    border-radius: 3px;
    border-top-left-radius: 0;
    .selected {
      height: 30px;
      .selected-item {
        border: 1px solid #CFCFCF;
      }
    }
    .select {
      .select-item {
        border: 1px solid transparent;
        border-radius: 9px;
      }
      .select-item:hover {
        border: 1px solid #0B8CEF;
      }
    }
    .item {
      display: inline-block;
      padding: 0 10px;
      margin: 0 10px;
      margin-top: 10px;
      cursor: pointer;
    }
  }
}
</style>
