<template>
  <div class="app-container" v-loading="loading">
    <el-form
      :model="formData"
      :rules="rules"
      ref="validateForm"
      label-width="100px"
    >
      <el-form-item label="学生姓名" prop="name">
        <el-input
          v-model="formData.name"
          placehoder="初始账号默认为证学生姓名"
        ></el-input>
      </el-form-item>

      <el-form-item label="所属招生计划" prop="recruit_id">
        <el-select
          v-model="formData.recruit_id"
          placeholder="请选择所属招生计划"
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

      <el-form-item label="学生照片" prop="avatar">
        <el-upload
          action="/api/upload"
          list-type="picture-card"
          :auto-upload="true"
          :file-list="uploadFile.list"
          name="upload"
          drag
          :limit="uploadFile.limit"
          :on-success="onUploadChange"
          :on-exceed="onUploadExceed"
          :headers="uploadHeaders"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="学习状态" prop="status">
        <el-input v-model="formData.status"></el-input>
      </el-form-item>

      <el-form-item label="证件类型" prop="card_type">
        <el-input v-model="formData.card_type"></el-input>
      </el-form-item>

      <el-form-item label="证件号" prop="card_no">
        <el-input
          v-model="formData.card_no"
          placehoder="初始密码默认为证件号"
        ></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-input v-model="formData.sex"></el-input>
      </el-form-item>

      <el-form-item label="民族" prop="nation">
        <el-input v-model="formData.nation"></el-input>
      </el-form-item>

      <el-form-item label="政治面貌" prop="politics">
        <el-input v-model="formData.politics"></el-input>
      </el-form-item>

      <el-form-item label="学习中心" prop="base">
        <el-input v-model="formData.base"></el-input>
      </el-form-item>

      <el-form-item label="中心电话" prop="base_phone">
        <el-input v-model="formData.base_phone"></el-input>
      </el-form-item>

      <el-form-item label="出生日期" prop="born">
        <el-input v-model="formData.born"></el-input>
      </el-form-item>

      <el-form-item label="移动电话" prop="phone">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>

      <el-form-item label="Email" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>

      <el-form-item label="邮政编码" prop="postcode">
        <el-input v-model="formData.postcode"></el-input>
      </el-form-item>

      <el-form-item label="通讯地址" prop="address">
        <el-input type="textarea" v-model="formData.address"></el-input>
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
import { getDetail, create, update } from '@/api/users'
import { fetchList } from '@/api/recruit'
import { getToken } from '@/utils/auth'

const { routePath } = config
const token = getToken()
const Authorization = `Bearer ${token}`

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
        name: [{ required: true, message: '请输入学生姓名', trigger: 'blur' }],
        card_no: [{ required: true, message: '请输入证件号', trigger: 'blur' }],
      },

      recruitList: [], // 招生计划列表

      // 文件上传
      uploadHeaders: {
        Authorization,
      },
      uploadFile: {
        list: [],
        limit: 1,
      },
    }
  },
  watch: {},
  async created() {
    const { data } = await fetchList()
    this.recruitList = data || []
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

        // const { avatar } = res
        // this.uploadFile.list.push({
        //   name: avatar,
        //   url: baseHost + avatar.replace('public/', ''),
        // })

        this.formData = res
      })
    },

    // 文件上传添加
    onUploadChange(res, file) {
      console.log(res, file, this.uploadFile)
      this.formData.avatar = res.path
    },

    // 超出文件
    onUploadExceed() {
      this.$message({
        message: '只能上传一张图片',
        type: 'error',
      })
      console.log('onUploadExceed')
    },
  },
}
</script>
