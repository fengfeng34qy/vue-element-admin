<template>
  <div class="app-container">
    <div>接口传递过来的值{{ data }}</div>
  </div>
</template>

<script>

export default {
  name: 'ArticleList',
  data() {
    return {
      data: ''
    }
  },
  created() {
    console.log(this.$route.params)
    this.data = this.$route.params
  },
  methods: {
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
