<template>
  <div>
    <el-container>
      <el-header>
        <div class="buttonDeep">
          <!--          添加查询框-->
          <div v-if="user.nickName" style="float: right">
            <div :class="color" style="height: 30px;text-align: left;margin-right: 15px">
              <el-button>
                <el-avatar :size="68" shape="circle">{{ user.nickName }}</el-avatar>
              </el-button>
            </div>
            <!--            <el-tooltip class="item" content="退出登录" effect="light" placement="bottom">-->
            <!--              <el-button style="margin-right: 50px"><i class="el-icon-s-custom" style="margin-right: 15px"></i>-->
            <!--                <router-link to="/logout">{{ user.nickName }}</router-link>-->
            <!--              </el-button>-->
            <!--            </el-tooltip>-->
            <el-button style="margin-right: 15px;margin-left: 120px">
              <router-link :to="{name:'index',query:{userEmail:user.userEmail}}">首页</router-link>
            </el-button>
            <el-button v-if="showDeleteButton" style="margin-right: 15px" @click="collectBooks">
              查看收藏
            </el-button>
            <el-button v-if="!showDeleteButton" style="margin-right: 15px" @click="backCollect">
              返回
            </el-button>
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :split-button="true" icon="el-icon-edit" @click.native="addBookDialog = true">添加文章
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-tools" @click.native="changeImgDialog = true">昵称/头像</el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button">
                  <router-link to="/logout">退出登录</router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--            <el-button><i class="el-icon-more"></i></el-button>-->
          </div>
          <div v-if="user.nickName === ''" style="float: right">
            <el-button><i class="el-icon-s-custom" style="margin-right: 10px"></i>
              <router-link to="/login"> 登录</router-link>
            </el-button>
          </div>
        </div>
      </el-header>
      <el-main>
        <!--        书籍展示卡-->
        <BookCard :delete-button="showDeleteButton" :show-list="showList"></BookCard>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
    <!--    添加文章对话框-->
    <el-dialog
        :visible.sync="addBookDialog"
        title="添加新文章"
        width="30%">
      <el-form class="demo-ruleForm" label-width="100px">
        <el-form-item label="分享书名">
          <el-input placeholder="输入书名"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input placeholder="输入书名"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input placeholder="输入书名"></el-input>
        </el-form-item>
        <el-form-item label="个人感悟">
          <el-input placeholder="输入书名"></el-input>
        </el-form-item>
        <!--      <el-form-item label="书籍图片">-->
        <!--        <el-button @click="updateImageToSM_MS">上传</el-button>-->
        <!--      </el-form-item>-->
        <!--        <form action="" enctype="multipart/form-data">-->
        <!--          <input id="file" class="filepath"  type="file"><br>-->
        <!--          <img src="" id="show" width="200">-->
        <!--        </form>-->
        <!--        <el-upload-->
        <!--            class="avatar-uploader"-->
        <!--            action="https://sm.ms/api/v2/upload"-->
        <!--            :headers="headers"-->
        <!--            :data="requstData"-->
        <!--            name="smfile"-->
        <!--            :show-file-list="false"-->
        <!--            accept=".jpg,.jpeg,.png,.gif.JPG,.JPEG,.PNG,.GIF"-->
        <!--            :before-upload="beforeAvatarUpload"-->
        <!--            :on-success="handleAvatarSuccess">-->
        <!--          <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
        <!--          <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--        </el-upload>-->
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="addBookDialog = false">取 消</el-button>
    <el-button type="primary" @click="addNewBook">确 定</el-button>
    </span>
    </el-dialog>
    <!--    更改头像对话框-->
    <el-dialog
        :visible.sync="changeImgDialog"
        title="更改头像/昵称"
        width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="changeImgDialog = false">取 消</el-button>
    <el-button type="primary" @click="changeImgAndNickname">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import BookCard from "@/components/BookCard";

export default {
  name: "HomePage",
  components: {
    BookCard
  },
  data() {
    return {
      showDeleteButton: true,
      showList: [
        {name: 'first'},
        {name: 'second'},
        {name: 'third'},
      ],
      user: {
        userEmail: '',
        nickName: ''
      },
      color: 'imageBackground4',
      addBookDialog: false,
      changeImgDialog: false,
      imageUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      bookFile: '',
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": this._Authorization
      },
      requstData: {
        format: 'json'
      }
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      var _self = this;
      _self.user.userEmail = this.$route.query.userEmail;
      _self.user.nickName = this.$route.query.nickName;
    },
    collectBooks() {
      let _self = this;
      _self.showDeleteButton = false;
      //  TODO 获取用户收藏的文章，主要显示作者收藏的文章
    },
    backCollect() {
      let _self = this;
      _self.showDeleteButton = true;
      // TODO 获取作者收藏的文章,返回作者主页
    },
    addNewBook() {
      let _self = this;
      _self.addBookDialog = false;
    },
    changeImgAndNickname() {
      let _self = this;
      _self.changeImgDialog = false;
    },
    //  图片上传
    updateImageToSM_MS() {
      let _self = this;
      // var file1 = this.files[0].name;
      // console.log(file1);
      var file = document.getElementById('updateImg').value;
      console.log(file);
      let formData = new FormData();
      formData.append('smfile', file);
      formData.append('format', 'json');
      // console.log("图书："+formData);
      // let params = {};
      // params.format = "json";
      // params.smfile = file;
      let url = 'https://sm.ms/api/v2/upload';
      var config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": _self._Authorization
        }
      }
      _self.$ajax.post(url, formData, config).then(function (response) {
        console.log("返回值" + response);
      });

    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      let types = ['image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/png'];
      const isImage = types.includes(file.type);
      const isLtSize = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error('上传图片只能是 JPG、JPEG、gif、bmp、PNG 格式!');
        return false;
      }
      if (!isLtSize) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false;
      }
      return isImage && isLtSize;
    }

  }

}
</script>

<style scoped>
.buttonDeep >>> .el-button {
  background-color: rgba(0, 0, 0, 0);
  margin-right: 100px;
  border: none;
}

.imageBackground0 >>> .el-avatar {
  background: #857d73;
}

.imageBackground1 >>> .el-avatar {
  background: #d779dd;
}

.imageBackground2 >>> .el-avatar {
  background: #6c63b3;
}

.imageBackground3 >>> .el-avatar {
  background: #6fe1a7;
}

.imageBackground4 >>> .el-avatar {
  background: #f19e37;
}

.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader >>> .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>