<template>
  <div>
    <!-- 弹出框 -->
    <el-dialog
      :title="!userInfoDto.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%">

      <el-form v-loading="submitLoading" ref="userInfoDto" :model="userInfoDto" :rules="userInfoDtoRules" label-width="100px" label-suffix="：" status-icon>

        <el-form-item label="帐号" prop="account">
          <el-input v-model.trim="userInfoDto.account" :disabled="!userInfoDto.id ? false : true" placeholder="请输入帐号"/>
        </el-form-item>

        <el-form-item label="密码" prop="password" v-show="flag">
          <el-input v-model.trim="userDto.password" type="password" placeholder="请输入密码"/>
        </el-form-item>

        <el-form-item label="昵称" prop="username">
          <el-input v-model.trim="userInfoDto.username" placeholder="请输入昵称"/>
        </el-form-item>

        <el-form-item label="身份" prop="role" v-show="flag">
          <el-radio v-model="userDto.role" label="3">游客</el-radio>
          <el-radio v-model="userDto.role" label="2">普通用户</el-radio>
          <el-radio v-model="userDto.role" label="1">管理员</el-radio>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">提 交</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import * as user from '@/api/user'

export default {
  data() {
    return {
      //判断更新还是新增
      flag:'',
      // 提交按钮加载
      submitLoading: false,
      // 弹出框是否显示
      dialogVisible: false,
      // 表单新增编辑属性
      userInfoDto: {
        id: null,
        account: '',
        //password: '',
        username: '',
        //role:'',
      },
      userDto:{
        id:null,
        account:'',
        password:'',
        username:'',
        role:''
      },
      // 表单检验规则
      userInfoDtoRules: {
        account: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        // password: [
        //   { required: true, message: '请输入密码', trigger: 'blur' }
        // ],
        username: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ],
         roleId: [
          { required: true, message: '请选择一个身份', trigger: 'blur' }
        ]
      }
    }
  },
  // 启动时就执行
  mounted() {

  },
  methods: {
    // 提交新增或更新
    submitForm() {
      this.submitLoading = true
      this.$refs.userInfoDto.validate((valid) => {
        if (valid) {
          if (this.userInfoDto.id) {
            // userId不为空更新
            user.update(this.userInfoDto).then(response => {
              console.log(response)
              // 执行成功重置表单且弹出提示信息
              this.resetForm()
              this.$message({
                type: 'success',
                message: response.msg
              })
            }).catch(error => {
              console.log(error)
            }).then(() => {
              // always executed 类似finally
              this.submitLoading = false
            })
          } else {
            console.log(this.userDto.password)
            this.userDto.account = this.userInfoDto.account
            this.userDto.username = this.userInfoDto.username
            
            // userId为空新增
            user.add(this.userDto).then(response => {
              // 执行成功重置表单且弹出提示信息
              this.resetForm()
              this.$message({
                type: 'success',
                message: response.msg
              })
            }).catch(error => {
              console.log(error)
            }).then(() => {
              // always executed 类似finally
              this.submitLoading = false
            })
          }
        } else {
          this.submitLoading = false
          return false
        }
      })
    },
    // 重置
    resetForm() {
      // 清空表单
      this.$refs.userInfoDto.resetFields()
      // 关闭弹窗
      this.dialogVisible = false
      // 刷新父组件列表
      // this.$parent.list(this.$parent.serachForm)
      // 父子组件事件监听刷新父组件列表
      this.$emit('refreshTableData')
      this.submitLoading = false
    },
    // 准备新增或更新
    preById(user) {
      
      //console.log(user)
      // userId不为空更新
      if (user != null) {
        this.flag = false
        this.submitLoading = true
        //this.userInfoDto.id = id
        this.userInfoDto = user
         console.log("---------")
        console.log(this.userInfoDto)
        // user.findById(id).then(response => {
          
        //   const data = response.data
        //   this.userInfoDto = data
        //   this.submitLoading = false
        // })
        this.submitLoading = false
      } else if(user == null){
        this.userInfoDto.account = ''
        this.userInfoDto.username = ''
        this.userDto.password = ''
        this.userDto.role = ''
        this.flag = true
        // id为空新增
        this.userInfoDto.id = ''
      }
      // 显示弹出框
      this.dialogVisible = true
    },
    // 弹窗关闭事件方法
    handleClose(done) {
      // 重置表单
      this.resetForm()
      done()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
