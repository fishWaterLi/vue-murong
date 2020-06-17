<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('add') : $t('update')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">
      <el-form-item prop="usr_no" label="用户号">
        <el-input v-model="dataForm.usr_no" placeholder="用户号" />
      </el-form-item>
      <el-form-item prop="contract_no" label="合同号" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.contract_no" placeholder="合同号" />
      </el-form-item>
      <el-form-item prop="remark" label="备注" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.remark" placeholder="备注" />
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { debounce } from 'lodash'
  import { isEmail, isMobile } from '@/common/validate'
  export default {
    data() {
      return {
        visible: false,
        dataForm: {
          id: '',
          usr_no: '',
          license: '',
          contract_no: '',
          remark: ''
        }
      }
    },
    computed: {
      dataRule() {
        return {
          usr_no: [
            { required: true, message: this.$t('validate.required'), trigger: 'blur' }
          ],
          contract_no: [
            { required: true, message: this.$t('validate.required'), trigger: 'change' }
          ],
          remark: [
            { required: true, message: this.$t('validate.required'), trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      init() {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.getInfo()
        })
      },
      // 获取信息
      getInfo() {
        if (!this.dataForm.id) {
          return
        }
        this.$axios.get(`/pub/license/query.do?id=${this.dataForm.id}`).then(res => {
          this.dataForm = res.data
        }).catch(() => { })
      },
      // 表单提交
      dataFormSubmitHandle: debounce(function () {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) {
            return false
          }
          this.$axios.post(!this.dataForm.id ? '/pub/license/add.do' : '/pub/license/update.do', {
            ...this.dataForm
          }).then(res => {
            this.$message({
              message: this.$t('prompt.success'),
              type: 'success',
              duration: 500,
              onClose: () => {
                this.visible = false
                this.$emit('refreshDataList')
              }
            })
          }).catch(() => { })
        })
      }, 1000, { 'leading': true, 'trailing': false })
    }
  }
</script>

<style lang="scss">
.mod-sys__user {
  .dept-list {
    .el-input__inner,
    .el-input__suffix {
      cursor: pointer;
    }
  }
  .role-list {
    .el-select {
      width: 100%;
    }
  }
}
</style>
