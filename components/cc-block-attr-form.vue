<template>
    <div @click="获取块属性()">
    <el-form 
        :model="当前块属性" 
        ref="当前块属性" 
        label-width="100px" 
        label-positon=left>
            <el-form-item label="书签:" v-if="是否显示基础属性">
                <el-select
                    size="mini"
                    v-model="当前块属性.bookmark"
                    @change="设定块属性('bookmark',当前块属性.bookmark)"
                    @input="设定块属性('bookmark',当前块属性.bookmark)"
                    clearable
                    filterable
                    allow-create
                    >
                    <el-option
                    v-for="item in 书签列表"
                    :label="item"
                    :value="item"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="命名:"  v-if="是否显示基础属性">
                <el-input v-model="当前块属性.name"
                @change="设定块属性('name',当前块属性.name)"
                @input="设定块属性('name',当前块属性.name)"

                size="mini"
                style="border:none"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="别名:"  v-if="是否显示基础属性">
                <el-input v-model="当前块属性.alias"
                @change="设定块属性('alias',当前块属性.alias)"
                @input="设定块属性('alias',当前块属性.alias)"

                size="mini"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="备注:"  v-if="是否显示基础属性">
                <el-input v-model="当前块属性.memo"
                @change="设定块属性('memo',当前块属性.memo)" 
                @input="设定块属性('memo',当前块属性.memo)"

                size="mini"
                type=textarea
                >
                </el-input>
            </el-form-item>
        </el-form>  
    
        
        <el-form
        label-width="150px" 
        :label-positon="'left'"
        v-if="是否显示自定义属性"
        >
            <el-form-item 
            v-for="(index,item) in 当前块解析属性" 
            :key="item"
            v-if="item.slice(0,7)=='custom-'"
            >
            <div slot="label">
                <i class="el-icon-share"  v-if = "当前块解析属性[item]['type']=='块链接'||当前块解析属性[item]['type']=='block-link'"></i>
                <i class="el-icon-link" v-if = "当前块解析属性[item]['type']=='超链接'||当前块解析属性[item]['type']=='link'"></i>
                <i class="el-icon-edit-outline" v-if = "当前块解析属性[item]['type']=='原始文本'||当前块解析属性[item]['type']=='rawstring'"></i>
                <i class="el-icon-house" v-if = "当前块解析属性[item]['type']=='文本'||当前块解析属性[item]['type']=='string'"></i>
                <i class="el-icon-folder-opened" v-if = "当前块解析属性[item]['type']=='附件'||当前块解析属性[item]['type']=='asset'"></i>
                <span>{{当前块解析属性[item]['label']||item.slice(7)}}</span>
                <span v-if="是否显示源属性名" style="font-size: xx-small;" >{{' ('+item.slice(7)+')'}}</span>
            </div>
            <el-row :gutter="24" style="height : 100%">
                <el-col :span="22" style="min-height : 100%!important">
                    <custom-attr-shower
                    :属性类型="属性类型"
                    :属性名="item"
                    v-model="当前块属性[item]"
                    :显示原始自定义属性="是否显示原始自定义属性"
                    :思源伺服ip="思源伺服ip"
                    :apitoken="apitoken"
                    @hide=设定块属性(item,当前块属性[item])
                    :主界面="主界面"
                    >
                    </custom-attr-shower>
                </el-col>
                <el-col :span="1" style="border-left:solid 1px  #DCDFE6;"></el-col>
    
                <el-col :span="1" >
                    <el-tooltip class="item" effect="dark" content="'删除'" placement="top-end">
                        <div @click="删除自定义属性(item)" style="font-size:x-large;">-</div>
                    </el-tooltip>
                </el-col>
                </el-row>
            </el-form-item>
        </el-form> 
        <el-form
        label-width="100px" 
        :label-positon="'left'"
        v-if="是否显示自定义属性"
        >
             <el-form-item label="样式:"  v-if="当前块属性.type!='d'&&当前块属性.type!='doc'">
                <div slot ="label" >样式</div>
                <el-input v-model="当前块属性.style"
                @change="设定块属性('style',当前块属性.style)" 
                @input="设定块属性('style',当前块属性.style)"

                size="mini"
                type=textarea
                >
                </el-input>
            </el-form-item>
        </el-form> 

        <custom-attr-constructor
        v-model="表单新属性模板"
        :属性类型="属性类型"
        @hide="设定新属性(表单新属性模板)"
        :已有属性列表="当前块属性"
         :思源伺服ip="思源伺服ip"
          :apitoken="apitoken"
        ></custom-attr-constructor>
    </div>
