<template>
  <div>
    <span v-if="showList.length === 0">空空如也....</span>
    <el-row v-for="(item,index) in showList" :key="index" :gutter="12"
            style="margin-left: 28%;">
      <el-col :span="8">
        <div :class="item.userImgurl" style="height: 30px;text-align: left">
          <el-avatar :size="68" shape="circle">{{ item.bkNickName }}</el-avatar>
        </div>
        <el-card :body-style="{padding: '0px'}" :header=item.bookName shadow="hover"
                 style="width: 800px ">
          <div>
            <!--              图书图片-->
            <div style="float: left;height: 290px;width: 250px">
              <!--              <el-avatar :size="230" shape="square"-->
              <!--                         src="../assets/comment.gif"-->
              <!--                         style="margin-top: 15px">{{item.bookName}}</el-avatar>-->
              <img src="../assets/book.jpg" style="width: 230px;height: 230px">
              <div style="position:relative;float: left;width: 100%;height: 35px">
                <span
                    style="float:left;margin-left: 40px;font-size: 24px;text-align: left;">{{
                    item.bookAuther
                  }}(著)</span>
              </div>
            </div>
            <!--              图书的简介和发布者的感悟-->
            <div style="float: right;height: 290px;width: 550px">
              <div class="inputDeep" style="height: 110px">
                <span style="font-size: 20px;float: left">简介：</span>
                <el-input
                    v-model="item.bookIntro" :autosize="{ minRows: 2, maxRows: 3}"
                    :readonly="true"
                    style="background-color: white"
                    type="textarea"
                ></el-input>
              </div>
              <div class="inputDeep" style="height: 180px">
                <span style="font-size: 20px;float: left">个人感悟：</span>
                <el-input
                    v-model="item.bookPerce" :autosize="{ minRows: 2, maxRows: 6}"
                    :readonly="true"
                    style="background-color: white"
                    type="textarea"
                >
                </el-input>
              </div>
            </div>
          </div>
          <hr>
          <div style="position: relative;  float: bottom">
            <div class="buttonDeep buttonIconFocus buttonIconHover" style="float: right;width: 10%">
              <el-tooltip class="item" content="评论" effect="light" placement="bottom-start">
                <el-button @click="showComment(item)"><i
                    class="el-icon-chat-dot-round"></i><br><a>{{ item.commNum }}</a></el-button>
              </el-tooltip>
            </div>
            <!--              收藏按钮-->
            <div v-if="item.currUserCollect != 1" class="buttonDeep buttonIconFocus buttonIconHover"
                 style="float: right;width: 10%">
              <el-tooltip class="item" content="收藏" effect="light" placement="bottom-start">
                <el-button @click="changeCollectStar(item)"><i
                    class="el-icon-star-off"></i><br><a>{{ item.collectNum }}</a></el-button>
              </el-tooltip>
            </div>
            <!--            取消收藏按钮-->
            <div v-if="item.currUserCollect == 1 " class="buttonDeep buttonIconFocus buttonIconHover"
                 style="float: right;width: 10%">
              <el-tooltip class="item" content="取消收藏" effect="light" placement="bottom-start">
                <el-button @click="changeCollectStar(item)"><i
                    class="el-icon-star-on"></i><br><a>{{ item.collectNum }}</a></el-button>
              </el-tooltip>
            </div>
            <!--            删除文章按钮-->
            <div v-if="deleteButton" class="buttonDeep buttonIconFocus buttonIconHover" style="float: right;width: 10%">
              <el-tooltip class="item" content="删除" effect="light" placement="bottom-start">
                <el-button @click="open(item)"><i class="el-icon-delete"></i></el-button>
              </el-tooltip>
            </div>
            <div v-if="deleteButton" class="buttonDeep buttonIconFocus buttonIconHover" style="float: right;width: 10%">
              <el-tooltip class="item" content="修改" effect="light" placement="bottom-start">
                <el-button @click="openUpdateDialog(item)"><i class="el-icon-edit-outline"></i></el-button>
              </el-tooltip>
            </div>
          </div>

        </el-card>
        <br>
      </el-col>
    </el-row>
    <div class="dialogDeep">
      <!--      评论对话框-->
      <el-dialog
          :visible.sync="dialogVisible"
          title="全部评论"
          @close='dialogClose'
          width="25%">
        <!--          style="float: right;"-->
        <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" infinite-scroll-distance="50px"
             infinite-scroll-throttle-delay="500" style="overflow:auto;height: 500px">
          <div v-for="(item,index) in commentList" :key="index">
            <div>
              <div style="float: left;font-size: 15px;font-weight: bold"><span>{{ item.commNickName }}:</span>
              </div>

              <div class="inputDeep">
                <el-input
                    v-model="item.comment" :autosize="{ minRows: 1, maxRows: 8}"
                    :readonly="true"
                    style="background-color: white"
                    type="textarea"
                ></el-input>
              </div>
            </div>
          </div>
          <p v-if="loading">加载中<i class="el-icon-loading"></i></p>
          <p v-if="noMore"><img src="../assets/comment.gif" style="width: 50px;height: 50px">人家有底线啦~</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-footer>
            <el-input v-model="comment" clearable placeholder="评论"></el-input>
          </el-footer>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addComment">确 定</el-button>
  </span>
      </el-dialog>
    </div>
    <!--    更改文章对话框-->
    <el-dialog
        :visible.sync="updateBookDialog"
        title="修改文章内容"
        width="30%">
      <el-form ref="updateBookParams" :model="updateBookParams" :rules="rules" class="demo-ruleForm"
               label-width="100px">
        <el-form-item label="分享书名" prop="bookName">
          <el-input v-model="updateBookParams.bookName"
                    placeholder="输入书名"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="bookAuther">
          <el-input v-model="updateBookParams.bookAuther"
                    placeholder="输入作者名称"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="bookIntro">
          <el-input v-model="updateBookParams.bookIntro"
                    :autosize="{ minRows: 2, maxRows: 5}" maxlength="1000"
                    placeholder="书籍介绍"
                    show-word-limit
                    type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="个人感悟" prop="bookPerce">
          <el-input v-model="updateBookParams.bookPerce"
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
    <el-button @click="updateBookDialog = false">取 消</el-button>
    <el-button type="primary" @click="updateBook('updateBookParams')">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BookCard",
  props: {
    deleteButton: {
      type: Boolean,
      required: true,
    },
    showList: {
      type: [Array],
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },

  },
  components: {},
  data() {
    return {
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
      src: '',
      //用户可以选择既定的背景颜色
      updateBookDialog: false,
      updateBookParams: {
        bookId: '',
        bookName: "",
        bookAuthor: "",
        bookIntro: "",
        bookPerce: "",
      },
      commentList: [],
      dialogVisible: false,
      comment: '',
      bookComment: [],
      loading: false,
      pageNum: 0,
      pageSize: '10',
      queryBookName: '',
      commentTotal: 1,
      commentSize: 0,
      disabled: false,
      whileDisabled: false,
      currBook: {},
      headerConfig: {
        headers: {
          "Token": window.localStorage.getItem("Token")
        }
      }

    };
  },
  computed: {
    noMore() {
      return this.commentSize >= this.commentTotal;
    },
  },
  mounted() {
  },
  methods: {
    open(book) {
      this.$confirm('此操作将永久删除该文章,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteBook(book);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //用户删除文章
    deleteBook(book) {
      let _self = this;
      let url = _self._CONTEXTURL + '/book/deleteBook?bookId=' + book.bookId + "&userEmail=" + _self.user.userEmail;
      _self.$ajax.post(url, {}, _self.headerConfig).then(function (res) {
        if (res.data.code === 200) {
          _self.$message({
            message: '删除成功',
            type: 'success'
          });
          _self.showList.splice(_self.showList.indexOf(book), 1);
        } else {
          _self.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(function (err) {
        _self.$message({
          message: '删除失败',
          type: 'error'
        });
      });
    },
    //打开更改文章对话框
    openUpdateDialog(book) {
      var _self = this;
      _self.updateBookDialog = true;
      _self.updateBookParams = book;
    },
    //更新文章
    updateBook(updateBookParams) {
      var _self = this;
      this.$refs[updateBookParams].validate((valid) => {
        if (valid) {
          var url = _self._CONTEXTURL + "/book/updateBook";
          _self.$ajax.post(url, _self.updateBookParams, _self.headerConfig).then(function (res) {
            if (res.data.code === 200) {
              _self.$message({
                message: '更新成功',
                type: 'success'
              });
              _self.updateBookDialog = false;
            } else {
              _self.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          }).catch(function (err) {
            _self.$message({
              message: '更新失败',
              type: 'error'
            });
          });
        } else {
          return false;
        }
      });
    },
    //用户收藏的相关操作（判断用户是否登录）
    changeCollectStar(book) {
      var _self = this;
      if (_self.user.userId == null || _self.user.userId === '') {
        _self.$message({
          message: '请先登录后再收藏！',
          type: 'warning'
        });
        return;
      }
      if (book.currUserCollect === '0') {
        let url = _self._CONTEXTURL + '/bookColl/addColl?collUserId=' + _self.user.userId + '&bctBookId=' + book.bookId + '&userEmail=' + book.userEmail;
        _self.$ajax.post(url, {}, _self.headerConfig).then(function (res) {
          if (res.data.code === 200) {
            _self.$message({
              message: '收藏成功',
              type: 'success'
            });
            book.currUserCollect = '1';
            book.collectNum = parseInt(book.collectNum) + 1;
          } else if (res.data.code === 401) {
            _self.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }
        })
      } else if (book.currUserCollect === '1') {
        let url = _self._CONTEXTURL + '/bookColl/cancelColl?collUserId=' + _self.user.userId + '&bctBookId=' + book.bookId + '&userEmail=' + book.userEmail;
        _self.$ajax.post(url, {}, _self.headerConfig).then(function (res) {
          if (res.data.code === 200) {
            _self.$message({
              message: '取消收藏成功',
              type: 'success'
            });
            book.currUserCollect = '0';
            book.collectNum = parseInt(book.collectNum) - 1;
          } else if (res.data.code === 401) {
            _self.$message({
              message: res.data.code + "/" + res.data.msg,
              type: 'warning'
            });
          } else {
            _self.$message({
              message: res.data.code + "/" + res.data.msg,
              type: 'warning'
            });
          }
        })
      }
    },
    //添加评论
    addComment() {
      var _self = this;
      if (_self.user.userId == null || _self.user.userId === '') {
        _self.$message({
          message: '请先登录后再评论！',
          type: 'warning'
        });
        return;
      }
      if (_self.comment == null || _self.comment === '') {
        //  提示评论不能为空
        _self.$message({
          message: '评论不能为空,请评论后提交！',
          type: 'warning'
        })
      } else {
        console.log("hello==" + _self.currBook.bkNickName);
        var url = _self._CONTEXTURL + "/bookComm/addComm";
        var params = {};
        params.bookId = _self.currBook.bookId;
        params.bookName = _self.currBook.bookName;
        params.commNickName = _self.user.nickName;
        params.comment = _self.comment;
        params.createTime = new Date();
        params.nickName = _self.currBook.bkNickName;
        _self.bookComment.bookId = params.bookId;
        _self.bookComment.bookName = params.bookName;
        _self.bookComment.commNickName = params.commNickName;
        _self.bookComment.comment = params.comment;
        _self.bookComment.createTime = params.createTime;
        _self.bookComment.nickName = params.nickName;
        _self.$ajax.put(url, params, _self.headerConfig).then(function (response) {
          if (response.data.code === 200) {
            _self.currBook.commNum = _self.currBook.commNum + 1;
            _self.commentList.push(_self.bookComment);
            _self.comment = '';
          } else {
            _self.$message({
              message: response.data.message,
              type: 'warning'
            })
            _self.comment = '';
          }
        });
      }
    },
    //展示评论对话框
    showComment(item) {
      let _self = this;
      _self.disabled = false;
      _self.currBook = item;
      _self.commentList = [];
      _self.dialogVisible = true;
      _self.queryBookName = item.bookName;
      let url = _self._CONTEXTURL + "/base/comList?bookName=" + _self.queryBookName + "&pageNum=1&pageSize=5";
      _self.$ajax.get(url, _self.headerConfig).then(function (response) {
        _self.commentSize = 0;
        _self.commentTotal = response.data.total;
        _self.pageNum = 0;
        _self.load();
        // if (_self.pageNum !== 1) {
        //   _self.pageNum = 0;
        //   _self.load();
        // }
      });
    },
    //获取所有评论（进行分页）
    getComment() {
      let _self = this;
      let url = _self._CONTEXTURL + "/base/comList?bookName=" + _self.queryBookName + "&pageNum=" + _self.pageNum + "&pageSize=" + _self.pageSize;
      _self.$ajax.get(url, _self._config).then(function (response) {
        if (response.data.code === 200) {
          _self.commentList = [..._self.commentList, ...response.data.data]
          _self.commentSize = _self.commentList.length;
          _self.disabled = false;
        }
      });
    },
    load() {
      this.loading = true;
      if (this.commentSize < this.commentTotal) {
        this.disabled = true;
        setTimeout(() => {
          this.pageNum += 1;
          this.getComment();
          this.loading = false;
        }, 1000);
      } else {
        this.loading = false;
        this.disabled = true;
      }
    },
    dialogClose() {
      this.disabled = false;
      this.comment = '';
    }
  }
}
</script>

<style scoped>
/* 利用穿透，设置input边框隐藏 */
.inputDeep >>> .el-input__inner {
  border: 0;
}

/* 如果你的 el-input type 设置成textarea ，就要用这个了 */
.inputDeep >>> .el-textarea__inner {
  border: 0;
  resize: none; /* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
}

.buttonDeep >>> .el-button {
  border: 0;
}

.buttonIconFocus >>> .el-button:focus {
  background-color: white;
}

.buttonIconHover >>> .el-button:hover {
  background-color: white;
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

.commentInput >>> .el-input__inner {
  background-color: white;
  border: none;
  line-height: 30px;
  font-size: 15px;
}

.dialogDeep >>> .el-dialog {
  float: right;
  margin-right: 20px;
}

.dialogDeepBody >>> .el-dialog__body {
  height: 400px;
}
</style>