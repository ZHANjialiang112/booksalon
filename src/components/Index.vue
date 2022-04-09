<template>
  <div class="hidden hidden01">
    <el-container>
      <el-header>
        <div>
          <div class="searchDeep searchButtonDeep" style="width: 300px;float: left;margin-left: 100px">
            <el-input v-model="search" clearable placeholder="搜索">
              <el-button slot="prepend"><a><i class="el-icon-search" style="width: 20px;"></i></a></el-button>
            </el-input>
          </div>
          <div class="buttonDeep menuDeep menuDeepItem0 menuDeepItem1 menuDeepItem2 menuDeepHo"
               style="float: left;width: 150px;margin-left: 400px">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">推荐</el-menu-item>
              <el-menu-item index="2">热榜</el-menu-item>
            </el-menu>
          </div>
          <div class="buttonDeep">
            <div v-if="user.nickName" style="float: right">
              <el-tooltip class="item" content="退出登录" effect="light" placement="bottom">
                <el-button style="margin-right: 50px"><i class="el-icon-s-custom" style="margin-right: 15px"></i>
                  <router-link to="/logout">{{ user.nickName }}</router-link>
                </el-button>
              </el-tooltip>
              <el-button>
                <router-link :to="{name:'homepage',query:{userEmail:user.userEmail,nickName:user.nickName}}">个人首页
                </router-link>
              </el-button>
            </div>
            <div v-if="user.nickName === ''" style="float: right">
              <el-button><i class="el-icon-s-custom" style="margin-right: 10px"></i>
                <router-link to="/login"> 登录</router-link>
              </el-button>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <!--        书籍展示卡-->
        <BookCard :delete-button="false" :show-list="showList" :user="user"></BookCard>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import BookCard from './BookCard';

export default {
  name: "Index",
  props: {},
  components: {
    BookCard
  },
  data() {
    return {
      activeIndex: '1',
      user: {
        userEmail: '',
        nickName: '',
        userId: ''
      },
      search: '',
      // showList: [],
      showList: [],
      pageNum: 1,
      pageSize: 10,
    };
  },
  mounted() {
    this.getUser();
    this.recommendBookList();
  },
  methods: {
    handleSelect(key) {
      var _self = this;
      console.log(key);
      if (key === '1') {
        _self.recommendBookList();
      }
      if (key === '2') {
        _self.hotBookList();
      }
    },
    getUser() {
      var _self = this;
      _self.user.userEmail = _self.$route.query.userEmail;
      var userEmail = _self.$route.query.userEmail;
      var url = _self._CONTEXTURL + '/base/getUser?userEmail=' + userEmail;
      _self.$ajax.get(url).then(function (response) {
        if (response.data.code === 200) {
          _self.user.nickName = response.data.data.nickName;
          _self.user.userId = response.data.data.userId;
        }
      });
    },
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
    //推荐书籍列表
    recommendBookList() {
      var _self = this;
      var url = _self._CONTEXTURL + '/base/getBookPage?pageNum=' + _self.pageNum + '&pageSize=' + _self.pageSize + '&search=' + _self.search + '&userId=' + _self.user.userId;
      _self.$ajax.post(url).then(function (response) {
        if (response.data.code === 200) {
          _self.showList = response.data.data;
        } else {
          _self.$message({
            message: response.data.msg,
            type: 'error'
          });
        }
      });
    },
    //热榜书籍查询
    hotBookList() {
      var _self = this;
      var url = _self._CONTEXTURL + '/base/getHotBook?pageNum=' + _self.pageNum + '&pageSize=' + _self.pageSize + '&search=' + _self.search + _self.search + '&userId=' + _self.user.userId;
      _self.$ajax.post(url).then(function (response) {
        if (response.data.code === 200) {
          _self.showList = response.data.data;
        } else {
          _self.$message({
            message: response.data.msg,
            type: 'error'
          });
        }
      });
    },
  }
}
</script>

<style scoped>
body {
  border: 0px solid white;
  overflow: hidden;
}

.el-textarea.is-disabled .el-textarea__inner {
  background-color: #ffffff;
}

.el-textarea__inner {
  border: 0px solid;
}

.buttonDeep >>> .el-button {
  background-color: rgba(0, 0, 0, 0);
  margin-right: 100px;
}

.searchDeep >>> .el-input__inner {
  background-color: rgba(0, 0, 0, 0);
  font-size: 15px;
  font-weight: bold;
  color: blue;
}

.searchButtonDeep >>> .el-button {
  background-color: rgba(0, 0, 0, 0);
}

.menuDeep >>> .el-menu {
  background-color: rgba(0, 0, 0, 0);
}

.menuDeepItem >>> .el-menu-item {
  background-color: rgba(0, 0, 0, 0);
}

.menuDeepItem0 >>> .el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0);
}

.menuDeepItem1 >>> .el-menu-item:focus {
  background-color: rgba(0, 0, 0, 0);
}

.menuDeepItem2 >>> .el-menu-item:active {
  background-color: rgba(0, 0, 0, 0);
}

.menuDeepHo >>> .el-menu.el-menu--horizontal {
  border-bottom: none;
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