<template>
  <div class="app-container" v-loading="loading">
    <el-form
      :model="formData"
      :rules="rules"
      ref="validateForm"
      label-width="100px"
    >
      <el-form-item label="招生时期" prop="period">
        <el-input v-model="formData.period"></el-input>
      </el-form-item>

      <el-form-item label="培养方案" prop="plan">
        <el-input v-model="formData.plan"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('validateForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { config } from '../config'
import { getDetail, create, update } from '@/api/recruit'

const { routePath } = config

export default {
  name: 'CreateUpdate',
  filters: {},
  props: {
    type: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,

      // query 参数
      querys: {
        id: '',
      },

      formData: {
        id: '',
      },
      rules: {
        period: [
          { required: true, message: '请输入招生时期', trigger: 'blur' },
        ],
        plan: [{ required: true, message: '请输入培养方案', trigger: 'blur' }],
      },
    }
  },
  watch: {},
  async created() {
    this.getQuery()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }

        this.loading = true

        if (this.type === 'update') {
          this.putUpdate()
        } else {
          this.postCreate()
        }
      })
    },

    onChange(e) {
      console.log(e)
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // 获取  query 参数
    getQuery() {
      const querys = this.$route.query || {}
      this.querys = querys

      if (this.type === 'update') {
        this.getDetail()
      }
    },

    // 添加
    postCreate() {
      create(this.formData)
        .then(() => {
          this.loading = false

          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000,
          })

          setTimeout(() => {
            this.$router.push(`${routePath}list`)
          }, 1000)
        })
        .catch(() => {
          this.loading = false
        })
    },

    // 更新
    putUpdate() {
      update(this.formData)
        .then(() => {
          this.loading = false

          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000,
          })

          setTimeout(() => {
            this.$router.push(`${routePath}list`)
          }, 1000)
        })
        .catch(() => {
          this.loading = false
        })
    },

    // 详情
    getDetail() {
      this.loading = true

      getDetail(this.querys.id).then((res) => {
        this.loading = false
        this.formData = res
      })
    },
  },
}
</script>
