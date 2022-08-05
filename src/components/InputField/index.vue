<template>
  <div>
    <el-input v-model="input" placeholder="请输入"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped>
::v-deep .el-input__inner {
  width: 206px;
  height: 36px;
}
</style>
