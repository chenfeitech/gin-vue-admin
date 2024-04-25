<template>
  <div>
    <warning-bar title="在资源权限中将此角色的资源权限清空 或者不包含创建者的角色 即可屏蔽此客户资源的显示" />
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button
          type="primary"
          icon="plus"
          @click="openDialog"
        >新增</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
        row-key="ID"
      >
        <el-table-column
          type="selection"
          width="55"
        />

        <el-table-column
          align="left"
          label="会议室名称"
          prop="name"
          width="120"
        />
        <el-table-column
          align="left"
          label="会议室说明"
          prop="roomDesc"
          width="120"
        />
        <el-table-column
          align="left"
          label="会议室容量"
          prop="posNum"
          width="120"
        />
        <el-table-column
          align="left"
          label="会议室类型"
          prop="roomType"
          width="120"
        />
        <el-table-column
          align="left"
          label="添加日期"
          width="180"
        >
          <template #default="scope">
            <span>{{ formatDate(scope.row.CreatedAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          min-width="160"
        >
          <template #default="scope">
            <el-button
              type="primary"
              link
              icon="edit"
              @click="updateCustomer(scope.row)"
            >编辑</el-button>
            <el-button
              type="primary"
              link
              icon="delete"
              @click="deleteCustomer(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      :before-close="closeDialog"
      title="客户"
    >
      <el-form
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="会议室名称">
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="会议室说明">
          <el-input
            v-model="form.roomDesc"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="会议室容量">
          <el-input
            v-model.number="form.posNum"
            autocomplete="off"
            type="number"
          />
        </el-form-item>
        <el-form-item label="会议室类型">
          <el-input
            v-model.number="form.roomType"
            autocomplete="off"
            type="number"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button
            type="primary"
            @click="enterDialog"
          >确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  getRoomList,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom
} from '@/api/meeting'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatDate } from '@/utils/format'

defineOptions({
  name: 'Customer'
})

const form = ref({
  customerName: '',
  customerPhoneData: ''
})

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async() => {
  const table = await getRoomList({ page: page.value, pageSize: pageSize.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

const dialogFormVisible = ref(false)
const type = ref('')
const updateCustomer = async(row) => {
  const res = await getRoomById({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    form.value = res.data.room
    dialogFormVisible.value = true
  }
}
const closeDialog = () => {
  dialogFormVisible.value = false
  form.value = {
    roomType: '',
    roomDesc: '',
    posNum: '',
    name: ''
  }
}
const deleteCustomer = async(row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async() => {
    const res = await deleteRoom({ ID: row.ID })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      if (tableData.value.length === 1 && page.value > 1) {
        page.value--
      }
      getTableData()
    }
  })
}
const enterDialog = async() => {
  let res
  switch (type.value) {
    case 'create':
      res = await createRoom(form.value)
      break
    case 'update':
      res = await updateRoom(form.value)
      break
    default:
      res = await createRoom(form.value)
      break
  }

  if (res.code === 0) {
    closeDialog()
    getTableData()
  }
}
const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}

</script>

<style></style>
