<template>
  <header class="header clearfix">
    <div class="logo inline">
        <img src="../assets/img/logo.png"/>
    </div>
    <nav class="nav inline">
        <ul class="clearfix">
            <li><a href="./index.html">首页</a></li>
            <li><a href="javascript:;">慢生活</a></li>
            <li><a href="javascript:;">虽言碎语</a></li>
            <li><a href="javascript:;">模板分享</a></li>
            <li><a href="./about.html">关于</a></li>
        </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped lang="scss">
    .header {
        line-height: 80px;
        height: 80px;
        font-size: 18px;
        .inline { float: left; height: 80px; }
        .logo {
            width: 60%;
            img {
                display: block;
                width: 260px;
                margin-top: 9px;
                margin-left: 75px;
            }
        }
        .nav {
            width: 40%;
            .clearfix {
                li {
                    float: left;
                    padding: 0 15px;
                }
            }
        }
    }
</style>
