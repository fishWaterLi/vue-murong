<template>
  <d2-container class="mod-sys__user">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" :placeholder="$t('batch.name')" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">{{$t('query')}}</el-button>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" @click="uploadHandle()">{{$t('batch.upload')}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="deleteHandle()">{{$t('delete')}}</el-button>
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
      <el-table-column prop="name" :label="$t('batch.name')" header-align="center" align="center"/>
      <el-table-column prop="origFilNam" :label="$t('batch.filename')" header-align="center" align="center"/>
      <el-table-column prop="status" :label="$t('batch.batchStatus.status')" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="mini" type="danger">{{$t('batch.invalidStatus')}}</el-tag>
          <el-tag v-else size="mini" type="success">{{$t('batch.validStatus')}}</el-tag>
        </template>        
      </el-table-column> 
      <el-table-column prop="tmSmp" :formatter="formatTime" width="150"  :label="$t('batch.tmsmp')" header-align="center" align="center"/>
      <el-table-column prop="updOpr" :label="$t('batch.oper')" header-align="center" align="center">
      </el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="200">
        <template slot-scope="scope">
          <a :hidden="true" class='download' ref="downloadLink" download=""  :title="$t('batch.download')">{{$t('batch.download')}}</a>
          <el-button type="text" size="mini" @click="downloadHandle(scope.row.name)">{{$t('batch.download')}}</el-button>
          <el-button type="text" size="mini" @click="queryHandle(scope.row.name)">{{$t('batch.flow')}}</el-button>
          <el-button type="text" size="mini" @click="configHandle(scope.row.name)">{{$t('batch.config')}}</el-button>
          <el-button type="text" size="mini" @click="startHandle(scope.row.name)">{{$t('batch.start')}}</el-button>

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
        getDataListURL: '/batch/batinf/list',
        getDataListIsPage: true,
        deleteURL: '/batch/batinf/delete',
        deleteIsBatchKey: 'name',
        deleteIsBatch: true,
      },
      dataForm: {
        name: ''
      },
      uploadVisible: false,
      configVisible: false,
      addOrUpdateVisible: false,
      downloadUrl: '',
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
    uploadHandle() {
      // 上传
      this.uploadVisible = true
      this.$nextTick(() => {
        this.$refs.upload.init()
      })
    },
    downloadHandle(name) {
      // 下载
      this.$refs.downloadLink.href = `${window.SITE_CONFIG['apiURL']}batch/batinf/download?name=` + name;
      this.$refs.downloadLink.click();
    },
    configHandle(name) {
      // 配置
      this.configVisible = true
      this.$nextTick(() => {
        this.$refs.config.dataForm.name = name
        this.$refs.config.init()
      })
    },
    queryHandle(name) {
      // 查看
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.resetData();    
        this.$refs.addOrUpdate.manageEnable = true;   
        this.$refs.addOrUpdate.init(name)
      })
    },
    startHandle(name) {
      // 启动
      this.$confirm(this.$formatStr(this.$i18n.t('batch.startBatchConfirm'), [name]), this.$i18n.t('note'), {
        confirmButtonText: this.$i18n.t('confirm'),
        cancelButtonText: this.$i18n.t('cancel'),
        type: 'warning'
      }).then(() => {
        this.$axios.post(
          '/batch/batinst/run',
          {'name': name}
        ).then(res => {
          this.$message.success(this.$formatStr(this.$i18n.t('batch.startBatchResult'), [name]))
        })
      })      
    },
    
  }


}
</script>
