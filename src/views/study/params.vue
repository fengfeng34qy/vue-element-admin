<template>
  <div class="app-container">
    <el-button @click="paramFn">传递给页面1 - {id: '你好'}</el-button>
  </div>
</template>

<script>

export default {
  name: 'ArticleList',
  data() {
    return {
    }
  },
  created() {},
  methods: {
    paramFn() {
      this.$router.push({
        path: '/study/page1',
        name: 'Page1',
        params: {
          id: '你好'
        }
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
