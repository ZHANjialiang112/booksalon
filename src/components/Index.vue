<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
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
      testText: '在使用element-ui 框架做vue 项目树结构时，发现需要固定树结构的宽度，而且树结构的字段有可能会特别长，' +
          '一行根本无法显示，加长又会影响展示效果，div 的宽度固定，写了样式覆盖掉el-tree 内部的结构' +
          '在使用element-ui 框架做vue 项目树结构时，发现需要固定树结构的宽度，而且树结构的字段有可能会特别长，' +
          '一行根本无法显示，加长又会影响展示效果，',
      testText1: '在使用element-ui 框架做vue 项目树结构时，发现需要固定树结构的宽度，而且树结构的字段有可能会特别长，' +
          '一行根本无法显示，加长又会影响展示效果项目树结构时特别长，' +
          '一行根本无法显示，加长又会影响展示效果，，',
      collectStar: 'el-icon-star-off',
      showList: [
        {name: 'first'},
        {name: 'second'},
        {name: 'third'},
      ],
      selected: 'A',
      options: [
        {text: 'One', value: 'A'},
        {text: 'Two', value: 'B'},
        {text: 'Three', value: 'C'}
      ]
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
</style>