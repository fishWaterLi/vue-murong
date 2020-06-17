<template>
  <el-dialog :fullscreen="fullscreen" :visible.sync="visible" :title="$t('batch.flowcharts')" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose"	>
    <div>
      <div>
        <el-row>
            <el-col :span="21">
            <div class="tag-group">
              <el-tag color="#DEE9FF"  size="small"> {{$t('notStart')}} </el-tag>
              <el-tag color="#CCFF33"  size="small"> {{$t('batch.batchStatus.P')}} </el-tag>
              <el-tag color="#7CFC00"  size="small"> {{$t('batch.batchStatus.S')}} </el-tag>
              <el-tag color="#FF0099"  size="small"> {{$t('batch.batchStatus.F')}} </el-tag>
              <el-tag color="#CC66FF"  size="small"> {{$t('batch.batchStatus.K')}} </el-tag>
              <el-tag color="#FFA042"  size="small"> {{$t('notrun')}} </el-tag>
              <el-tag color="#cdea83"  size="small"> UKN </el-tag>
            </div>
            </el-col>
            <el-col :span="3">
                <el-button type="warning" @click="handleClose">{{$t('close')}}</el-button>
            </el-col>
        </el-row>
      
        <el-row>
        <span style="color:#409EFF">{{$t('batch.batchNames')}}:{{batchInst.name}} {{$t('batch.batchInstance')}}:{{batchInst.id}} {{$t('batch.tmsmp')}}:{{batchInst.tmSmp}} {{$t('batch.batchStatus.status')}}:{{batchInst.status}}</span>
        </el-row>
      </div>
      <div style="padding: 10px">
        <el-button type="primary" size="small" v-if="manageEnable" @click="startHandle()">{{$t('batch.start')}}</el-button>
        <!-- <el-button type="primary" size="small" v-if="manageEnable" @click="restartHandle()">{{$t('rerun')}}</el-button>
        <el-button type="primary" size="small" v-if="manageEnable" @click="skipHandle()">{{$t('batch.batchStatus.K')}}</el-button> -->
        <el-button type="primary" size="small" v-if="autoRefresh" @click="refreshHandle()">{{$t('stop.refresh')}}</el-button>
        <el-button type="primary" size="small" v-if="!autoRefresh" @click="refreshHandle()">{{$t('auto.refresh')}}</el-button>

        <el-divider direction="vertical"></el-divider>
        <el-button-group>
          <el-button v-for="(graphData,index) in graphDataList" size="small" :type="buttonIndex===index?'primary' :''" :key="index"  @click="drawFlow(index)">{{graphData.name}}</el-button>
        </el-button-group>
      </div>

      <div class="g6-wrapper">  
        <div id="container" ></div>
      </div>
    </div>
    <log v-if="logVisible" ref="log"/>

  </el-dialog>
</template>
<script type='text/ecmascript-6'>
import G6 from "@antv/g6";
import Log from './batchMng-log'

