
<template>
  <el-button v-on:click="打开思源块链接('20211118234421-6clsks9')" class="greeting">{{ greeting }}</el-button>
</template>
<script>
export default {
    data() {
        return {
        greeting: 'Hello World!',
        color:"blue",
        主窗口:""
        }
    },
    mounted(){
        this.主窗口=window.parent.document
        console.log(this.主窗口)
    },
    methods:{
        打开思源块链接(id){
            let that = this
            console.log(id)
            let 虚拟链接 =  that.主窗口.createElement("span")
            虚拟链接.setAttribute("data-type","block-ref")
            虚拟链接.setAttribute("data-id",id)
            let 临时目标 = that.主窗口.querySelector(".protyle-wysiwyg div[data-node-id] div[contenteditable]")
            console.log(临时目标)
            临时目标.appendChild(虚拟链接)
            let 点击事件 =  that.主窗口.createEvent('MouseEvents')
            点击事件.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            虚拟链接.dispatchEvent(点击事件);
            虚拟链接.remove()
            
        },
    }
}
</script>
<style>
.greeting {
  color: v-bind(color);
  font-weight: bold;
}
</style>