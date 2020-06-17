<template>
  <d2-container class="mod-sys__user">
    <!-- {{$formatStr("hello {0}", ["world"]) }} -->
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item label="Batch">
        <el-select v-model="dataForm.batchNam">
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.taskNam" placeholder="task name" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">{{$t('query')}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addHandle()">Add</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      v-loading="dataListLoading"
      :data="dataList"
      border
      @selection-change="dataListSelectionChangeHandle"
      @sort-change="dataListSortChangeHandle"
      style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"/>
      <el-table-column prop="batchNam" label="batchNam" header-align="center" align="center"/>
      <el-table-column prop="taskNam" label="taskNam"  header-align="center" width="150" align="center"/>
      <el-table-column prop="status" label="status" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '0'" size="mini">invalid</el-tag>
          <el-tag v-else-if="scope.row.status === '1'" size="mini">valid</el-tag>
        </template>        
      </el-table-column> 
      <el-table-column prop="estTime" label="est_time" width="150" header-align="center" align="center"/>
      <el-table-column prop="updOpr" :label="$t('batch.oper')" header-align="center" align="center">
      </el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="deleteHandle(scope.row)">delete</el-button>
          <el-button type="text" size="mini" @click="updateHandle(scope.row)">update</el-button>
          <el-button type="text" size="mini" @click="queryHandle(scope.row)">query</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      slot="footer"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle">
    </el-pagination>

    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>

  </d2-container>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './taskConfig-add-or-update'

export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/batch/taskconfig/list',
        getDataListIsPage: true,
        deleteURL: '/batch/taskconfig/delete',
        deleteIsBatch: true,
      },
      dataForm: {
        batchNam: '',
        taskNam: ''
      },
    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
    addHandle() {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.readonly = false;
        this.$refs.addOrUpdate.init();
      })
    },
    queryHandle(row) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.readonly = true;
        this.$refs.addOrUpdate.init(row);
      })
    },
    updateHandle(row) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.readonly = false;
        this.$refs.addOrUpdate.init(row);
      })
    },
    deleteHandle(row) {
        this.$confirm('delete ' + row.batchNam + '|' + row.taskNam + '?', this.$i18n.t('note'), {
          confirmButtonText: this.$i18n.t('confirm'),
          cancelButtonText: this.$i18n.t('cancel'),
          type: 'warning'
        }).then(() => {
          this.$axios.post(
            '/batch/taskconfig/delete',
            {'id': row.id}
          ).then(res => {
            this.getDataList();
            this.$message.success('success');
          })
        })
    },
  }

}
</script>
