<template>
  <el-dialog :visible.sync="visible" :title="$t('batch.flowcharts')" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose"	>
  <div class="g6-wrapper">
    <div id="mountNode"></div>
  </div>
  </el-dialog>
</template>
<script type='text/ecmascript-6'>
import G6 from "@antv/g6";
import dagre from "dagre"
// import g6Data from "./g6Data.js";
export default {
  components: {},
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleClose(done) {
    },
    init() {
      this.visible = true;
      this.$nextTick(() => {
        // 得到流程图绘制对象
        var g = new dagre.graphlib.Graph();
        /**
         * g.setDefaultEdgeLabel不能省去，否则会报错
         * Error in nextTick: "TypeError: Cannot set property 'points' of undefined"
         */
        g.setDefaultEdgeLabel(function() {
          return {};
        });
        g.setGraph({
          rankdir: "TB" //控制方向top-bottom
        });
        //绘制节点
        g6Data.nodes.forEach(node => {
          node.label = node.id;
          g.setNode(node.id, {
            width: 150,
            height: 40
          });
        });
        //绘制连接
        g6Data.edges.forEach(edge => {
          g.setEdge(edge.source, edge.target);
        });
        dagre.layout(g);
        var coord = 0;
        //g.nodes()返回图中节点的 id 数组
        g.nodes().forEach(function(node, i) {
          coord = g.node(node);
          g6Data.nodes[i].x = coord.x;
          g6Data.nodes[i].y = coord.y;
        });
        //g.edges()返回图中所有的边
        g.edges().forEach(function(edge, i) {
          coord = g.edge(edge);
          g6Data.edges[i].startPoint = coord.points[0];
          g6Data.edges[i].endPoint = coord.points[coord.points.length - 1];
          g6Data.edges[i].controlPoints = coord.points.slice(
            1,
            coord.points.length - 1
          );
        });
        G6.registerNode(
          "operation",
          {
            drawShape: function drawShape(cfg, group) {
              var rect = group.addShape("rect", {
                attrs: {
                  x: -75,
                  y: -20,
                  width: 150,
                  height: 40,
                  radius: 10,
                  stroke: "#000", //元素的边框颜色
                  // fill: "blue", //元素的填充色
                  fillOpacity: 0.7,
                  lineWidth: 1
                }
              });
              return rect;
            }
          },
          "single-shape"
        );
        var graph = new G6.Graph({
          container: "mountNode", //图的 DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象
          width: 1000, //Number 指定画布宽度，单位为 'px'
          height: 1000, //Number 指定画布高度，单位为 'px'
          pixelRatio: 1,
          // fitView: "tc",
          /**
           * 指当前图的事件模式，一个mode可能包含多个behavior。通过在图上切换mode，可以切换当前事件对应的行为。
           */
          modes: {
            default: [
              "drag-canvas", //拖拽画布
              {
                type: "tooltip", //节点文本提示
                formatText(model) {
                  //格式化函数，可以返回文本或者 html
                  return model.id;
                }
              },
              // {
              //   type: "activate-relations", //当鼠标移到某节点时，突出显示该节点以及与其直接关联的节点和连线。
              //   trigger: "mouseenter", //触发事件 可以是 mousenter : 鼠标移入时触发，也可以是 click ：鼠标点击时触发。
              //   activeState: "active" //活跃节点状态。当行为被触发，需要被突出显示的节点和边都会附带此状态，默认值为 active
              // }
            ]
          },
          defaultNode: {
            shape: "operation",
            labelCfg: {
              style: {
                fill: "#000",
                fontSize: 14,
                // fontWeight: "bold"
              }
            }
          },
          defaultEdge: {
            shape: "polyline"
          },
          edgeStyle: {
            default: {
              endArrow: true,
              lineWidth: 1,
              stroke: "#ccc"
            }
          }
        });
        graph.data(g6Data);
        graph.render();
        console.log("==>", graph);
        // graph.fitView();
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.g6-wrapper {
  width: 1000px;
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
</style>
