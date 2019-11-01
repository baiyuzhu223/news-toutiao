<template>
  <el-select :value="value"  placeholder="请选择" @change="fn" clearable>
    <el-option
      v-for="item in channelOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
    //   value: null,
      channelOptions: []

    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      // 赋值频道下拉选项依赖数据
      this.channelOptions = data.channels
    },
    // 值改变函数
    fn (channelId) {
      // 把数据提交给父组件
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    }
  }
}
</script>

<style>

</style>
