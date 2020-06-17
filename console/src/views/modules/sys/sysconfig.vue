<template>
  <d2-container class="mod-sys__dept">
    <el-form size="mini" :model="dataForm">
      <el-form-item prop="batchAllowManual" label="Batch allow manual">
        <el-switch v-model="dataForm.batchAllowManual" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sysConfigHandle()">Confirm</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
        batchAllowManual: false
      }
    }
  },
  mounted() {
    this.init()
  },
  components: {
  },
  methods: {
    init() {
      this.$axios.post(
        '/sys/params/queryBatchAllowManual'
      ).then(res => {
        if( res.data ) {
           this.dataForm.batchAllowManual = res.data.value === "true"
        }
      })
    },
    sysConfigHandle() {
      this.$axios.post(
        '/sys/params/update',
        {'flag': this.dataForm.batchAllowManual}
      ).then(res => {
        this.$message.success("Success")
      })
    },
  }
}
</script>
