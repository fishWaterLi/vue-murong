<template>
  <el-dialog :visible.sync="visible" :title="$t('batch.batchConfig')" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true"	>
    <div>
      <el-form size="mini" ref="dataForm" label-width="80px">
          <el-row>
            <el-form-item :label="$t('batch.name')" >
              <el-input :readonly="true" v-model="dataForm.name"></el-input>
            </el-form-item>
          </el-row>
          <el-row>             
          <el-form-item :label="$t('batch.cronTime')" >
            <el-input v-model="dataForm.cronExpr" :placeholder="$t('schedule.placeholder')" @change="cronExprChange"></el-input>
            <span>{{$t('schedule.cronExpressionExplain')}}</span>
          </el-form-item>    
          </el-row>       
          <el-collapse >
            <el-collapse-item :title="$t('schedule.createCronExpression')" name="1">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('batch.cronPeroid')" >
                    <el-select v-model="period" :placeholder="$t('batch.cronPeroid')" @change="periodChangeHandle">
                      <el-option value="D" :label="$t('batch.cronPeroidDay')"/>
                      <el-option value="W" :label="$t('batch.cronPeroidWeek')"/>
                      <el-option value="M" :label="$t('batch.cronPeroidMonth')"/>
                      <el-option value="Y" :label="$t('batch.cronPeroidYear')"/>
                    </el-select>  
                  </el-form-item>  
                </el-col>
                <el-col :span="6"> 
                  <el-form-item :label="$t('batch.cronPeroidMonth')" >
                  <el-select v-model="month" :disabled="!monthEnabled" :placeholder="$t('batch.cronPeroidMonth')">
                    <el-option v-for="item in months"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>            
                  </el-form-item>               
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('batch.cronPeroidWeek')" >
                  <el-select v-model="week" :disabled="!weekEnabled" :placeholder="$t('batch.cronPeroidWeek')">
                    <el-option v-for="item in weeks"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>            
                  </el-form-item>             
                </el-col>             
              </el-row>     
              <el-row>           
                <el-col :span="8">
                  <el-form-item :label="$t('batch.cronPeroidDay')" >
                  <el-select v-model="day" :disabled="!dayEnabled" :placeholder="$t('batch.cronPeroidDay')">
                    <el-option v-for="item in days"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>            
                  </el-form-item>                
                </el-col>       
                <el-col :span="8">
                  <el-form-item :label="$t('batch.cronPeroidHour')" >
                  <el-select v-model="hour" :placeholder="$t('batch.cronPeroidHour')">
                    <el-option v-for="item in hours"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>            
                  </el-form-item>                 
                </el-col>    
                <el-col :span="8">
                  <el-form-item :label="$t('batch.cronPeroidMinute')" >
                  <el-select v-model="minute" :placeholder="$t('batch.cronPeroidMinute')">
                    <el-option v-for="item in minutes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>            
                  </el-form-item>    

                </el-col>                     
              </el-row>    
              <el-row>
                <el-col>
                  <el-button size="small" @click="generateCronExpr()">{{$t('create')}}</el-button>
                </el-col>
              </el-row> 
            </el-collapse-item>
          </el-collapse>          

         
      </el-form>
    </div>
    <template slot="footer">
      <el-button size="mini"  @click="visible = false">{{$t('close')}}</el-button>
      <el-button size="mini" type="primary" :disabled="submitFlag" @click="submitHandle">{{$t('confirm')}}</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      submitFlag: true,
      dataForm: {
        name: '',
        cronExpr: '',
      },
      minute: 0,
      hour: 0,
      day: 1,
      month: 'JAN',
      week: 'SUN',
      period: 'D',
      minutes:[],
      hours:[],
      days:[
      ],
      months:[
        {'label':'JAN', 'value':'JAN'},
        {'label':'FEB', 'value':'FEB'},
        {'label':'MAR', 'value':'MAR'},
        {'label':'APR', 'value':'APR'},
        {'label':'MAY', 'value':'MAY'},
        {'label':'JUN', 'value':'JUN'},
        {'label':'JUL', 'value':'JUL'},
        {'label':'AUG', 'value':'AUG'},
        {'label':'SEP', 'value':'SEP'},
        {'label':'OCT', 'value':'OCT'},
        {'label':'NOV', 'value':'NOV'},
        {'label':'DEC', 'value':'DEC'},
      ],
      weeks: [
        {'label':'SUN', 'value':'SUN'},
        {'label':'MON', 'value':'MON'},
        {'label':'TUE', 'value':'TUE'},
        {'label':'WED', 'value':'WED'},
        {'label':'THU', 'value':'THU'},
        {'label':'FRI', 'value':'FRI'},
        {'label':'SAT', 'value':'SAT'}
      ],
      dayEnabled: false,
      monthEnabled: false,
      weekEnabled: false,    
    }
  },
  methods: {
    init () {
      this.minutes = [];
      for( let i = 0; i < 60; i++ ) {
        this.minutes.push({'label':i, 'value':i});
      }       
      this.hours = [];
      for( let i = 0; i < 24; i++ ) {
        this.hours.push({'label':i, 'value':i});
      } 

      this.days = [];
      for( let i = 1; i <= 31; i++ ) {
        this.days.push({'label':i, 'value':i});
      }    
   
      this.visible = true
      this.$nextTick(() => {
        // Object.assign(this.$data, this.$options.data());
        this.$refs['dataForm'].resetFields();
        this.$axios.post(
          '/batch/batinf/info',
          {'name': this.dataForm.name}
        ).then(res => {
          this.dataForm = res.data;
        })  
      })
    },
    cronExprChange() {
      this.submitFlag = false
    },
    generateCronExpr() {

      let cronExpr = '0 ' + this.minute + ' ' + this.hour ;
      if( this.period === 'D' ) {
        cronExpr = cronExpr + '  * * ?';
      } else if ( this.period == 'M') {
        cronExpr = cronExpr + ' ' + this.day + ' * ?';
      } else if ( this.period == 'W') {
        cronExpr = cronExpr + ' * * ' + this.week;
      } else if ( this.period == 'Y') {
        cronExpr = cronExpr + ' ' + this.day + ' ' + this.month + ' ?';
      } else {
        cronExpr = cronExpr + ' * * ?';      
      }

      this.dataForm.cronExpr = cronExpr;
    },
    periodChangeHandle() {
      let period = this.period
      if( period === "D") {
        this.weekEnabled = false;
        this.monthEnabled = false;
        this.dayEnabled = false;
      } else if( period === "W") { 
        this.weekEnabled = true;
        this.monthEnabled = false;
        this.dayEnabled = false;
      } else if( period === "M") { 
        this.weekEnabled = false;
        this.monthEnabled = false;
        this.dayEnabled = true;
      } else if( period === "Y") {
        this.weekEnabled = false;
        this.monthEnabled = true;
        this.dayEnabled = true;
      } else {
        this.$message.error("invalid perid:" + period);
      }
    },
    submitHandle () {
      this.$axios.post(
        '/batch/batinf/update',
        {'name': this.dataForm.name, 'cronExpr': this.dataForm.cronExpr}
      ).then(res => {
        this.$message.success(this.$i18n.t('normal.task') + this.dataForm.name + this.$i18n.t('batch.make.success'))
        this.visible = false;
      })    
    }

  }

}
</script>
