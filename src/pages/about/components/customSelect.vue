<template>
  <div :class="open?'custom-select':'custom-select open'" @click="open = true">
    <div class="select-selection">
      <input type="hidden" :value="value">
      <div>
        <span class="select-selected-value">{{ label }}</span>
        <Icon type="chevron-down" class="icon"></Icon>
      </div>
    </div>
    <ul class="select-dropdown">
      <li :class="item.id === selected? 'selected':''" @click="itemValue(item.id)" v-for="(item, index) in data" :key="index">
        <div class="group-item">
          <span v-if="item.status ===  1" class="room-status reserve">预</span>
          <span v-if="item.status ===  2" class="room-status spot">现</span>
          <span style="margin-left: 10px;">{{item.label}}</span>
        </div>
      </li>
    </ul>
    <!-- <ul style="line-height: 30px; text-align: center; ">没有数据</ul> -->
  </div>
</template>

<script>
export default {
  naem: 'custom-select',
  props: {
    value: {default: ''},
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      open: false,
      selected: '',
      label: ''
    }
  },
  methods: {
    itemValue (val) {
      this.selected = val
      this.getLabel(val)
    },
    getLabel (id) {
      let list = this.data
      for (let i = 0, len = list.length; i < len; i++) {
        if (id === list[i].id) {
          this.label = list[i].label
        }
      }
    },
    eventHandler (e) {
      e = e || window.event
      this.open = false
      return false
    }
  },
  watch: {
    selected (val) {
      this.$emit('input', val)
    },
    open (val) {
      let that = this
      if (val) {
        document.addEventListener('click', that.eventHandler)
      } else {
        document.removeEventListener('click', that.eventHandler)
      }
    }
  },
  mounted () {
    this.selected = this.value
    if (this.value) {
      this.getLabel(this.value)
    } else {
      if (this.data.length > 0) {
        this.getLabel(this.data[0].id)
        this.selected = this.data[0].id
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .custom-select {
    width: 200px;
    cursor: pointer;
    .select-selection {
      border: 1px solid #ccc;
      position: relative;
      .select-selected-value {
        display: block;
        line-height: 30px;
        padding: 0 20px 0 10px;
        height: 30px;
      }
      .icon {
        position: absolute;
        right: 5px;
        top: 11px;
        transition: all .5s;
        height: 8px;
      }
    }
    .select-dropdown {
      position: absolute;
      width: 200px;
      border: 1px solid #E2E2E2;
      background-color: white;
      margin-top: 3px;
      z-index: 10;
      li {
        .group-item {
          padding: 7px 0;
          margin: 0 10px;
          border-bottom: 1px solid #E6E6E6;
          .room-status {
            width:16px;
            height:16px;
            font-size: 10px;
            color: white;
            display: inline-block;
            text-align: center;
          }
          .room-status.reserve { background-color: #05C47E; }
          .room-status.spot { background-color: #EBD83C; }
        }
      }
    }
    .select-dropdown li.selected { background-color: pink; }
    .select-dropdown li:last-child .group-item { border: 0; }
    .select-dropdown li:hover { background-color: green; }
  }
  .custom-select.open {
    .select-dropdown { display: none; }
    .icon { transform:rotate(180deg); }
  }
</style>
