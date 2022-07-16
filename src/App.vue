<template>
  <div id="app">
    <h1>黑马头条</h1>
    <div class="box">hello wxx</div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
.box{
  width: 200px;
  height: 200px;
  background: pink;
}
</style>
