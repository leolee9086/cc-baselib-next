<template>
  <el-button size="mini">
    <edit />
  </el-button>    
</template>
<script>
import ccAssetsSelector from './components/cc-assets-selector.vue'
export default {
    components: { ccAssetsSelector,ElIcons },
    data(){
        return{
            思源伺服ip:"192.168.0.9:6806",
            关键字:"",
            文件路径:""
        }
    }
}
</script>
<style >

</style>