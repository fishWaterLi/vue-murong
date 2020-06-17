<template>
  <el-dialog size="small"  :visible.sync="visible" :title="$t('normal.log')" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true"	>
    <div>
      <el-form :model="dataForm" size="small" ref="dataForm" label-width="150px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="ID:" >
            <el-input :readonly="true" v-model="dataForm.id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('batch.batchInstances')">
            <el-input :readonly="true" v-model="dataForm.instId"></el-input>
          </el-form-item>              
        </el-col>      
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('name.adapter')">
            <el-input :readonly="true" v-model="dataForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('desc.adapter')">
            <el-input :readonly="true" v-model="dataForm.desc"></el-input>
          </el-form-item>
        </el-col>            
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('exec.info.adapter')">
            <el-input type="textarea" :rows="3" :readonly="true" v-model="dataForm.execInfo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>    
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('exec.log.adapter')">
            <el-input type="textarea" :rows="10"  :readonly="true" v-model="dataForm.execMsg"></el-input>
          </el-form-item>
        </el-col>   
      </el-row>     
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('startTime.adapter')">
            <el-input :readonly="true" v-model="dataForm.begTm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('endTime.adapter')">
            <el-input :readonly="true" v-model="dataForm.endTm"></el-input>
          </el-form-item>              
        </el-col>      
      </el-row>   
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('status.adapter')">
            <el-select :disabled="true" v-model="dataForm.status">
              <el-option value="S" :label="$t('batch.batchStatus.S')"/>
              <el-option value="K" :label="$t('batch.batchStatus.K')"/>
              <el-option value="F" :label="$t('batch.batchStatus.F')"/>
              <el-option value="P" :label="$t('batch.batchStatus.P')"/>
              <el-option value="U" :label="$t('batch.batchStatus.U')"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('result.adapter')">
            <el-input :readonly="true" v-model="dataForm.execResult"></el-input>
          </el-form-item>              
        </el-col>                
      </el-row>   
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('batchNames.adapter')">
            <el-input :readonly="true" v-model="dataForm.batNam"></el-input>
          </el-form-item>              
        </el-col>  
        <el-col :span="12">
          <el-form-item :label="$t('module.adapter')">
            <el-input :readonly="true" v-model="dataForm.moduleName"></el-input>
          </el-form-item>              
        </el-col>      
      </el-row>   
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('id.adapter')">
            <el-input :readonly="true" v-model="dataForm.taskId"></el-input>
          </el-form-item>
        </el-col>
        <!--
        <el-col :span="12">
          <el-form-item label="totalCnt:">
            <el-input :readonly="true" v-model="dataForm.totalCnt"></el-input>
          </el-form-item>
        </el-col>
        -->
      </el-row>
      <!--
      <el-row>
        <el-col :span="12">
          <el-form-item label="succCnt:">
            <el-input :readonly="true" v-model="dataForm.succCnt"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="failCnt:">
            <el-input :readonly="true" v-model="dataForm.failCnt"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      -->
      </el-form>
    </div>
    <template slot="footer">
      <el-button @click="visible = false">{{$t('close')}}</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: '',
        instId: '',
      }
    }
  },
  methods: {
    init (batchInstId, name) {
      this.visible = true
      this.$nextTick(() => {
        this.dataForm = {}
        // this.$refs['dataForm'].resetFields()
        this.$axios.post(
          '/batch/taskinst/info',
          {'batchInstId': batchInstId, 'name': name}
        ).then(res => {
          this.dataForm = res.data;
          this.dataForm.begTm = this.formatTime(this.dataForm.begTm);
          this.dataForm.endTm = this.formatTime(this.dataForm.endTm);
        })    
      })
    },
    formatTime(value) {
        let time = value;
        if( !time ) {
          return time;
        }
        return time.substr(0,4) + '-' + time.substr(4,2) + '-' + time.substr(6,2) + ' ' +
              time.substr(8,2) + ':' + time.substr(10,2) + ':' + time.substr(12,2);
    },
  }

}
</script>
