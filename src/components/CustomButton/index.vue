<template>
  <div>
    <el-button
      type="primary"
      :icon="iconType"
      class="search-btn"
      :style="styles"
    >
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    iconType: {
      type: String,
      default: 'el-icon-search'
    },
    styles: {
      type: Object
    }
  },
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style scoped>
.search-btn {
  width: 80px;
  height: 36px;
  padding: 0;
}
</style>
