<template>
  <d2-container class="mod-sys__user">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.username" :placeholder="$t('user.username')" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">{{ $t('query') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      v-loading="dataListLoading"
      :data="dataList"
      border
      @selection-change="dataListSelectionChangeHandle"
      @sort-change="dataListSortChangeHandle"
      style="width: 100%;"
    >
      <el-table-column type="selection" header-align="center" align="center" width="50" />
      <el-table-column prop="usr_no" label="用户号" sortable="custom" header-align="center" align="center" />
      <el-table-column prop="contract_no" label="合同号" header-align="center" align="center" />
      <el-table-column prop="license" label="license" header-align="center" align="center" />
      <el-table-column prop="remark" label="备注" sortable="custom" header-align="center" align="center" />
      <el-table-column prop="status" :label="$t('user.status')" sortable="custom" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="mini" type="danger">{{ $t('user.status0') }}</el-tag>
          <el-tag v-else size="mini" type="success">{{ $t('user.status1') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="mini" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button> -->
          <el-button type="text" size="mini" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
    <!-- 分页 -->
    <el-pagination
      slot="footer"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle"
    ></el-pagination>
  </d2-container>
</template>

<script>
  import mixinViewModule from '@/mixins/view-module'
  import AddOrUpdate from './license-add-or-update'
  export default {
    mixins: [mixinViewModule],
    data() {
      return {
        mixinViewModuleOptions: {
          getDataListURL: '/pub/license/list.do',
          getDataListIsPage: true,
          deleteURL: '/pub/license/delete.do',
          deleteIsBatch: true,
          exportURL: '/pub/license/export.do'
        },
        dataForm: {
          username: ''
        }
      }
    },
    components: {
      AddOrUpdate
    }
  }
</script>