export default {
  components: {Log},
  data() {
    return {
      batchName: '',
      manageEnable: false,
      // 批量实例
      batchInst: '',
      visible: false,
      fullscreen: true, 
      buttonIndex: 0,
      graph: '',
      graphDataList: '',
      selectNode: '',
      logVisible: false, 
      norunTaskList:[],
      autoRefresh: true,
      processTaskStatusing: false,
    };
  },
  mounted() {
    // this.init();
  },
  methods: {
    stopRefreshHandle() {
      if( this.TIMERS['batchTimer'] ) {
        clearTimeout(this.TIMERS['batchTimer']);
      }
    },
    handleClose(done) {
      if( this.TIMERS['batchTimer'] ) {
        clearTimeout(this.TIMERS['batchTimer']);
      }
      if( this.graph ) {
        try {
          this.graph.destroy();
        } catch(error) {
        }
      }
      this.visible = false;
    },
    contextMenuClick(id) {
      if( !this.selectNode ) {
        return;
      }
      let model = this.selectNode.getModel();
      console.log('model:' + JSON.stringify(model));
      // if( !model.task ) {
      //   return;
      // }
      if( id === "query") {
        let msg = "<br/><strong>name</strong>: " + model.task.name + 
            "<br/><strong>desc</strong>: " + model.task.remark +
            "<br/><strong>cmd</strong>: " + model.task.cmd.name  + 
            "<br/><strong>params</strong>: " + model.task.cmd.params.join('|');
        this.$alert(msg, 'TaskInfo', {
          dangerouslyUseHTMLString: true
        });
      } else if (id === "log") {
        if( !this.batchInst ) {
          this.$message.success(this.$i18n.t('batch.notRun'));
          return;
        }        

        this.logVisible = true;
        this.$nextTick(() => {
          this.$refs.log.init(this.batchInst.id, model.task.name);
        })
      } else if (id === "rerun") {
        if( !this.batchInst ) {
          this.$message.success(this.$i18n.t('batch.notRun'));
          return;
        }        

        let name = model.task.name;
        this.$confirm(this.$i18n.t('normal.rerun.orNot') + name, this.$i18n.t('note'), {
          confirmButtonText: this.$i18n.t('confirm'),
          cancelButtonText: this.$i18n.t('cancel'),
          type: 'warning'
        }).then(() => {
          this.$axios.post(
            '/batch/taskinst/rerun',
            {'batchInstId': this.batchInst.id, 'name': name}
          ).then(res => {
            this.$message.success(this.$i18n.t('normal.rerun.task') + name + this.$i18n.t('exec.success'))
          })
        })
      } else if ( id === "skip") {
        if( !this.batchInst ) {
          this.$message.success(this.$i18n.t('batch.notRun'));
          return;
        }
        let name = model.task.name;
        this.$confirm(this.$i18n.t('skip.orNot') + name, this.$i18n.t('note'), {
          confirmButtonText: this.$i18n.t('confirm'),
          cancelButtonText: this.$i18n.t('cancel'),
          type: 'warning'
        }).then(() => {
          this.$axios.post(
            '/batch/taskinst/skip',
            {'batchInstId': this.batchInst.id, 'name': name}
          ).then(res => {
            this.$message.success(this.$i18n.t('skip.task') + name + this.$i18n.t('exec.success'));
          })
        })
      } else if( id === "norun" ) {
        if( this.batchInst ) {
          this.$message.success(this.$i18n.t('running.not.modify'));
          return;
        }
        let name = model.label;

        this.$confirm(this.$i18n.t('not.run') + name, this.$i18n.t('note'), {
          confirmButtonText: this.$i18n.t('confirm'),
          cancelButtonText: this.$i18n.t('cancel'),
          type: 'warning'
        }).then(() => {
          this.graph.updateItem(this.selectNode, {
            style: {
              fill: "#FFA042"
            }
          });
          
          this.norunTaskList.push(model);
          // this.$axios.post(
          //   '/batch/taskinst/norun',
          //   {'batchName': this.batchName, 'moduleName': moduleName, 'taskId': model.id}
          // ).then(res => {
          //   this.$message.success('不跑任务:' + name + ' 执行成功');
          // })
        })
      } else if( id === "cancel_norun" ) {
        // 取消不运行
        var index = this.norunTaskList.indexOf(model);
        if (index > -1) {
          this.splice(index, 1);
        }
      } else {
        this.$message.info("invalid id:" + id);
      }

    },
    createConextMenu() {
      var contextMenu = document.getElementById('contextMenu');
      if( contextMenu && contextMenu.parentNode ) {
         contextMenu.parentNode.removeChild(contextMenu);
      }
      const conextMenuContainer = document.createElement('ul');
      conextMenuContainer.hidden = true;
      conextMenuContainer.id = 'contextMenu';      
      this.createConextMenuItem(conextMenuContainer, 'query', this.$i18n.t('batch.info'));
      this.createConextMenuItem(conextMenuContainer, 'log', this.$i18n.t('show.log'));
      this.createConextMenuItem(conextMenuContainer, 'rerun', this.$i18n.t('rerun'));
      this.createConextMenuItem(conextMenuContainer, 'skip', this.$i18n.t('flow.contextMenu.skip'));
      this.createConextMenuItem(conextMenuContainer, 'norun', this.$i18n.t('notrun'));
      return conextMenuContainer;
    },
    createConextMenuItem(conextMenuContainer,menuId,menuTitle) {
        const queryLi = document.createElement('li');
        queryLi.innerText = menuTitle;
        let self = this;
        queryLi.onclick = function() {
          self.contextMenuClick(menuId);
        }
        conextMenuContainer.appendChild(queryLi);
    },
    refreshHandle() {
      this.autoRefresh = !this.autoRefresh;
      if( !this.autoRefresh ) {
        if( this.TIMERS['batchTimer'] ) {
          clearTimeout(this.TIMERS['batchTimer']);
        }
      } else {
        // 定时获取任务状态
        this.drawFlow(this.buttonIndex);
        this.TIMERS['batchTimer'] = setInterval(this.getTaskStatus,10000)
      }
    },
    startHandle() {
      let name = this.batchName;
      // 启动
      this.$confirm(this.$i18n.t('batch.begin.orNot') + name, this.$i18n.t('note'), {
        confirmButtonText: this.$i18n.t('confirm'),
        cancelButtonText: this.$i18n.t('cancel'),
        type: 'warning'
      }).then(() => {
        let norunTasks = '';
        this.norunTaskList.forEach(model => {
          norunTasks = norunTasks + model.name + "|";
        });
        this.$axios.post(
          '/batch/batinst/run',
          {'name': name, 'norunTasks': norunTasks}
        ).then(res => {
          this.$message.success(this.$i18n.t('batch.tasks') + name + this.$i18n.t('batch.begin.success'))
        })
      })
    },
    restartHandle() {
      // 启动
      if( !this.batchInst ) {
        this.$message.success('batchInst is empty');
        return;
      }

      if( this.batchInst.status != 'F' ) {
        this.$message.success('batchInst"s status invalid');
        return;
      }

      let id = this.batchInst.id;
      this.$confirm(this.$i18n.t('batch.rerun.orNot') + this.batchName, this.$i18n.t('note'), {
        confirmButtonText: this.$i18n.t('confirm'),
        cancelButtonText: this.$i18n.t('cancel'),
        type: 'warning'
      }).then(() => {
        this.$axios.post(
          '/batch/batinst/rerun',
          {'batchInstId': id}
        ).then(res => {
          this.$message.success(this.$i18n.t('batch.tasks') + this.batchName + this.$i18n.t('batch.rerun.success'))
        })
      })
    },    
    skipHandle() {
      // 跳过
      if( !this.batchInst ) {
        this.$message.success('batchInst is empty');
        return;
      }
      if( this.batchInst.status != 'F' ) {
        this.$message.success('batchInst"s status invalid');
        return;
      }      
      let id = this.batchInst.id;
      this.$confirm(this.$i18n.t('batch.skip.orNot') + this.batchName, this.$i18n.t('note'), {
        confirmButtonText: this.$i18n.t('confirm'),
        cancelButtonText: this.$i18n.t('cancel'),
        type: 'warning'
      }).then(() => {
        this.$axios.post(
          '/batch/batinst/skip',
          {'batchInstId': id}
        ).then(res => {
          this.$message.success(this.$i18n.t('batch.tasks') + this.batchName + this.$i18n.t('batch.skip.success'))
        })
      })
    },  
    resetData() {
      Object.assign(this.$data, this.$options.data());
    },
    init(batchName) {
      // console.log(this.$root.$data);
      this.batchName = batchName;
      this.visible = true;
      const self = this;
      this.$axios.post('/batch/batinf/graph',
        {'name': batchName}
      ).then(res => {
        this.graphDataList = this.preProcData(res.data)
        this.drawFlow(0);
      })     

      if( this.TIMERS['batchTimer'] ) {
        clearTimeout(this.TIMERS['batchTimer']);
      }

      // 定时获取任务状态
      if( this.autoRefresh ) {
        this.TIMERS['batchTimer'] = setInterval(this.getTaskStatus,10000)
      }
    },  
    preProcData(graphDataList) {
        graphDataList.forEach(graphData => {
          let selfGraphData = graphData;
          selfGraphData.nodes.forEach(element => {
            element.y = element.y + 20;
            if( element.nodeName === "domodule" ) {
              element.shape = "ellipse";
              element.size = [100,40];
              // element.img = `${window.SITE_CONFIG['apiURL']}icon/module.png`;
            } else if(element.nodeName === "concurrent" ) {
              element.shape = "circle";
              // element.img = `${window.SITE_CONFIG['apiURL']}icon/concurrent_s.png`;
              element.size = [40,40];
              let id = element.id + "_1";
              let element1 = this.findNodeData(selfGraphData.nodes, id);
              element1.shape = "circle";
              // element1.img = `${window.SITE_CONFIG['apiURL']}icon/concurrent_e.png`;
              element1.size = [40,40];
            } else if(element.nodeName === "dotask" ) {
              element.shape = "rect";
              element.size = [80,40];
              // element.img = `${window.SITE_CONFIG['apiURL']}icon/task.png`;
              if( element.label === "Start batch") {
                element.shape = "rect";
                element.size = [80,40];
                // element.style = {fill: '#76EEC6'};
                // element.img = `${window.SITE_CONFIG['apiURL']}icon/start.png`;
              }
            } else if(element.nodeName === "dowait" ) {
              element.shape = "rect";
              element.size = [80,40];
              // element.img = `${window.SITE_CONFIG['apiURL']}icon/wait.png`;
            }
          });
        });
        return graphDataList;
    },
    findNodeData(nodes, id) {
      for(let index in nodes) {
        let element = nodes[index];
        if( element.id === id ) {
          return element;
        }
      }
      return null;
    },  
    restoreGraphStatus() {
        this.graph.setAutoPaint(false);
        const nodes = this.graph.getNodes();
        this.graph.setAutoPaint(false);
        nodes.forEach(node => {
          if( this.norunTaskList.indexOf(node.getModel()) != -1 ) {
            return;
          }
          this.graph.updateItem(node, {
            style: {
              fill: '#DEE9FF'
            }
          });
        });
        this.graph.paint();
        this.graph.setAutoPaint(true);
    },
    getTaskStatus() {
      if( this.processTaskStatusing ) {
         console.log("processTaskStatusing:" + this.processTaskStatusing);
         return;
      }
      console.log("batchInst:" + JSON.stringify(this.batchInst));
      // 获取任务状态
      // this.$axios.post('/batch/batinst/batchInstance',
      //   {'name': this.batchName}
      // ).then(res => {
      //   if( res.data ) {
      //     this.batchInst = res.data;
      //   } else {
      //     this.batchInst = '';
      //   }
      // });  

      if( !this.batchInst ) {
        this.restoreGraphStatus();
        return;
      }

      let graphData = this.graphDataList[this.buttonIndex];

      this.processTaskStatusing = true;
      this.$axios.post('/batch/taskinst/list1',
        {'batchInstId': this.batchInst.id}
      ).then(res => {
        this.processTaskStatusing = false;
        // this.graph.render();
        let dataList = res.data;
        this.restoreGraphStatus();
        this.graph.setAutoPaint(false);

        dataList.forEach(element=>{
          let node = this.graph.findById(element.taskId);

          if( !node ) {
            return;
          }
          if( graphData.name != element.moduleName ) {
            return;
          }
          //
          if( this.norunTaskList.indexOf(node.getModel()) != -1 ) {
            return;
          }

          // this.graph.setItemState(node, 'hover', true);
          let fill = 'red'; 
          if( element.status === 'P') {
            fill = '#CCFF33';
          } else if( element.status === 'S') {
            fill = '#7CFC00';
          } else if( element.status === 'F') {
            fill = '#FF0099';
          } else if( element.status === 'K') {
            fill = '#CC66FF';
          } else if( element.status === 'U') {
            fill = '#cdea83';
          }

          this.graph.updateItem(node, {
            style: {
              fill: fill
            }
          });
          
        })
        this.graph.paint();
        this.graph.setAutoPaint(true);

      })           
    },

    drawFlow(index) {
      this.buttonIndex = index;
      let graphData = this.graphDataList[index];
      if( this.graph ) {
        try {
          this.graph.destroy();
        } catch(error) {
        }
      }
      this.drawGraph(graphData);
      this.getTaskStatus();
    },
    drawGraph(graphData) {
        const conextMenuContainer = this.createConextMenu();
        document.getElementById('container').appendChild(conextMenuContainer);

        const width = 1300;
        const height = 1000;
        const graph = new G6.Graph({
          container: 'container',
          // fitView: true,
          // fitViewPadding: 20,
          width,
          height,
          defaultNode: {
            size: [ 80, 40 ],
            shape: 'rect',
            style: {
              fill: '#DEE9FF',
              stroke: '#5B8FF9'
            },
            labelCfg: {
              style: {
                fontSize: 12,
              },
            }
          },
          defaultEdge: {
            style: {
              endArrow: true,
              stroke: '#b5b5b5',
              lineAppendWidth: 3 // Enlarge the range the edge to be hitted
            },
            labelCfg: {
              autoRotate: true,
              style: {
                // A white stroke with width 5 helps show the label more clearly avoiding the interference of the overlapped edge
                stroke: 'white',
                lineWidth: 5
              }
            }
          },
          nodeStateStyles: {
            hover: {
              lineWidth: 3,
              fillOpacity: 1
            }
          },
          modes: {
            default: [ 
              // 'drag-canvas', 'drag-node',
              // {
              //   type: 'tooltip',
              //   formatText(model) {
              //     let text = "";
              //     if( "dotask" === model.nodeName ) {
              //       text = "cmd:" + model.task.cmd.name  + "<br/>" +
              //           "params:" + model.task.cmd.params.join('|');
              //     } else if ("domodule" === model.nodeName ) {
              //       text = "module:" + model.label;
              //     } else {
              //       text = 'label: ' + model.label
              //     }
              //     return text;
              //   },
              //   shouldUpdate: e => {
              //     return true;
              //   }
              // },            
             ],
            
          }
        });

        let self = this;
        graph.on('node:contextmenu', function(evt) {
          self.selectNode = evt.item;
          let model = self.selectNode.getModel();
          if( model.nodeName != "dotask" ) {
            conextMenuContainer.childNodes[0].hidden=true;
            conextMenuContainer.childNodes[1].hidden=true;
            conextMenuContainer.childNodes[2].hidden=true;
            conextMenuContainer.childNodes[3].hidden=true;
            // return;
          } else {
            conextMenuContainer.childNodes[0].hidden=false;
            conextMenuContainer.childNodes[1].hidden=false;
            conextMenuContainer.childNodes[2].hidden=false;
            conextMenuContainer.childNodes[3].hidden=false;            
          }
          conextMenuContainer.hidden = false;
          conextMenuContainer.style.left = evt.x + 'px';
          conextMenuContainer.style.top = evt.y + 'px';
        });

        graph.on('node:mouseleave', () => {
          conextMenuContainer.style.left = '-150px';
          conextMenuContainer.hidden = true;
        });

        graph.on('node:mouseenter', function(evt) {
          const node = evt.item;
          // const model = node.getModel();
          // model.oriLabel = model.label;
          graph.setItemState(node, 'hover', true);
          graph.updateItem(node, {
            labelCfg: {
              style: {
                fill: 'blue'
              }
            }
          });
        });

        graph.on('node:mouseleave', function(evt) {
          const node = evt.item;
          graph.setItemState(node, 'hover', false);
          graph.updateItem(node, {
            labelCfg: {
              style: {
                fill: '#555'
              }
            }
          });
        });

        graph.data(graphData);
        graph.render();
        this.graph = graph;

        // graph

    }
  }
};
</script>
<style lang='scss' scoped>
.g6-wrapper {
  width: 1300px;
  height: 1000px;
  border: 1px solid #999;
}
</style>
<style lang="scss">
.g6-wrapper {
  // 由于 G6 没有内置任何 tooltip 的样式，用户需要自己定义样式
  .g6-tooltip {
    padding: 10px 6px;
    color: #444;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #e2e2e2;
    border-radius: 4px;
  }
}
  #contextMenu {
    position: absolute;
    list-style-type: none;
    padding: 10px 8px;
    left: -150px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
  }
  #contextMenu li {
    cursor: pointer;
		list-style-type:none;
    list-style: none;
    margin-left: 0px;
  }
  #contextMenu li:hover {
    color: #aaa;
  }

.g6-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>
