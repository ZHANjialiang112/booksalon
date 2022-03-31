<template>
  <div>
    <el-row v-for="(item,index) in showList" :key="index" :gutter="12"
            style="margin-left: 28%;">
      <el-col :span="8">
        <div :class="color" style="height: 30px;text-align: left">
          <el-avatar :size="68" shape="circle">{{ item.name }}</el-avatar>
          <p></p>
        </div>
        <el-card :body-style="{padding: '0px'}" :header=item.name shadow="hover"
                 style="width: 800px ">
          <div>
            <!--              图书图片-->
            <div style="float: left;height: 290px;width: 250px">
              <el-avatar :size="230" shape="square"
                         src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                         style="margin-top: 15px"></el-avatar>
              <!--                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"-->
              <!--                style="position: relative;float: left;width: 250px;height: 250px" >-->
              <div style="position:relative;float: left;width: 100%;height: 35px">
                <span style="float:left;margin-left: 40px;font-size: 24px;text-align: left;">{{ item.name }}(著)</span>
              </div>
            </div>
            <!--              图书的简介和发布者的感悟-->
            <div style="float: right;height: 290px;width: 550px">
              <div class="inputDeep" style="height: 110px">
                <span style="font-size: 20px;float: left">简介：</span>
                <el-input
                    v-model="testText1" :autosize="{ minRows: 2, maxRows: 3}"
                    :readonly="true"
                    style="background-color: white"
                    type="textarea"
                ></el-input>
              </div>
              <div class="inputDeep" style="height: 180px">
                <span style="font-size: 20px;float: left">个人感悟：</span>
                <el-input
                    v-model="testText" :autosize="{ minRows: 2, maxRows: 6}"
                    :readonly="true"
                    style="background-color: white"
                    type="textarea"
                >
                </el-input>
              </div>
            </div>
          </div>
          <!--            <div style="position:relative;float: left;width: 100%;height: 35px">-->
          <!--              <span style="float:left;margin-left: 100px;font-size: 24px;text-align: left;">{{item.name}}(著)</span>-->
          <!--            </div>-->
          <hr>
          <div style="position: relative;  float: bottom">
            <div class="buttonDeep buttonIconFocus buttonIconHover" style="float: right;width: 10%">
              <el-tooltip class="item" content="评论" effect="light" placement="bottom-start">
                <el-button><i class="el-icon-chat-dot-round"></i></el-button>
              </el-tooltip>
            </div>
            <!--              收藏按钮-->
            <div class="buttonDeep buttonIconFocus buttonIconHover" style="float: right;width: 10%">
              <el-tooltip class="item" content="收藏" effect="light" placement="bottom-start">
                <el-button @click="changeCollectStar(item)"><i :class=collectStar></i></el-button>
              </el-tooltip>
            </div>
          </div>
          <br><br>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "BookCard",
  props: {},
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
      //用户可以选择既定的背景颜色
      color: 'imageBackground4',
      showList: [
        {name: 'first'},
        {name: 'second'},
        {name: 'third'},
      ],
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
</style>