<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-container__search">
        <el-input
          v-model="listQuery.keyword"
          clearable
          placeholder="请输入学生姓名"
          @keyup.enter.native="onFilter"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            type="primary"
            @click="onFilter"
            @keyup.enter.native="onFilter"
            >搜索</el-button
          >
        </el-input>
      </div>
      <div class="filter-container__ctrl">
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          plain
          icon="el-icon-edit"
          @click="handleCreate"
        >
          {{ $t('table.add') }}
        </el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          plain
          icon="el-icon-upload"
          @click="importStuData"
        >
          导入学生数据
        </el-button>
        <!-- <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          plain
          icon="el-icon-upload"
          @click="handleCreate"
        >
          导入学生照片
        </el-button> -->
      </div>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      stripe
      @selection-change="handleSelectionChange"
      id="tableList"
    >
      <el-table-column :label="$t('table.name')">
        <template slot-scope="{ row }"> {{ row.name }} </template>
      </el-table-column>

      <el-table-column label="证件号码">
        <template slot-scope="{ row }"> {{ row.card_no }} </template>
      </el-table-column>

      <el-table-column label="学习中心">
        <template slot-scope="{ row }"> {{ row.base }} </template>
      </el-table-column>

      <el-table-column
        sortable
        prop="updatedAt"
        :label="$t('table.updatedAt')"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.updatedAt }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.status')"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{ row }"> {{ row.status }} </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>

          <el-button size="mini" @click="handleChangPwd(row)">
            修改密码
          </el-button>

          <el-button size="mini" type="danger" plain @click="handleDelete(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="el-table__footer"></div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog
      v-loading="loading"
      :visible="uploadUsersModal"
      title="上传学生数据"
      :before-close="handleClose"
    >
      <el-form :model="form" ref="form" label-width="120px">
        <el-form-item label="所属招生计划">
          <el-select
            v-model="form.recruit_id"
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
      </el-form>
      <el-upload
        class="upload-demo"
        action="/api/upload/users"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :limit="1"
        :on-exceed="onUploadExceed"
        :auto-upload="false"
        :file-list="fileList"
        :headers="uploadHeaders"
        ref="upload"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          >上传到服务器</el-button
        >
        <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { config } from './config'
import { fetchList, remove, importUsers } from '@/api/users'
import { fetchList as fetchRecruitList } from '@/api/recruit'
import { formatDate } from '@/utils'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination'

const { routePath } = config
const token = getToken()
const Authorization = `Bearer ${token}`

export default {
  name: 'UserList',
  components: {
    Pagination,
  },

  filters: {
    statusFilter(status) {
      return status ? 'success' : 'info'
    },
    formatDate(date) {
      return formatDate(date)
    },
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id',
        keyword: '',
      },
      downloadLoading: false,
      selectedRows: [],
      recruitList: [], // 招生计划列表
      uploadUsersModal: false,
      form: {
        recruit_id: '',
      },
      fileList: [],
      // 文件上传
      uploadHeaders: {
        Authorization,
      },
      loading: false,
    }
  },
  watch: {
    'listQuery.keyword'(value) {
      if (value.length <= 0) {
        this.getList()
      }
    },
  },
  async created() {
    const { data } = await fetchRecruitList()
    this.recruitList = data || []
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then((res) => {
        const { total = 0, data = [] } = res

        this.list = data
        this.total = total

        this.listLoading = false
      })
    },

    // 添加事件
    handleCreate() {
      this.$router.push(`${routePath}create`)
    },

    // 编辑信息
    handleUpdate(row) {
      this.$router.push({ path: `${routePath}update`, query: { id: row.id } })
    },

    // 修改密码
    handleChangPwd(row) {
      this.$router.push({
        path: `${routePath}password`,
        query: { id: row.id },
      })
    },

    // 删除
    handleDelete(row) {
      let ids = []
      if (Array.isArray(row)) {
        ids = row.map((v) => v.id)
      } else {
        ids.push(row.id)
      }

      this.handleDel(() => {
        remove({
          ids,
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000,
          })
          this.getList()
        })
      })
    },

    handleSelectionChange(val) {
      this.selectedRows = val
    },

    // 删除提醒
    handleDel(done) {
      this.$confirm('确认删除？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },

    // filter
    onFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    importStuData() {
      this.uploadUsersModal = true
    },
    handleClose(action, instance, done) {
      if (action === 'confirm') {
        this.submitUpload()
        done()
      } else {
        done()
      }
    },
    handlePreview(file) {
      console.log('预览文件', file)
    },
    handleRemove(file, fileList) {
      console.log('移除文件', file, fileList)
    },
    beforeUpload(file) {
      if (
        file.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        this.$message.error('只能上传xlsx文件')
        return false
      }
      this.form.fileName = file.name
    },
    handleSuccess(response, file, fileList) {
      console.log('上传成功', response, file, fileList)
      this.$message.success('上传成功')
    },
    handleError(error, file, fileList) {
      console.log('上传失败', error, file, fileList)
      this.$message.error('上传失败')
    },
    // 超出文件
    onUploadExceed() {
      this.$message({
        message: '只能上传一个文件',
        type: 'error',
      })
      console.log('onUploadExceed')
    },
    submitUpload() {
      this.loading = true
      const form = new FormData()
      form.append('file', this.$refs.upload.uploadFiles[0].raw)
      form.append('recruit_id', this.form.recruit_id)
      // 使用axios或其他库提交form数据到后端
      importUsers(form)
        .then((response) => {
          console.log('提交成功', response)
        })
        .catch((error) => {
          console.log('提交失败', error)
        })
        .finally(() => {
          this.loading = false
          this.uploadUsersModal = false
          this.form.recruit_id = ''
          this.$refs.upload.uploadFiles = []
          this.listQuery.page = 1
          this.getList()
        })
    },
  },
}
</script>
