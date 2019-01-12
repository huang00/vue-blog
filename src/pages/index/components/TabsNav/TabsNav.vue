<template>
    <div @mousedown.stop="onMouseDownHanlder($event)" class="tabs-nav-container">
      <span class="left-icon" @click="leftSlide">
        <Icon type="ios-arrow-back" color="#1F5A8E" size="30" />
      </span>
      <div
          v-if="list.length > 0"
          ref="tabsNavWrapper"
          class="tabs-nav-wrapper"
          @mousemove.stop="onMouseMoveHanlder($event)"
      >
        <ul
          class="tabs-nav disabled-select"
          ref="tabsNav"
          @scroll="onTabsNavScroll($event)"
          :style="{
            left: scrollLeft + 'px'
          }"
        >
          <li
              :class="{
                  'nav-item': true,
                  active: index === activeIndex
              }"
              v-for="(item, index) in list"
              :key="index"
              @click="switchTabs(item, index)"
          >钟点房{{ index + 1 }}</li>
        </ul>
      </div>
      <span class="right-icon">
        <Icon type="ios-arrow-forward" color="#1F5A8E" size="30" />
      </span>
    </div>
</template>

<script>
    export default {
        name: 'TabsNav',
        props: {
            list: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        data () {
            return {
                scrollLeft: 0,
                dragMouseDownTrue: false,
                startOffsetLeft: 0,
                preScrollLeft: 0,
                originScrollLeft: 0,
                activeIndex: 0,
                tabsNav: null,
                tabsNavWrapper: null,
                wrapperWidth: 0,
                tabsWidth: 0,
                slide: false
            }
        },
        created() {
          document.addEventListener('mouseup', this.onDocumentMouseup)
        },
        mounted() {
          this.$nextTick(() => {
            this.tabsNav = this.$refs.tabsNav
            this.tabsNavWrapper = this.$refs.tabsNavWrapper
            this.wrapperWidth = this.tabsNavWrapper.offsetWidth
            this.tabsWidth = this.tabsNav.offsetWidth
            this.slide = this.tabsWidth > this.wrapperWidth
            if (!this.slide) {
              this.tabsNav.style.width = this.tabsWidth + 'px'
              this.tabsNav.style.right = 0
              this.tabsNav.style.margin = '0 auto'
            }
          })
        },
        destroyed() {
            document.removeEventListener('mouseup', this.onDocumentMouseup)
        },
        methods: {
            onMouseMoveHanlder (event) {
                event = event || window.event
                if (
                  this.dragMouseDownTrue &&
                  this.slide &&
                  event.button === 0
                ) {
                    this.scroll(event.pageX - this.startOffsetLeft)
                }
            },
            scroll (move) {
              let scrollLeft = this.originScrollLeft + move
              let minLeft = -(this.tabsWidth - this.wrapperWidth)
              scrollLeft = scrollLeft >= 0 ?
                  0 : scrollLeft <= minLeft ?
                  minLeft : scrollLeft
              this.scrollLeft = scrollLeft
            },
            leftSlide () {
              this.scroll(-10)
            },
            onMouseDownHanlder (event) {
              console.log('iiii')
                event = event || window.event
                if (event.button === 0) {
                  this.dragMouseDownTrue = true
                  this.startOffsetLeft = event.pageX
                  this.originScrollLeft = this.scrollLeft
                  // document.addEventListener('mouseup', this.onDocumentMouseup)
                }
            },
            onDocumentMouseup () {
                this.dragMouseDownTrue = false
            },
            switchTabs (id, index) {
                this.$emit('on-switch', id)
                this.activeIndex = index
            }
        }
    }
</script>

<style lang="scss">
  .tabs-nav-container {
    $basic-primary: #1F5A8E;
    position: relative;
    .tabs-nav-wrapper {
      position: relative;
        overflow: hidden;
        height: 40px;
        line-height: 36px;
        top: 0;
        background-color: #FBFBFB;
        color: #999999;
        padding: 0 5px;
        font-size: 14px;
        .disabled-select {
          user-select: none;
        }
        .tabs-nav {
            white-space: nowrap;
            position: absolute;
            .nav-item {
                padding: 0 15px;
                display: inline-block;
                border-top: 4px solid transparent;
                text-align: center;
                cursor: pointer;
                &.active, &:hover {
                    color: $basic-primary;
                    border-color: $basic-primary;
                }
            }
        }
    }
    .left-icon, .right-icon {
      position: absolute;
      z-index: 1;
      line-height: 40px;
      top: 0;
      cursor: pointer;
      opacity: 0;
      transition: all 0.3s;
    }
    .left-icon {
      left: 0;
    }
    .right-icon {
      right: 0;
    }
    &:hover {
      .left-icon, .right-icon {
        opacity: 1;
      }
      .left-icon {
        left: -20px;
      }
      .right-icon {
        right: -20px;
      }
    }
  }
</style>
