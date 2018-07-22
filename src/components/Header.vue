<template>
  <header class="clearfix">
    <div class="logo inline">
        <a href="/index.html"><img src="../assets/img/logo.png"/></a>
    </div>
    <nav class="nav inline">
        <a v-for="(item, index) in navList" :key="index"
        :href="item.href" :class="[item.active === currLocation? 'active': '']">
            <span>{{ item.txt }}</span>
            <span class="en">{{ item.en }}</span>
        </a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHead',
  props: ['currLocation'],
  data () {
    return {
      navList: [
        {txt: '首页', href: './index.html', active: 'index', en: 'Protal'},
        {txt: '慢生活', href: 'javascript:;', active: '', en: 'Life'},
        {txt: '虽言碎语', href: 'javascript:;', active: '', en: 'Doing'},
        {txt: '模板分享', href: 'javascript:;', active: '', en: 'Share'},
        {txt: '学无止境', href: 'javascript:;', active: '', en: 'Learn'},
        {txt: '关于', href: './about.html', active: 'about', en: 'About'}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
    header {
        line-height: 60px;
        font-size: 18px;
        padding: 10px 0;
        .inline { float: left; height: 60px; }
        .logo {
            width: 55%;
            img {
                display: block;
                width: 260px;
                margin-left: 150px;
            }
        }
        .nav {
            width: 45%;
            padding: 0 15px;
            a { 
                color: black;
                position: relative;
                display: inline-block;
                margin: 0 10px;
                .en {
                    display: block;
                    position: absolute;
                    color: #999;
                    font: 12px Georgia, serif;
                    top: 25px;
                    transition: all 0.3s;
                    text-align: center; 
                    width: 100%;
                    opacity: 0;
                }
            }
            .active { color: #e15782; }
            a:hover {
                .en { top: 42px; opacity: 1; }
            }
        }
    }
</style>
