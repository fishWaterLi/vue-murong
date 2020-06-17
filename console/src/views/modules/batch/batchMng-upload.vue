<template>
  <el-dialog :visible.sync="visible" :title="$t('batch.upload')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
      <!-- <el-form-item prop="name" label="名称">
        <el-input v-model="dataForm.name" placeholder="名称"/>
      </el-form-item> -->
      <el-upload
        class="upload-demo"
        :action="url"
        ref="upload"
        :before-upload="beforeUpload"
        :limit="1"
        :on-success="handleSuccess"
        :data="dataForm"
        accept=".zip"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">{{$t('select.file')}}</el-button>
        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
        <div slot="tip" class="el-upload__tip">{{$t('upload.limit')}}</div>
      </el-upload>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      url: '',
      dataForm: {
        name: ''
      }
    }
  },
  computed: {
    dataRule () {
      return {
        name: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.visible = true
      this.url = `${window.SITE_CONFIG['apiURL']}batch/batinf/upload`
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.$refs.upload.clearFiles();
      })
    },
    // 获取信息
    getInfo () {
      this.$axios.get(`/sys/dept/${this.dataForm.id}`).then(res => {
        this.dataForm = {
          ...this.dataForm,
          ...res
        }
        if (this.dataForm.pid === '0') {
          return this.deptListTreeSetDefaultHandle()
        }
        this.$refs.deptListTree.setCurrentKey(this.dataForm.pid)
      }).catch(() => {})
    },
    submitUpload() {
      this.$refs.upload.submit();
    },    
    beforeUpload(file) {
      console.log('file.type:' + file.type)
      /**
      if( file.type != 'application/zip') {
         this.$message.error(this.$i18n.t('upload.pattern'))
         return false
      }
      */
      if( file.size / 1024 / 1024 > 10 ) {
         this.$message.error(this.$i18n.t('upload.size'))
         return false
      }
    },
    handleSuccess(res) {
      if( res.code != 0 ) {
        this.$message.error(this.$i18n.t('exception.error') + res.msg)
        return false   
      } else {
        this.$message.success(this.$i18n.t('prompt.success'))
        this.visible = false
        this.$emit('refreshDataList')
      }
    },
    dataFormSubmitHandle() {
      // if( this.dataForm.name === '' ) {
      //   this.$message.error('名称必须输入')
      //   return
      // }
      this.$refs.upload.submit();
    }

  }

}
</script>
