<template>
  <transition name="slide-fade">
    <div class="loading" v-if="show">
      <canvas ref="loadingCanvas" style="width: 250px; height: 250px;border: 1px solid green;margin: 0 auto; display: block;"
        width="500" height="500">
      </canvas>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading',
  props: {
    show: { default: false }
  },
  data () {
    return {
      start: 0,
      percent: 2,
      timer: 0
    }
  },
  methods: {
    drawMain (drawingElem, percent, forecolor, bgcolor, start) {
      /*
          @drawingElem: 绘制对象
          @percent：绘制圆环百分比, 范围[0, 100]
          @forecolor: 绘制圆环的前景色，颜色代码
          @bgcolor: 绘制圆环的背景色，颜色代码
      */
      let context = drawingElem.getContext('2d')
      let centerX = drawingElem.width / 2
      let centerY = drawingElem.height / 2
      let rad = Math.PI * 2 / 100
      // 绘制背景圆圈
      function backgroundCircle () {
        context.save()
        context.beginPath()
        context.lineWidth = 45 // 设置线宽
        let radius = centerX - context.lineWidth
        // context.lineCap = 'round'
        context.strokeStyle = bgcolor
        context.arc(centerX, centerY, radius, 0, Math.PI * 2, false)
        context.stroke()
        context.closePath()
        context.restore()
      }
      // 绘制运动圆环
      function foregroundCircle (n) {
        context.save()
        let gradient = context.createLinearGradient(0, 0, 0, drawingElem.height)
        gradient.addColorStop(0, '#B1955E')
        gradient.addColorStop(0.5, '#F6D692')
        gradient.addColorStop(1, '#D3B273')
        context.strokeStyle = gradient
        // context.strokeStyle = forecolor
        context.lineWidth = 45
        // context.lineCap = 'round'
        let radius = centerX - context.lineWidth
        context.beginPath()
        context.arc(centerX, centerY, radius, Math.PI / 2, Math.PI / 2 + n * rad, false) // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke()
        context.closePath()
        context.restore()
      }
      // 绘制文字
      function text (n) {
        context.save() // save和restore可以保证样式属性只运用于该段canvas元素
        context.fillStyle = forecolor
        let fontSize = 120
        context.font = `bold ${fontSize}px Helvetica`
        let textWidth = context.measureText(`${n.toFixed(0)}%`).width
        context.fillText(n.toFixed(0), centerX - textWidth / 4, centerY)
        context.restore()
      }
      // 执行动画
      (function drawFrame () {
        window.requestAnimationFrame(drawFrame)
        context.clearRect(0, 0, drawingElem.width, drawingElem.height)
        backgroundCircle()
        text(start)
        foregroundCircle(start)
        if (start >= percent) return
        start += 1
      }())
    },
    drawStart () {
      this.$nextTick(() => {
        let myCanvas = this.$refs.loadingCanvas
        this.drawMain(myCanvas, this.percent, '#DAB368', '#DEDEDE', this.start)
        this.timer = setInterval(() => {
          this.percent += 1
          this.drawMain(myCanvas, this.percent, '#DAB368', '#DEDEDE', this.start)
          this.start = this.percent
          if (this.percent >= 90) {
            clearInterval(this.timer)
          }
        }, 20)
      })
    },
    end () {
      clearInterval(this.timer)
      let myCanvas = this.$refs.loadingCanvas
      this.drawMain(myCanvas, 100, '#85d824', '#DAB368', this.percent)
    }
  },
  mounted () {
    if (this.show) {
      this.drawStart()
    }
  },
  watch: {
    show (val) {
      this.start = 0
      this.percent = 0
      if (val) {
        this.$nextTick(() => {
          this.drawStart()
        })
      } else {
        clearInterval(this.timer)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .loading {
    height: 350px;
    position: absolute;
    width: 100%;
    top: 0;
    background: white;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-1000px);
    opacity: 0;
  }
</style>
