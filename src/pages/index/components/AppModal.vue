<template>
  <div class="modal-backdrop" v-if="visible">
    <input type="text" :value="value" style="display: none;">
    <div class="modal">
      <div class="modal-header">
        <slot name="header">
          <h5>header</h5>
        </slot>
        <span @click="close" class="close">X</span>
      </div>
      <div class="modal-body">
        <slot name="body">
          <h1>body</h1>
        </slot>
      </div>
      <div class="modal-footer">
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
    z-index: 1;
    .modal {
      width: 500px;
      height: 300px;
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
    }
  }
</style>

