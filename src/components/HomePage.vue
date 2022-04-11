<template>
  <div class=" hidden hidden01">
    <el-container>
      <el-header>
        <div class="buttonDeep">
          <!--          添加查询框-->
          <div v-if="user.nickName" style="float: right">
            <div :class="user.userImgurl" style="height: 30px;text-align: left;margin-right: 15px">
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
              我的收藏
            </el-button>
            <el-button v-if="!showDeleteButton" style="margin-right: 15px" @click="backCollect">
              个人首页
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
        <BookCard :delete-button="showDeleteButton" :show-list="showList" :user="user"></BookCard>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
    <!--    添加文章对话框-->
    <el-dialog
        :visible.sync="addBookDialog"
        title="添加新文章"
        width="30%">
      <el-form ref="addNewBookParams" :model="addNewBookParams" :rules="rules" class="demo-ruleForm"
               label-width="100px">
        <el-form-item label="分享书名" prop="bookName">
          <el-input v-model="addNewBookParams.bookName"
                    placeholder="输入书名"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="bookAuther">
          <el-input v-model="addNewBookParams.bookAuther"
                    placeholder="输入作者名称"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="bookIntro">
          <el-input v-model="addNewBookParams.bookIntro"
                    :autosize="{ minRows: 2, maxRows: 5}" maxlength="1000"
                    placeholder="书籍介绍"
                    show-word-limit
                    type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="个人感悟" prop="bookPerce">
          <el-input v-model="addNewBookParams.bookPerce"
                    :autosize="{ minRows: 2, maxRows: 5}" maxlength="1500"
                    placeholder="输入读后感"
                    show-word-limit
                    type="textarea"></el-input>
        </el-form-item>
        <!--        <el-form-item label="书籍图片"></el-form-item>-->
        <!--        <img src="../assets/comment.gif">-->
      </el-form>
      <!--      <input type="file" id="fileExport" @change="updateImageToSM_MS" ref="inputer">-->

      <span slot="footer" class="dialog-footer">
    <el-button @click="addBookDialog = false">取 消</el-button>
    <el-button type="primary" @click="addNewBook('addNewBookParams')">确 定</el-button>
    </span>
    </el-dialog>
    <!--    更改头像对话框-->
    <el-dialog
        :visible.sync="changeImgDialog"
        title="头像背景&昵称"
        width="20%">
      <el-form ref="updateUserFrom" :model="updateUserFrom" :rules="rulesUser" label-width="60px">
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="updateUserFrom.nickName" placeholder="输入昵称" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="" prop="userImgurl">
          <div :class="updateUserFrom.userImgurl" style="float: left">
            <el-avatar :size="50" style="float: left">头像</el-avatar>
          </div>
          <div style="float: right">
            <el-select v-model="updateUserFrom.userImgurl" placeholder="请选择头像背景">
              <el-option label="默认背景" value="1"></el-option>
              <el-option label="背景一" value="imageBackground0"></el-option>
              <el-option label="背景二" value="imageBackground1"></el-option>
              <el-option label="背景三" value="imageBackground2"></el-option>
              <el-option label="背景四" value="imageBackground3"></el-option>
              <el-option label="背景五" value="imageBackground4"></el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="changeImgDialog = false">取 消</el-button>
    <el-button type="primary" @click="changeImgAndNickname('updateUserFrom')">确 定</el-button>
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
      rulesUser: {
        nickName: [
          {required: true, message: "请输入昵称", trigger: "blur"},
          {min: 2, max: 10, message: "昵称长度在2到10个字符", trigger: "blur"}
        ],
        userImgurl: [
          {required: true, message: "请选择头像", trigger: "blur"}
        ]
      },
      rules: {
        bookName: [
          {required: true, message: '请输入书籍名称', trigger: 'blur'},
          {min: 1, max: 48, message: '书籍长度为 1 到 48 个字符', trigger: 'blur'}
        ],
        bookAuther: [
          {required: true, message: '请输入作者名称', trigger: 'blur'},
          {min: 1, max: 20, message: '作者名称长度在1 到 20个字符', trigger: 'blur'}
        ],
        bookIntro: [
          {required: true, message: '请输入书籍介绍', trigger: 'blur'},
          {min: 50, max: 1000, message: '长度在 50 到 1000 个字符', trigger: 'blur'}
        ],
        bookPerce: [
          {required: true, message: '请输入读后感', trigger: 'blur'},
          {min: 50, max: 1500, message: '长度在 50 到 1500 个字符', trigger: 'blur'}
        ],
      },
      updateUserFrom: {
        nickName: '',
        userImgurl: ''
      },
      addNewBookParams: {
        bookName: "",
        bookAuthor: "",
        bookIntro: "",
        bookPerce: "",
      },
      showDeleteButton: true,
      showList: [],
      pageNum: 1,
      pageSize: 10,
      user: {
        userEmail: '',
        nickName: '',
        userId: '',
      },
      color: 'imageBackground4',
      addBookDialog: false,
      changeImgDialog: false,
      imageUrl: '../assets/comment.gif',
      bookFile: '',
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": this._Authorization
      },
      requstData: {
        format: 'json'
      },
      headerConfig: {
        headers: {
          "Token": window.localStorage.getItem("Token")
        }
      }
    }
  },
  mounted() {
    this.getUser();
    this.getUserBook();
  },
  methods: {
    getUser() {
      var _self = this;
      _self.user.userEmail = this.$route.query.userEmail;
      _self.user.nickName = this.$route.query.nickName;
      _self.user.userId = this.$route.query.userId;
      var userEmail = _self.$route.query.userEmail;
      var url = _self._CONTEXTURL + '/base/getUser?userEmail=' + userEmail;
      _self.$ajax.get(url).then(function (response) {
        if (response.data.code === 200) {
          _self.user = response.data.data;
        }
      });
    },
    getUserBook() {
      var _self = this;
      var userEmail = this.$route.query.userEmail;
      var url = _self._CONTEXTURL + "/book/getUserBook?userEmail=" + userEmail + "&pageNum=" + _self.pageNum + "&pageSize=" + _self.pageSize;
      _self.$ajax.post(url, {}, _self.headerConfig).then(function (res) {
        if (res.data.code === 200) {
          _self.showList = res.data.data;
        } else {
          _self.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(function (err) {
        _self.$message({
          message: err.data.message,
          type: 'error'
        });
      });
    },
    //获取用户收藏的文章，主要显示作者收藏的文章
    collectBooks() {
      let _self = this;
      _self.showDeleteButton = false;
      var url = _self._CONTEXTURL + "/bookColl/queryCollBook?collUserId=" + _self.user.userId + "&pageNum=" + _self.pageNum + "&pageSize=" + _self.pageSize;
      _self.$ajax.post(url, {}, _self.headerConfig).then(function (res) {
        if (res.data.code === 200) {
          _self.showList = res.data.data;
        } else {
          _self.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(function (err) {
        _self.$message({
          message: err.data.message,
          type: 'error'
        });
      });
    },
    //获取作者收藏的文章,返回作者主页
    backCollect() {
      let _self = this;
      _self.showDeleteButton = true;
      _self.getUserBook();
    },
    //TODO 上传最新的文章过程，添加可保存的文章过程（提交审核，审核结果）
    addNewBook(addNewBookParams) {
      let _self = this;
      this.$refs[addNewBookParams].validate((valid) => {
        if (valid) {
          var params = _self.addNewBookParams;
          params.userEmail = _self.user.userEmail;
          params.bkNickName = _self.user.nickName;
          var url = _self._CONTEXTURL + "/book/addBook";
          _self.$ajax.post(url, params, _self.headerConfig).then(function (res) {
            if (res.data.code === 200) {
              _self.$message({
                message: res.data.msg,
                type: 'success'
              });
              _self.addNewBookParams = {
                bookName: "",
                bookAuthor: "",
                bookIntro: "",
                bookPerce: "",
              };
              _self.addBookDialog = false;
              alert('添加书籍成功！');
              _self.getUserBook();
            } else {
              _self.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    changeImgAndNickname(updateUserFrom) {
      let _self = this;
      this.$refs[updateUserFrom].validate((valid) => {
        if (valid) {
          var params = _self.updateUserFrom;
          params.userEmail = _self.user.userEmail;
          var url = _self._CONTEXTURL + "/user/updateInfo"
          _self.$ajax.post(url, params, _self.headerConfig).then(function (res) {
            if (res.data.code === 200) {
              _self.$message({
                message: res.data.msg,
                type: 'success'
              });
              _self.updateUserFrom = {
                userEmail: "",
                userNickName: "",
                userImg: "",
              };
              _self.changeImgDialog = false;
              _self.getUser();
            } else {
              _self.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    //  图片上传
    updateImageToSM_MS(data) {
      let _self = this;
      console.log(data.target.files[0]);
      var Format = require('form-data')
      var formData = new Format();
      formData.append('file', data.target.files[0]);
      let url = _self._CONTEXTURL + "/book/imgUpload";
      _self.$ajax.post(url, formData, _self.headerConfig).then(function (res) {
        console.log(res);
        if (res.data.code === 200) {
          _self.imageUrl = res.data.data;
        } else {
          _self.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(function (err) {
        _self.$message({
          message: err.data.message,
          type: 'error'
        });
      });
      //  var FormData = require('form-data');
      //  var formData = new FormData();
      //  formData.append('format', 'json');
      //  formData.append('smfile',data.target.files[0]);
      //  let url = 'https://sm.ms/api/v2/upload';
      //  var config = {
      //    headers: {
      //      "Content-Type": "multipart/form-data",
      //      "Authorization": "fYqYDLv7i5y4NvdhxyaxpN7Kk6YLF140"
      //    }
      //  };
      //  _self.$ajax.post(url,formData,config).then(function (response) {
      //    console.log(response);
      //  });


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

.hidden >>> .el-aside {
  height: 100vh;
  background-color: #ffffff;
  overflow-y: auto;
  -ms-overflow-style: none; /* Edge */
  scrollbar-width: none; /* Firefox */
}

.hidden01 >>> ::-webkit-scrollbar {
  display: none; /* WebKit */
}
</style>