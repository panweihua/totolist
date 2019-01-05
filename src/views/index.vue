<template>
  <div id="totolist">
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="6"> 
                  <el-row :gutter="20">
                    <el-col :span="8">
                        <el-button size="mini" type="danger" round>等级:{{user.level}}</el-button>
                    </el-col>
                    <el-col :span="8">
                        <el-button size="mini" type="primary" round>经验:{{user.epx}}</el-button>
                    </el-col>
                    <el-col :span="8">
                        <el-button size="mini" @click="clearData" type="danger" round>重置</el-button>
                    </el-col>
                  </el-row>
                </el-col>  
                <el-col :span="6" :offset="3"><h4>任务清单</h4></el-col>
                <el-col :span="3" :offset="6">
                    <span style="display:inline-block">添加:</span><el-button type="primary" @click="editTaskShow = true" icon="el-icon-edit" circle></el-button>
                </el-col>
            </el-row> 
        </el-header>
        <el-main>
            <div v-if="list.length === 0">
                <p style="text-align:center">请点击右上角添加任务</p>
            </div>
            <div v-else>
                <div v-for="(item,index) in list">
                    <el-card class="box-card" shadow="hover">
                       <div slot="header" class="clearfix">
                           <el-row>
                               <el-col :span="3"><span>任务序列号：{{index}}</span></el-col>
                                <el-col :span="6" :offset="6"><span>{{item.name}}</span></el-col>
                                <el-col :span="3" :offset="6">
                                    <el-button type="success" @click='addScore(index,item)' icon="el-icon-check" size="mini" circle></el-button>
                                    <el-button type="danger" @click="cancelScore(index)" icon="el-icon-delete" size="mini" circle></el-button>
                                </el-col>
                           </el-row>
                        </div>
                        <div>
                            <el-row>
                                <el-col></el-col>
                                <el-col>{{item.content}}</el-col>
                            </el-row>
                            
                        </div>     
                    </el-card>
                </div>
            </div>
        </el-main>   
    </el-container>
    <el-dialog title="添加任务" :visible.sync = "editTaskShow" :before-close="handleClose">
            <div>
                <el-row>
                    <el-col><el-input placeholder="请输入" v-model="task.name" clearable><template slot="prepend">任务名称</template></el-input></el-col>
                </el-row>
                <el-row>
                    <el-col><el-input  placeholder="请输入内容" v-model="task.content"><template slot="prepend">任务内容</template></el-input></el-col>   
                </el-row>
                <el-row>
                    <el-col :span="6"><el-button type="primary"  >经验值</el-button></el-col>
                    <el-col :span="18"><el-input-number v-model.number="task.epx"  :min="1" :max="10" label="描述文字"><template slot="prepend">经验值</template></el-input-number></el-col>
                
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editTaskShow = false ;addTask()" >确定</el-button>
                <el-button @click="dialogVisible = false; cancelTask()">取消</el-button>
            </span>    
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'totolist',
  data () {
    return {
      user:{
           level:0,
           epx:0 
      },
      list:[],
      task:{
          epx:0,
          name:"",
          content:""  
      },
      editTaskShow:false
    }
  },
  methods:{
      clearUser(){
        this.user.level = 0;
        this.user.epx = 0;  
      },
      clearTask(){
          this.task.epx = 0;
          this.task.name = "";
          this.task.content = ""; 
      },
      clearData(){
        this.list = [];
        this.editTaskShow = false; 
        this.clearTask();
        this.clearUser();
      },
      addTask(){
          //深拷贝
          let taskTest = JSON.parse(JSON.stringify(this.task));
          //this.list.push(this.task)，当清空data.task时，list中存放的task对象的string引用类型（存放：地址）指向的数据会被清空
          this.list.push(taskTest);
          console.log("+++++ this.list.push+++++"+ this.list);
         //清除当前的data中的task数据：
         this.clearTask();
      },
      cancelTask(){
          this.clearTask();
      },
      //完成任务：   
      addScore(index,item){
          console.log("====index===="+index);
          this.user.epx =  this.user.epx + item.epx;
          this.user.level =parseInt(this.user.epx/10) ;  
          //删除当前索引的元素  
          this.list.splice(index,1);
          
      },
      cancelScore(index){
          this.list.pop();
      },
      //弹出框调用：
      handleClose(done){
          this.$confirm("确认关闭？")
          .then(_=>{done();}).catch(_=>{});
      },
     

  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>