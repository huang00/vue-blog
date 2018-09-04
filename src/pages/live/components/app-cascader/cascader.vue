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
        <span class="selected-item item">四川省</span>
        <span class="selected-item item">成都市</span>
        <span class="selected-item item">青羊区</span>
      </div>
      <div class="select">
        <span class="select-item item">四川省</span>
        <span class="select-item item">北京市</span>
        <span class="select-item item">福建省</span>
        <span class="select-item item">江苏省</span>
        <span class="select-item item">黑龙江省</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
      dataList: [],
      data: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [
          {
            value: 'nanjing',
            label: '南京',
            children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                }
            ]
          },
          {
            value: 'suzhou',
            label: '苏州',
            children: [
              {
                value: 'zhuozhengyuan',
                label: '拙政园',
              },
              {
                value: 'shizilin',
                label: '狮子林',
              }
            ]
          }
        ]
      }]
    }
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
