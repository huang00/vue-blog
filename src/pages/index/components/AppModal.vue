<template>
  <div class="modal-backdrop" v-if="visible">
    <input type="text" :value="value" style="display: none;">
    <div class="modal" :style="{height: height+'px', width: width+'px'}">
      <div class="modal-header" v-if="showHeader">
        <slot name="header">
          {{ title }}
        </slot>
        <span @click="close" class="close">X</span>
      </div>
      <div class="modal-body">
        <slot name="body">
          <h1>body</h1>
        </slot>
      </div>
      <div class="modal-footer" v-if="showFooter">
        <slot name="footer">
          <button @click="confirm">confirm</button>
          <button @click="cancel">cancel</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppMoadl',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'title'
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    close () {
      this.visible = false
    },
    confirm () {
      this.$emit('on-ok')
    },
    cancel () {
      this.$emit('on-cancel')
      this.visible = false
    }
  },
  watch: {
    value (val) {
      this.visible = val
      val ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'visible')
    },
    visible (val) {
      this.$emit('input', val)
      this.$emit('on-visible-change', val)
    }
  }
}
</script>

<style scoped lang="scss">
  .modal-backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(55,55,55,.6);
    top: 0;
    left: 0;
    z-index: 100;
    .modal {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      background: white;
      border-radius: 15px;
      .close {
        position: absolute;
        right: -20px;
        top: 0;
        width: 20px;
        height: 20px;
        background-color: green;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
      }
      .modal-header {
        line-height: 30px;
        background: #ccc;
      }
      .modal-footer {
        border-top: 1px solid #ccc;
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        width: 100%;
        padding: 15px 0;
        button {
          border: 0;
          width: 70px;
          line-height: 30px;
          cursor: pointer;
          outline: none; 
        }
      }
    }
  }
</style>

