<template>
  <div>
    <el-container>
      <el-header>
        <div class="buttonDeep">
          <div v-if="user.nickName" style="float: right">
            <el-tooltip class="item" content="退出登录" effect="light" placement="bottom">
              <el-button style="margin-right: 50px"><i class="el-icon-s-custom" style="margin-right: 15px"></i>
                <router-link to="/logout">{{ user.nickName }}</router-link>
              </el-button>
            </el-tooltip>
            <el-button>
              <router-link to="/homepage">个人首页</router-link>
            </el-button>
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
        <BookCard></BookCard>
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
      user: {
        userEmail: '',
        nickName: 'sdfsda'
      }
    };
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
  }
}
</script>

<style scoped>
body {
  border: 0px solid white;
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
</style>