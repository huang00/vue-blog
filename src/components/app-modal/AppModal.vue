<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close" v-show="visible">
      <input type="text" :value="value" style="display: none;">
      <div class="modal" :style="{height: height, width: width}" @click.stop>
        <span @click="close" class="close">X</span>
        <div class="modal-header" v-if="showHeader">
          <slot name="header">
            {{ title }}
          </slot>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer" v-if="showFooter">
          <slot name="footer">
            <button @click="confirm">confirm</button>
            <button @click="cancel">cancel</button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AppModal",
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
      default: "title"
    },
    width: {
      type: String,
      default: "500px"
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  data() {
    return {
      visible: false
    };
  },
  created() {
    this.visible = this.value;
    if (this.value) document.body.style.overflow = "hidden";
  },
  methods: {
    close() {
      this.visible = false;
    },
    confirm() {
      this.$emit("on-ok");
    },
    cancel() {
      this.$emit("on-cancel");
      this.visible = false;
    }
  },
  watch: {
    value(val) {
      this.visible = val;
      if (val) document.body.style.overflow = "hidden";
      else {
        let modalList = Array.prototype.slice.apply(
          document.body.getElementsByClassName("modal-backdrop")
        );
        modalList.filter(item => !item.style.display).length === 1
          ? (document.body.style = "")
          : (document.body.style.overflow = "hidden");
      }
    },
    visible(val) {
      this.$emit("input", val);
      this.$emit("on-visible-change", val);
    }
  }
};
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(55, 55, 55, 0.6);
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
    padding-top: 30px;
    padding-bottom: 51px;
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
      height: 30px;
      background: #ccc;
      position: absolute;
      top: 0;
      width: 100%;
    }
    .modal-footer {
      border-top: 1px solid #ccc;
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      width: 100%;
      padding: 10px 0;
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
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
</style>
