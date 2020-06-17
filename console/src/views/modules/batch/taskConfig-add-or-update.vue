<template>
  <el-dialog :visible.sync="visible" title="Task Config" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true"	>
    <div>
      <el-form size="mini" ref="dataForm" label-width="100px">
          <el-row>
            <el-form-item label="batch name:" >
              <el-input :readonly="readonly" v-model="dataForm.batchNam"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="task name:" >
              <el-input :readonly="readonly" v-model="dataForm.taskNam"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="est time(m):" >
              <el-input :readonly="readonly" v-model="dataForm.estTime"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="total sql:" >
              <el-input :readonly="readonly" type="textarea" :rows="5" v-model="dataForm.statTotalSql"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="succ sql:" >
              <el-input :readonly="readonly" type="textarea" :rows="5" v-model="dataForm.statSuccSql"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="fail sql:" >
              <el-input :readonly="readonly" type="textarea" :rows="5" v-model="dataForm.statFailSql"></el-input>
            </el-form-item>
          </el-row>
      </el-form>
    </div>
    <template slot="footer">
      <el-button size="mini"  @click="visible = false">{{$t('close')}}</el-button>
      <el-button size="mini" type="primary"  @click="submitHandle">{{$t('confirm')}}</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      readonly: false,
      dataForm: {
        id: '',
        batchNam: '',
        taskNam: '',
        status: '1',
        estTime: '',
        statTotalSql: '',
        statSuccSql: '',
        statFailSql: '',
      },
    }
  },
  methods: {
    init (data) {
      this.visible = true
      this.$nextTick(() => {
          if( data ) {
             this.dataForm = data;
          } else {
             this.dataForm = {};
             this.$refs['dataForm'].resetFields();
          }
      });
    },
    submitHandle () {
      this.$axios.post(
        (!this.dataForm.id ? '/batch/taskconfig/add' : '/batch/taskconfig/update'),
        {
         'id': this.dataForm.id,
         'batchNam': this.dataForm.batchNam,
         'taskNam': this.dataForm.taskNam,
         'status': this.dataForm.status,
         'estTime': this.dataForm.estTime,
         'statTotalSql': this.dataForm.statTotalSql,
         'statSuccSql': this.dataForm.statSuccSql,
         'statFailSql': this.dataForm.statFailSql,
         }
      ).then(res => {
        this.$message.success(this.$i18n.t('normal.task') + this.dataForm.taskNam + this.$i18n.t('batch.make.success'))
        this.visible = false;
        this.$emit('refreshDataList');
      })
    }

  }

}
</script>
