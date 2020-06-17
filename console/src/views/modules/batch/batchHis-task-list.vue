<template>
  <el-dialog :visible.sync="visible" width="1000px" height="600px" :title="$t('batch.batchTaskLists')">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <div><span>{{$t('batch.batchNames')}}:{{dataForm.batchName}}</span></div>
      <el-form-item :label="$t('batch.batchInstances')">
        <el-input :readonly="true" v-model="dataForm.batchInstId" :placeholder="$t('batch.instances.decorate')" clearable/>
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
      max-height = "300"
      size="mini"
      v-loading="dataListLoading"
      :data="dataList"
      border
      @selection-change="dataListSelectionChangeHandle"
      @sort-change="dataListSortChangeHandle"
      style="width: 100%;">
      <!-- <el-table-column prop="id" label="ID" sortable="custom" header-align="center" align="center"/> -->
      <!-- <el-table-column prop="instId" label="批量实例" sortable="custom" header-align="center" size="250" align="center"/> -->
      <el-table-column prop="name" :label="$t('batch.name')" sortable="custom" header-align="center" size="100" align="center"/>
      <!-- <el-table-column prop="batNam" label="批量名称" sortable="custom" header-align="center" align="center"/> -->
      <el-table-column prop="status" :label="$t('batch.batchStatus.status')" header-align="center" align="center" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 'P'" size="mini">{{$t('batch.batchStatus.P')}}</el-tag>
          <el-tag v-else-if="scope.row.status === 'F'" size="mini">{{$t('batch.batchStatus.F')}}</el-tag>
          <el-tag v-else-if="scope.row.status === 'K'" size="mini">{{$t('batch.batchStatus.K')}}</el-tag>
          <el-tag v-else-if="scope.row.status === 'S'" size="mini">{{$t('batch.batchStatus.S')}}</el-tag>
          <el-tag v-else-if="scope.row.status === 'U'" size="mini">{{$t('batch.batchStatus.U')}}</el-tag>
          <el-tag v-else size="mini" type="success">{{$t('batch.batchStatus.O')}}</el-tag>
        </template>         
      </el-table-column> 
      <el-table-column prop="begTm" :label="$t('datePicker.start')" :formatter="formatTime" header-align="center" align="center"/>
      <el-table-column prop="endTm" :label="$t('datePicker.end')" :formatter="formatTime" header-align="center" align="center"/>
      <el-table-column prop="elapsedTm" label="elapsed time" header-align="center" align="center"/>
     <!--
      <el-table-column prop="totalCnt" label="total cnt" header-align="center" align="center" width="80"/>
      <el-table-column prop="succCnt" label="succ cnt" header-align="center" align="center" width="80"/>
      <el-table-column prop="failCnt" label="fail cnt" header-align="center" align="center" width="80"/>
     -->
      <!--
      <el-table-column prop="tmSmp" :label="$t('batch.tmsmp')" header-align="center" align="center"/>
      <el-table-column prop="updOpr" :label="$t('batch.oper')" header-align="center" align="center">
       -->
      </el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="queryHandle(scope.row.id)">{{$t('batch.query')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  </el-dialog>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
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
        batchName: '',
        status: '',
        name: ''
      },
      logVisible: false,
      visible: false,
    }
  },
  components: {
    Log
  },
  methods: {
    init() {
      this.visible = true;
      this.getDataList();
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
    },
    formatTime(row, column) {
        let time = row[column.property];
        if( !time ) {
          return time;
        }
        return time.substr(0,4) + '-' + time.substr(4,2) + '-' + time.substr(6,2) + ' ' +
              time.substr(8,2) + ':' + time.substr(10,2) + ':' + time.substr(12,2);
    },
  }


}
</script>
