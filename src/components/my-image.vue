<template>
  <div class="my-image">
      <!-- 按钮 -->
      <div class="btn_box" @click="open">
          <img src="../assets/default.png" alt="">
      </div>
      <!-- 对话框 -->
      <el-dialog :visible.sync="dialogVisible" width="750px">
<el-tabs v-model="activeName" type="card">
    <el-tab-pane label="素材库" name="image">
        <!-- 按钮 -->
         <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 列表 -->
           <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id" @click="selectedImage(item.url)" :class="{selected:selectedImageUrl ===item.url}">
          <img :src="item.url" />

        </div>
      </div>
        <!-- 分页 -->
        <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
            <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="headers"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
    </el-tab-pane>

  </el-tabs>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      // 对话框的显示隐藏
      dialogVisible: false,
      // 当前激活的选项卡name的值
      activeName: 'image',
      // 请求后台的参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      selectedImageUrl: null,
      uploadImageUrl: null,
      headers: {
        Authorization:
          ` Bearer ${local.getUser().token}`
      }
    }
  },
  methods: {
    // 打开对话框
    open () {
      this.dialogVisible = true
      this.getIamges()
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getIamges()
    },
    // 获取素材列表数据
    async getIamges () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 全部与收藏切换
    toggleList () {
      this.reqParams.page = 1
      this.getIamges()
    },
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 上传成功
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
      this.dialogVisible = false
    }
  }
}
</script>
<style scoped lang='less'>
.my-image{
    display: inline-block;
}
.btn_box{
    width: 150px;
    height: 150px;
    border:1px dashed #ddd;
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
}
.dialog-footer{
    text-align: center;
    width: 100%;
    display:block;
}
.img_list {
  padding-top: 20px;
  .img_item {
    width: 150px;
    height: 120px;
    display: inline-block;
    position: relative;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px dashed #ddd;
    img {
      width: 100%;
      height: 100%;
    }
    &.selected::after{
        content: '';
        position:absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0,.5) url(../assets/selected.png) no-repeat center /50px 50px;
    }

  }
}
</style>
