<template>
  <d2-container class="mod-sys__user">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item :label="$t('batch.batchInstances')">
        <el-input v-model="dataForm.batchInstId" :placeholder="$t('batch.instances.decorate')" clearable/>
      </el-form-item>
      <el-form-item :label="$t('taskName')">
        <el-input v-model="dataForm.name" :placeholder="$t('normal.taskName')" clearable/>
      </el-form-item>          
      <el-form-item :label="$t('normal.status')">
        <el-select v-model="dataForm.status" :placeholder="$t('decorate.status')" clearable>
          <el-option value="S" :label="$t('batch.batchStatus.S')"/>
          <el-option value="F" :label="$t('batch.batchStatus.F')"/>
          <el-option value="K" :label="$t('batch.batchStatus.K')"/>
          <el-option value="P" :label="$t('batch.batchStatus.P')"/>
        </el-select>
      </el-form-item>      
      <el-form-item>
        <el-button @click="getDataList()">{{$t('scan')}}</el-button>
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
      <el-table-column prop="id" label="ID" sortable="custom" header-align="center" align="center"/>
      <!-- <el-table-column prop="instId" label="批量实例" sortable="custom" header-align="center" size="250" align="center"/> -->
      <el-table-column prop="name" :label="$t('batch.name')" sortable="custom" header-align="center" size="100" align="center"/>
      <el-table-column prop="batNam" :label="$t('batch.batchNames')" sortable="custom" header-align="center" align="center"/>
      <el-table-column prop="status" :label="$t('batch.batchStatus.status')" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 'P'" size="mini">{{$t('batch.batchStatus.P')}}</el-tag>
          <el-tag v-else-if="scope.row.status === 'F'" size="mini">{{$t('batch.batchStatus.F')}}</el-tag>
          <el-tag v-else-if="scope.row.status === 'K'" size="mini">{{$t('batch.batchStatus.K')}}</el-tag>
          <el-tag v-else-if="scope.row.status === 'S'" size="mini">{{$t('batch.batchStatus.S')}}</el-tag>
          <el-tag v-else size="mini" type="success">{{$t('batch.batchStatus.O')}}</el-tag>
        </template>         
      </el-table-column> 
      <el-table-column prop="begTm" :label="$t('datePicker.start')" header-align="center" align="center"/>
      <el-table-column prop="endTm" :label="$t('datePicker.end')" header-align="center" align="center"/>
      <el-table-column prop="tmSmp" :label="$t('batch.tmsmp')" header-align="center" align="center"/>
      <el-table-column prop="updOpr" :label="$t('batch.oper')" header-align="center" align="center">
      </el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="queryHandle(scope.row.id)">{{$t('batch.query')}}</el-button>
          <el-button v-if="scope.row.status != 'S' && scope.row.status != 'K'" type="text" size="mini" @click="skipHandle(scope.row.id)">{{$t('batch.batchStatus.K')}}</el-button>
          <el-button v-if="scope.row.status != 'S' && scope.row.status != 'K'" type="text" size="mini" @click="restartHandle(scope.row.id)">{{$t('rerun')}}</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
    <log v-if="logVisible" ref="log"/>

    <!-- 分页 -->
    <!-- <el-pagination
      slot="footer"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle">
    </el-pagination> -->
  </d2-container>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './batchMng-add-or-update'
import Log from './batchMng-log'

export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/batch/taskinst/list',
        getDataListIsPage: true,
        activatedIsNeed: false,
      },
      dataForm: {
        batchInstId: '',
        status: '',
        name: ''
      },
      logVisible: false,
    }
  },
  computed: {
    dataRule () {
      return {
        batchInstId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
      }
    }
  },   
  components: {
    AddOrUpdate,
    Log
  },
  methods: {
    skipHandle(id) {
      let item = this.findDataItem(id);
      if( !item ) {
        this.$message.error('not found id:' + id);
        return;
      }
      let name = item.name;
      let instId = item.instId;
        this.$confirm(this.$i18n.t('skip.orNot') + name, this.$i18n.t('note'), {
          confirmButtonText: this.$i18n.t('confirm'),
          cancelButtonText: this.$i18n.t('cancel'),
          type: 'warning'
        }).then(() => {
          this.$axios.post(
            '/batch/taskinst/skip',
            {'batchInstId': instId, 'name': name}
          ).then(res => {
            this.$message.success(this.$i18n.t('skip.task') + name + this.$i18n.t('prompt.success'));
          })
        })
    },
    restartHandle(id) {
      let item = this.findDataItem(id);
      if( !item ) {
        this.$message.error('not found id:' + id);
        return;
      }
      let name = item.name;
      let instId = item.instId;
// 启动
        this.$confirm(this.$i18n.t('normal.rerun.orNot') + name, this.$i18n.t('note'), {
          confirmButtonText: this.$i18n.t('confirm'),
          cancelButtonText: this.$i18n.t('cancel'),
          type: 'warning'
        }).then(() => {
          this.$axios.post(
            '/batch/taskinst/rerun',
            {'batchInstId': instId, 'name': name}
          ).then(res => {
            this.$message.success(this.$i18n.t('normal.rerun.task') + name + this.$i18n.t('prompt.success'))
          })
        })
    },
    queryHandle(id) {      
      // 查看
      let item = this.findDataItem(id);
      if( !item ) {
        this.$message.error('not found id:' + id);
        return;
      }
      this.logVisible = true;
      this.$nextTick(() => {
        this.$refs.log.init(item.instId, item.name);
      })
    },
    findDataItem(id) {
      for( let k = 0; k < this.dataList.length; k++ ) {
        if( this.dataList[k].id === id ) {
          return this.dataList[k];
        }
      }
    }        
  }


}
</script>
