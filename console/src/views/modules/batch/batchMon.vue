<template>
  <d2-container class="mod-sys__user">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" :placeholder="$t('batch.name')" clearable/>
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
      <el-table-column type="selection" header-align="center" align="center" width="50"/>
      <el-table-column prop="id" label="ID" header-align="center" align="center"/>
      <el-table-column prop="name" :label="$t('batch.name')" header-align="center" align="center"/>
      <el-table-column prop="begTm" :label="$t('datePicker.start')" :formatter="formatTime" width="150" header-align="center" align="center"/>
      <el-table-column prop="endTm" :label="$t('datePicker.end')" :formatter="formatTime" width="150" header-align="center" align="center"/>
      <el-table-column prop="elapsedTm" label="elapsed time" header-align="center" align="center"/>
      <el-table-column prop="status" :label="$t('batch.batchStatus.status')" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 'P'" size="mini">{{$t('batch.batchStatus.P')}}</el-tag>
          <el-tag v-else-if="scope.row.status === 'T'" size="mini">{{$t('batch.batchStatus.T')}}</el-tag>
          <el-tag v-else-if="scope.row.status === 'K'" size="mini">{{$t('batch.batchStatus.K')}}</el-tag>
          <el-tag v-else-if="scope.row.status === 'S'" size="mini">{{$t('batch.batchStatus.S')}}</el-tag>
          <el-tag v-else-if="scope.row.status === 'U'" size="mini">UKN</el-tag>
          <el-tag v-else size="mini" type="success">{{$t('batch.batchStatus.O')}}</el-tag>
        </template>        
      </el-table-column> 
      <el-table-column prop="remark" :label="$t('schedule.remark')" header-align="center" :show-overflow-tooltip="true" align="center"/>
      <!-- <el-table-column prop="tmSmp" label="时间戳" header-align="center" align="center"/> -->
      <el-table-column prop="updOpr" :label="$t('batch.oper')" header-align="center" align="center">
      </el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="queryHandle(scope.row)">{{$t('batch.flow')}}</el-button>
          <el-button type="text" size="mini" v-if="scope.row.status==='T'" @click="rerunHandle(scope.row)">continue</el-button>
          <el-button type="text" size="mini" v-if="scope.row.status==='T'" @click="skipHandle(scope.row)">{{$t('batch.batchStatus.K')}}</el-button>
          <el-button type="text" size="mini" v-if="scope.row.status==='P' || scope.row.status==='U'" @click="stopHandle(scope.row)">{{$t('batch.batchStatus.T')}}</el-button>
        </template>

      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
    <upload v-if="uploadVisible" ref="upload" @refreshDataList="getDataList"/>
    <config v-if="configVisible" ref="config" @refreshDataList="getDataList"/>

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
import Config from './batchMng-config'
import Upload from './batchMng-upload'

export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/batch/batinst/list',
        getDataListIsPage: true,
        deleteURL: '/batch/batinf/delete',
        deleteIsBatch: true,
      },
      dataForm: {
        name: ''
      },
      addOrUpdateVisible: false,
      uploadVisible: false,
      configVisible: false
    }
  },
  components: {
    AddOrUpdate,
    Config,
    Upload
  },
  methods: { 
    formatTime(row, column) {
        let time = row[column.property];
        if( !time ) {
          return time;
        }
        return time.substr(0,4) + '-' + time.substr(4,2) + '-' + time.substr(6,2) + ' ' + 
              time.substr(8,2) + ':' + time.substr(10,2) + ':' + time.substr(12,2);
    },     
    stopHandle(element) {
      this.$confirm(this.$i18n.t('stop.batch.orNot') + element.name + this.$i18n.t('batch.batchStatus.T'), this.$i18n.t('note'), {
        confirmButtonText: this.$i18n.t('confirm'),
        cancelButtonText: this.$i18n.t('cancel'),
        type: 'warning'
      }).then(() => {
        this.$axios.post(
          '/batch/batinst/stop',
          {'batchInstId': element.id}
        ).then(res => {
          this.$message.success(this.$i18n.t('batch.tasks') + element.name + this.$i18n.t('prompt.success'));
          this.getDataList();
        })
      })
    },
    skipHandle(element) {
      this.$confirm(this.$i18n.t('batch.skip.orNot') + element.name, this.$i18n.t('note'), {
        confirmButtonText: this.$i18n.t('confirm'),
        cancelButtonText: this.$i18n.t('cancel'),
        type: 'warning'
      }).then(() => {
        this.$axios.post(
          '/batch/batinst/skip',
          {'batchInstId': element.id}
        ).then(res => {
          this.$message.success(this.$i18n.t('skip.batch') + element.name + this.$i18n.t('prompt.success'));
          this.getDataList();
        })
      })
    },    
    rerunHandle(element) {
      // 启动
      this.$confirm(this.$i18n.t('batch.rerun.orNot') + element.name, this.$i18n.t('start.batchTasks'), {
        confirmButtonText: this.$i18n.t('confirm'),
        cancelButtonText: this.$i18n.t('cancel'),
        type: 'warning'
      }).then(() => {
        this.$axios.post(
          '/batch/batinst/rerun',
           {'batchInstId': element.id}
        ).then(res => {
          this.$message.success(this.$i18n.t('batch.tasks') + element.name + this.$i18n.t('batch.begin.success'));
          this.getDataList();
        })
      })
    },
    queryHandle(element) {
      // 查看
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.resetData();
        this.$refs.addOrUpdate.batchInst = element;
        this.$refs.addOrUpdate.init(element.name)
      })
    }         
  }


}
</script>
