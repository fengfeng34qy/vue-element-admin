<template>
  <div class="app-container">
    <el-button @click="skipFn">跳转传参</el-button>
    <el-button @click="test2">store</el-button>
    <el-button @click="test3">提示message</el-button>
    <el-button @click="test4">弹窗</el-button>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column width="180px" align="center" label="日期">
        <template slot-scope="scope">
          <span>{{ scope.row.meta.updateAt.substring(0, 10) }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="重要程度">
        <template slot-scope="scope">
          <svg-icon v-for="n in + Number(scope.row.stars)" :key="n" icon-class="star" class="meta-item__icon"/>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state">{{ scope.row.state == '0' ? '未发布' : '已发布' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="描述">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row._id" class="link-type">
            <span>{{ scope.row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <!-- <router-link :to="'/example/edit/'+scope.row._id"> -->
          <el-button :disabled="scope.row.state === '1'" type="primary" size="small" icon="el-icon-edit" @click="publish(scope.row._id)">发布</el-button>
          <!-- </router-link> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { articlesList } from '@/api/article'
import { Publish } from '@/api/publish'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'AllArticle',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    skipFn() {
      this.$router.push({
        path: '/example/list',
        name: 'ArticleList',
        params: {
          id: 1
        }
      })
    },
    getList() {
      this.listLoading = true
      articlesList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    /* 发布文章 */
    publish(id) {
      this.publishArticle(id)
    },
    /* 发布文章 接口 */
    publishArticle(id) {
      console.log(id)
      Publish(id).then(response => {
        this.getList()
      })
    },
    test2() {
      // this.commit('test2')
    },
    test3() {
      this.$message({ message: '成功', type: 'success' })
    },
    test4() {
      this.$message({ message: '弹窗暂时没写，需要自己手动写一个dialog弹窗组件', type: 'error' })
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
