<template>
  <d2-container class="mod-sys__user">
    <!-- {{$formatStr("hello {0}", ["world"]) }} -->
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" :placeholder="$t('batch.name')" clearable/>
      </el-form-item>
      <el-form-item :label="$t('batch.batchStatus.status')">
        <el-select v-model="dataForm.status" :placeholder="$t('batch.batchStatus.status')" clearable>
          <el-option value="S" :label="$t('batch.batchStatus.S')"/>
          <el-option value="T" :label="$t('batch.batchStatus.T')"/>
          <el-option value="K" :label="$t('batch.batchStatus.K')"/>
          <el-option value="P" :label="$t('batch.batchStatus.P')"/>
        </el-select>
      </el-form-item>        
      <el-form-item>
        <el-button @click="getDataList()">{{$t('query')}}</el-button>
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
      <el-table-column prop="id" label="ID" header-align="center" width="200" align="center"/>
      <el-table-column prop="name" :label="$t('batch.name')" header-align="center" align="center"/>
      <el-table-column prop="begTm" :label="$t('datePicker.start')" :formatter="formatTime" header-align="center" width="150" align="center"/>
      <el-table-column prop="endTm" :label="$t('datePicker.end')" :formatter="formatTime" header-align="center"  width="150" align="center"/>
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
      <!--
      <el-table-column prop="tmSmp" :label="$t('batch.tmsmp')" :formatter="formatTime" width="150" header-align="center" align="center"/>
      -->
      <el-table-column prop="updOpr" :label="$t('batch.oper')" header-align="center" align="center">
      </el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="queryFlowHandle(scope.row)">{{$t('flowchart')}}</el-button>
          <el-button type="text" size="mini" @click="queryHandle(scope.row)">{{$t('task')}}</el-button>
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

    <task-list v-if="taskListVisible" ref="taskList"/>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>

  </d2-container>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import TaskList from './batchHis-task-list'
import AddOrUpdate from './batchMng-add-or-update'

export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/batch/batinst/listHis',
        getDataListIsPage: true,
        deleteURL: '/batch/batinf/delete',
        deleteIsBatch: true,
      },
      dataForm: {
        name: '',
        status: ''
      },
      taskListVisible: false,
      addOrUpdateVisible: false,
    }
  },
  components: {
    TaskList,
    AddOrUpdate
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
    queryHandle(element) {
      this.taskListVisible = true;
      this.$refs.taskList.dataForm.batchInstId = element.id;
      this.$refs.taskList.dataForm.batchName = element.name;
      this.$nextTick(() => {
        this.$refs.taskList.init();
      })      
    },
    queryFlowHandle(element) {
        this.addOrUpdateVisible = true;
        // this.$refs.addOrUpdate.batchName = element.name;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.resetData();
          this.$refs.addOrUpdate.autoRefresh = false;
          this.$refs.addOrUpdate.batchInst = element;
          this.$refs.addOrUpdate.init(element.name);
        })       

    },        
  }

}
</script>
