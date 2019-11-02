<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn_box">
        <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right" type="success" size="small" @click="dialogVisible=true">添加素材</el-button>
        <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="headers"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-dialog>
      </div>
      <!-- 素材列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" />
          <div class="footer" v-if="!reqParams.collect">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
          </div>
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
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      total: 0,
      // 对话框显示隐藏
      dialogVisible: false,
      // 上传成功后的图片地址
      imageUrl: null,
      headers: {
        Authorization:
          ` Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getIamges()
  },
  methods: {
    async getIamges () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getIamges()
    },
    // 切换列表
    toggleList () {
      this.reqParams.page = 1
      this.getIamges()
    },
    openDialog () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    // 上传成功
    handleSuccess (res) {
      // - 预览 2s 钟 ，提示上传成功
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // - 自动关闭对话框，更新列表数据。
        this.dialogVisible = false
        this.getIamges()
        // 再次打开对话框的时候，预览的是上传按钮 而不是 之前的图片
        this.imageUrl = null
      }, 1000)
    },
    // 添加收藏与取消收藏
    async toggleStatus (item) {
      // 修改请求
      const {
        data: { data }
      } = await this.$http.put(`/user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功后 修改样式
      item.is_collected = data.collect
      // 提示
      this.$message.success((data.collect ? '添加收藏' : '取消收藏') + '成功')
    },
    // 删除素材
    deleteImage (id) {
      this.$confirm('此操作将永久删除该图片,是否继续？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击了确认
          await this.$http.delete(`user/images/${id}`)
          // 删除成功
          this.$message.success('删除成功')
          // 更新列表
          this.getIamges()
        })
        .catch(() => {
          // 点击了取消
        })
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  padding-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    display: inline-block;
    position: relative;
    margin-right: 50px;
    margin-bottom: 20px;
    border: 1px dashed #ddd;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.5);
      width: 100%;
      text-align: center;
      color: rgb(0, 153, 255);
      span {
        margin: 0 20px;
        &.red {
          color: rgb(255, 0, 0);
        }
      }
    }
  }
}
</style>
