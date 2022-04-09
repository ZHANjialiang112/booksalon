<template>
  <div>
    <el-row v-for="(item,index) in showList" :key="index" :gutter="12"
            style="margin-left: 28%;">
      <el-col :span="8">
        <div :class="color" style="height: 30px;text-align: left">
          <el-avatar :size="68" shape="circle">{{ item.bkNickName }}</el-avatar>
        </div>
        <el-card :body-style="{padding: '0px'}" :header=item.bookName shadow="hover"
                 style="width: 800px ">
          <div>
            <!--              图书图片-->
            <div style="float: left;height: 290px;width: 250px">
              <el-avatar :size="230" shape="square"
                         src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                         style="margin-top: 15px"></el-avatar>
              <div style="position:relative;float: left;width: 100%;height: 35px">
                <span
                    style="float:left;margin-left: 40px;font-size: 24px;text-align: left;">{{ item.bookAuther }}(著)</span>
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
                <el-button @click="showComment(item)"><i class="el-icon-delete"></i></el-button>
              </el-tooltip>
            </div>
            <div v-if="deleteButton" class="buttonDeep buttonIconFocus buttonIconHover" style="float: right;width: 10%">
              <el-tooltip class="item" content="修改" effect="light" placement="bottom-start">
                <el-button @click="showComment(item)"><i class="el-icon-edit-outline"></i></el-button>
              </el-tooltip>
            </div>
          </div>

        </el-card>
        <br>
      </el-col>
    </el-row>
    <div class="dialogDeep">
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
      collectStar: 'el-icon-star-off',
      //用户可以选择既定的背景颜色
      color: 'imageBackground4',
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
      config: {
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
    changeCollectStar(book) {
      var _self = this;
      if (_self.collectStar === 'el-icon-star-off') {
        console.log(book);
        _self.collectStar = 'el-icon-star-on';
      } else if (_self.collectStar === 'el-icon-star-on') {
        console.log(book);
        _self.collectStar = 'el-icon-star-off';
      }
    },
    collectStarOn() {
      //TODO 点亮收藏按钮(用户实现收藏操作)
    },
    collectStarOff() {
      //TODO 关闭收藏按钮（用户取消收藏操作）
    },
    //添加评论
    addComment() {
      var _self = this;
      if (_self.user == null) {
        _self.$message({
          message: '请先登录',
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
        _self.$ajax.put(url, params, _self.config).then(function (response) {
          if (response.data.code === 200) {
            debugger;
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
      console.log(JSON.stringify(_self.currBook));
      _self.commentList = [];
      _self.dialogVisible = true;
      _self.queryBookName = item.bookName;
      let url = _self._CONTEXTURL + "/base/comList?bookName=" + _self.queryBookName + "&pageNum=1&pageSize=5";
      _self.$ajax.get(url, _self._config).then(function (response) {
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