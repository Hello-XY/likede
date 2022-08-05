<template>
  <div class="business-container">
    <div class="business-search">
      <span>工单编号:</span><InputField /> <span>工单状态:</span
      ><AutoComplete />
      <CustomButton class="btn">查询</CustomButton>
    </div>
  </div>
</template>

<script>
import InputField from '@/components/InputField'
import AutoComplete from '@/components/AutoComplete'
import CustomButton from '@/components/CustomButton'

export default {
  components: {
    InputField,
    AutoComplete,
    CustomButton
  },
  data() {
    return {}
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.business {
  &-container {
    margin: 60px 20px 20px;
    padding-top: 20px;
    text-align: center;
  }
  &-search {
    display: flex;
    -webkit-box-align: center;
    height: 60px;
    background-color: #fff;
    line-height: 60px;
    // align-items: center;
    span {
      padding: 0 17px;
      font-size: 14px;
      color: #606266;
    }
    .btn{
      margin-left: 10px;
    }
  }
}
</style>
