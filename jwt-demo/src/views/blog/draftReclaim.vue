<template>
  <div class="dashboard-container">
    <!-- 查询表单 -->
    <el-form :inline="true" label-width="90px" label-suffix="：" size="small">
       <!-- <el-input placeholder="请输入查询信息" v-model="input" clearable>
        </el-input> -->
      <el-form-item>
       
        <el-button type="primary" icon="el-icon-search" @click="list()"
          >查询</el-button
        >
        <el-button type="primary" icon="el-icon-plus" @click="openEdit()"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column type="index" align="center" min-width="60" />
      <el-table-column
        prop="title"
        label="标题"
        align="center"
        min-width="100"
        show-overflow-tooltip
      />
      <el-table-column
        prop="username"
        label="作者"
        align="center"
        min-width="100"
        show-overflow-tooltip
      />
      <!-- <el-table-column prop="password" label="密码" align="center" width="200"/> -->
      <el-table-column
        prop="created"
        label="发表时间"
        align="center"
        min-width="100"
        show-overflow-tooltip
      />
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="openEdit(scope.row.id)">编辑</el-button>
          <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delById(scope.row.id)">
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popconfirm>
          
        </template>
      </el-table-column>
    </el-table>
    <div align="right" style="margin-top: 10px">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="pageSize"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import * as blog from "@/api/blog";

export default {
  name: "draftReclaim",
  data() {
    return {
      // 表格加载条控制
      tableLoading: false,
      // Table数据
      tableData: [],
      // Table数据总条数
      totalCount: 0,
      // 查询条件
      search: "",
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 10,
    };
  },
  // 启动时就执行
  mounted() {
    // 列表查询
    this.list()
  },
  methods: {
    // 每页条数改变
    handleSizeChange(size) {
      this.pageSize = size;
      // 刷新列表
      this.list()
    },
    // 当前页数改变
    handleCurrentChange(page) {
      this.currentPage = page;
      // 刷新列表
      this.list()
    },
    // 列表查询
    list() {
      // 加载显示
      this.tableLoading = true;
      blog
        .drbackList(
          this.currentPage,
          this.pageSize,
          this.search,
          this.$store.state.user.id
        )
        .then((response) => {
          console.log(response);
          this.tableData = response.data.blogList;
          this.totalCount = response.data.count;
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          // always executed 类似finally
          this.tableLoading = false;
        });
    },
    // 调用子组件的openEdit方法
    openEdit(id) {
      let info = this.$router.resolve({
        path:'/edit',
        query:{id:id,flag:0}
      })
      window.open(info.href, '_blank')
      // this.$nextTick Dom渲染完执行
      /* this.$nextTick(() => {
        this.$refs.listEdit.preById(userId)
      }) */
      //this.$refs.listEdit.preById(row);
    },
    // 删除
    delById(id) {
      blog.delById(id).then((response) => {
        // 刷新列表
        this.list();
        this.$message({
          type: "success",
          message: response.msg,
        });
      }).catch(() => {});
    }     
  },
  //给孙子传方法
  // provide(){
  //   return{
  //     list:this.list
  //   }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>
