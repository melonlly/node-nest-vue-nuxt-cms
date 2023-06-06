<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-container__search">
        <el-input
          v-model="listQuery.keyword"
          clearable
          placeholder="请输入招生时期"
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
      <el-table-column label="招生时期">
        <template slot-scope="{ row }"> {{ row.period }} </template>
      </el-table-column>

      <el-table-column label="培养方案">
        <template slot-scope="{ row }"> {{ row.plan }} </template>
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
        :label="$t('table.actions')"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
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
  </div>
</template>

<script>
import { config } from './config'
import { fetchList, remove } from '@/api/recruit'
import { formatDate } from '@/utils'
import Pagination from '@/components/Pagination'

const { routePath } = config

export default {
  name: 'RecruitList',
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
    }
  },
  watch: {
    'listQuery.keyword'(value) {
      if (value.length <= 0) {
        this.getList()
      }
    },
  },
  created() {
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

    // 删除
    handleDelete(row) {
      let ids = []
      if (Array.isArray(row)) {
        ids = row.map((v) => v.id)
      } else {
        ids.push(row.id)
      }

      this.handleClose(() => {
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
    handleClose(done) {
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
  },
}
</script>
