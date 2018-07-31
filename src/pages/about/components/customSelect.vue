<template>
  <div :class="open?'custom-select':'custom-select open'" @click.stop="open = !open">
    <div class="select-selection">
      <input type="hidden" value="value">
      <div>
        <span class="select-selected-value">{{ value }}</span>
        <i class="icon">V</i>
      </div>
    </div>
    <ul class="select-dropdown">
      <li @click="itemValue('item01')">
        <div>
          <span style="display: inline-block; width: 16px; line-height: 16px;bakcground: green;font-size: 10px;">预</span>
        </div>
      </li>
      <li @click="itemValue('item02')">item02</li>
      <li @click="itemValue('item03')">item03</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: { default: ''}
  },
  data () {
    return {
      open: false,
      selected: ''
    }
  },
  methods: {
    itemValue (val) {
      this.selected = val
    }
  },
  watch: {
    selected (val) {
      this.value = val
      this.$emit('input', val)
    }
  },
  mounted () {
    const that = this
    document.onclick = function(e) {
      e = e || window.event
      that.open = false
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
        right: 8px;
        top: 7px;
        transition: all .5s; 
      }
    }
    .select-dropdown {
      text-align: center;
      position: absolute;
      width: 200px;
      border: 1px solid green;
    }
  }
  .custom-select.open {
    .select-dropdown { display: none; }
    .icon { transform:rotate(180deg); }
  }
</style>

