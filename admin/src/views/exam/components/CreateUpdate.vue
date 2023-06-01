<template>
  <div class="app-container" v-loading="loading">
    <el-form
      :model="formData"
      :rules="rules"
      ref="validateForm"
      label-width="100px"
    >
      <el-form-item label="所属招生计划" prop="recruitId">
        <el-select
          v-model="formData.recruitId"
          placeholder="请选择所属招生计划"
          style="width: 100%"
        >
          <el-option
            v-for="item in recruitList"
            :key="item.id"
            :label="`${item.period}-${item.plan}`"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学期" prop="period">
        <el-input v-model="formData.period"></el-input>
      </el-form-item>

      <el-form-item label="学生" prop="userId">
        <el-select
          v-model="formData.userId"
          placeholder="请选择学生"
          style="width: 100%"
        >
          <el-option
            v-for="item in users"
            :key="item.id"
            :label="`${item.name}`"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学科" prop="subject">
        <el-input v-model="formData.subject"></el-input>
      </el-form-item>

      <el-form-item label="分数" prop="score">
        <el-input v-model="formData.score"></el-input>
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
import { getDetail, create, update } from '@/api/exam'
import { fetchList } from '@/api/recruit'
import { fetchAll } from '@/api/users'

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
        recruitId: [
          { required: true, message: '请选择所属招生计划', trigger: 'blur' },
        ],
        period: [{ required: true, message: '请输入学期', trigger: 'blur' }],
        userId: [{ required: true, message: '请选择学生', trigger: 'blur' }],
        subject: [{ required: true, message: '请选择学科', trigger: 'blur' }],
        score: [{ required: true, message: '请选择分数', trigger: 'blur' }],
      },

      recruitList: [], // 招生计划列表
      users: [], // 全部学生列表
    }
  },
  watch: {},
  async created() {
    const { data } = await fetchList()
    this.recruitList = data || []
    const res = await fetchAll()
    this.users = res.data || []
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
        this.formData.recruitId = res.recruit?.id
        this.formData.userId = res.user?.id
        console.log(this.formData, this.recruitList, this.users)
      })
    },
  },
}
</script>
