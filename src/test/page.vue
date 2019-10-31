<template>
  <div class="container-page">
      <p>header</p>
      <div>
          <slot name="content" :pn="pageName" test="测试">备用</slot>
      </div>
      <p><slot name="footer">footer</slot></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: '组件内部数据'
    }
  }
}
</script>

<style scoped lang="less">

</style>