</template>
<script>

    module.exports={
        name:"cc-block-attr-form",
        components:componentList,
        props:[ 
                "内容块id",
                "书签列表",
                "思源伺服ip",
                "apitoken",
                "主界面",
                "是否显示基础属性",
                "是否显示源属性名",
                "是否显示自定义属性",
                "是否显示原始自定义属性",
                "新属性模板",
                "属性类型",
            ],
   
        data(){
            return{
                当前块信息:{},
                当前块属性:{},
                当前块解析属性:{},
                当前块基础属性对象:{},
                当前块自定义属性对象:{},
                表单新属性模板:this.新属性模板,
                块被引用数:"",
                当前块内容对象:{},
            }
        },
      //  mounted(){this.获取块属性()},
        watch:{
            内容块id:async function (val){
                let that = this
                
                await that.获取块属性()
            },
           
        },
        methods:{
            设定新属性:async function (新属性){
                let that =this
              //  console.log(新属性)
                let 真实新属性名 = "custom-"+新属性["name"]
                if (that.当前块属性[真实新属性名] ){
                    新属性["name"]=新属性["name"]+"new"
                    that.设定新属性(新属性)
                }
                else {
                let 新属性对象 = {"value":新属性["value"],"label":新属性["label"],"type":新属性["type"]}
                let 新属性文本 = JSON.stringify(新属性对象)
                that.$set(that.当前块属性,真实新属性名,新属性文本)
                await that.设定块属性(真实新属性名,新属性文本)
                await that.获取块属性()
                }
            },
            删除自定义属性:async function (属性名){
                let that = this
                that.当前块属性[属性名] = ""
                await that.设定块属性(属性名,that.当前块属性[属性名])
                delete that.当前块属性[属性名]
                delete that.当前块解析属性[属性名]
                await that.获取块属性()

            },
            获取块属性:async function(){
                let that =this
                that.块属性={}
              //  console.log("ip",that.思源伺服ip,"apitoken",that.apitoken,"内容块id",that.内容块id)
                当前块信息 = await that.通过id获取文档属性(that.内容块id)
                当前块内容对象 = await  以id获取思源块信息(that.思源伺服ip,that.apitoken,that.内容块id )
                that.当前块属性 = 当前块信息["ial"]
                that.当前块信息 = 当前块信息
                 
               that.当前块内容对象 = 当前块内容对象
               that.当前块属性['type']=当前块内容对象['type']
                await that.解析块属性()
                
             //   console.log("当前块属性",that.当前块内容对象)
              ////  console.log("当前块解析属性",that.当前块解析属性)
              //  console.log("当前块信息",that.当前块信息)
              //  console.log("当前块内容对象",that.当前块内容对象)
            },
            解析块属性:async function(){
                let that = this
              //  console.log(that.当前块属性)
                for (item in that.当前块属性){
                //    console.log(item)
                 //   console.log(that.当前块属性[item])
                     let 原始属性值 = that.当前块属性[item]
                 //    console.log(原始属性值)
                     原始属性值 = that.html转义(原始属性值)
                     that.当前块属性[item] = 原始属性值
                     let 解析属性值 = null
                  //   console.log(原始属性值)

                     try {
                      //   console.log(原始属性值)
                         解析属性值 = JSON.parse(原始属性值)
                     //    console.log(解析属性值)
                         if (解析属性值.label==""||!解析属性值.label){解析属性值.label=item.slice(7,0)}
                         if (解析属性值.label&&解析属性值.value&&解析属性值.type){解析属性值={'label':解析属性值.label,'value':解析属性值.value,'type':解析属性值.type}}
                         else if (解析属性值.label&&解析属性值.value){解析属性值={'label':解析属性值.label,'value':解析属性值.value,'type':"rawstring"}}
                         else if (解析属性值.label&&解析属性值.type){解析属性值={'label':解析属性值.label,'value':"",'type':解析属性值.type}}
                         else{解析属性值={'label':item.slice(7,0),'value':原始属性值,'type':'rawstring'}}
                        }
                     catch(e){解析属性值= {'label':item.slice(7,0),'value':原始属性值,'type':'rawstring'}}
                     if (解析属性值.type=="块链接"||解析属性值.type=="block-link"){
                         解析属性值.target = await 获取思源块链接锚文本(that.思源伺服ip,this.apitoken,解析属性值["value"])
                     }
                     that.当前块解析属性[item] = 解析属性值
                  //   console.log(that.当前块解析属性)
                }
            },
            html转义(原始字符串){
                var 临时元素 = document.createElement("div"); 
                临时元素.innerHTML = 原始字符串; 
                var output = 临时元素.innerText || 临时元素.textContent; 
                临时元素 = null; 
              ///  console.log(output)
                return output; 
            },
            设定块属性:async function(属性名,属性值){
                let that =this
                let id = this.内容块id
                await 设置思源块属性(that.思源伺服ip,that.apitoken,id,属性名,属性值)
                this.设定块属性元素(id,that.当前块内容对象["type"])
            },
            设定块属性元素(id,内容块类型){
                let that =this
               // console.log("内容块类型",内容块类型)
                let 属性元素 = this.通过id和块类型查找属性元素(id,内容块类型)
             //   console.log("属性元素",属性元素)
                let 属性元素内容 =  this.以当前属性生成属性元素内容()
                if(属性元素){
                   属性元素.innerHTML = 属性元素内容  
                } 
                let 块元素 = that.主界面.querySelector(`.protyle-wysiwyg [data-node-id='${id}']`)
                if(块元素){
                    块元素.setAttribute("name",that.当前块属性["name"])
                    块元素.setAttribute("alias",that.当前块属性["alias"])
                    块元素.setAttribute("memo",that.当前块属性["memo"])
                    块元素.setAttribute("bookmark",that.当前块属性["bookmark"])
                    块元素.setAttribute("style",that.当前块属性["style"])
                    for (属性名 in that.当前块自定义属性对象){
                        块元素.setAttribute("custom-"+属性名,JSON.stringify(that.当前块自定义属性对象[属性名]))
                    }
                }
            },
            以当前属性生成属性元素内容(){
                let that = this
                let 书签 = that.当前块属性["bookmark"]
                let 命名 = that.当前块属性["name"]
                let 别名 = that.当前块属性["alias"]
                let 备注 = that.当前块属性["memo"]
                let 被引用数 = that.块被引用数
               
                let 临时书签元素 = document.createElement('div')
                if (书签!=""&&书签){
                    临时书签元素.innerHTML = `<div class="protyle-attr--bookmark">${书签}</div>`}
                let 临时命名元素 = document.createElement('div')
                if (命名!=""&&命名){
                临时命名元素.innerHTML = `<div class="protyle-attr--name"><svg><use xlink:href="#iconN"></use></svg>${命名}</div>`}
                let 临时别名元素 = document.createElement('div')
                if (别名!=""&&别名){
                    临时别名元素.innerHTML = `<div class="protyle-attr--alias"><svg><use xlink:href="#iconA"></use></svg>${别名}</div>`}
                let 临时备注元素 = document.createElement('div')
                if (备注!=""&&备注){
                临时备注元素.innerHTML =`<div class="protyle-attr--memo b3-tooltips b3-tooltips__nw" aria-label="${备注}"><svg><use xlink:href="#iconM"></use></svg></div>`
                }
                let 临时反引元素 = document.createElement('div')

                if (被引用数!=0&&被引用数){
                    临时反引元素.innerHTML =`<div class="protyle-attr--refcount popover__block" data-id="${被引用数}" style="">${被引用数}</div>`
                }
                let 属性元素内容 = 临时书签元素.innerHTML+ 临时命名元素.innerHTML+临时别名元素.innerHTML+临时备注元素.innerHTML+临时反引元素.innerHTML
                return 属性元素内容
            },
            通过id和块类型查找属性元素(id,块类型){
                let that = this 
                let 主界面 = that.主界面
              ///  console.log(主界面)
                if(块类型=="d"||块类型=="doc"){
                    let 文档标题元素 =  主界面.querySelector(`.protyle-background[data-node-id='${id}']+.protyle-title`)
                   // console.log(文档标题元素)
                   if(文档标题元素){
                    let   文档属性元素 =  文档标题元素.querySelector(".protyle-attr")
                    
                  //  console.log(文档属性元素)
                    return 文档属性元素}
                }
                else{
                    let 块元素 = 主界面.querySelector(`.protyle-wysiwyg [data-node-id='${id}']`)
                  //   console.log(块元素)
                    if (块元素){
                    let 块属性元素 =  块元素.querySelector(".protyle-attr")
                 //   console.log(块属性元素)
                    return 块属性元素
                    
                    }
                }

            },
            通过id获取文档属性:async function(id){
                let that = this 
                let obj ={}
                await axios({
                    method:"post",
                    url:'http://'+that.思源伺服ip + '/api/block/getDocInfo',
                    headers:{'Authorization': 'Token '+ that.apitoken },
                    data:({"id":`${id}`})
                    }).then(
                        result=>{
                         //   console.log("aaa",result.data)
                            
                            obj = result.data["data"]

                            if(obj&&obj['refCount']){
                            that.块被引用数 = result.data["data"]['refCount']}
                        }
                    )
                return obj
            },
           
        },
    }
</script>
<style>
    .noborder input,.el-form-item .el-textarea,.el-form-item .el-textarea__inner,.el-form-item .el-input__inner{
        background-color: rgba(128, 128, 128, 0);
        border:none
    }
</style>