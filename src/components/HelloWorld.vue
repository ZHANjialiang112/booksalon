<template>
  <div>
    <div class="box">
      <h2>用户登录</h2>
      <el-form v-model="loginParams">
        <div class="inputBox">
          <input type="text" v-model="loginParams.eMail"  name="" required oninvalid="setCustomValidity('Please enter your count!');"
                 oninput="setCustomValidity('');">
          <label>邮箱地址</label>
        </div>
        <div class="inputBox">
          <input type="password" v-model="loginParams.passWord"  name="" required oninvalid="setCustomValidity('Please enter your password!');"
                 oninput="setCustomValidity('');">
          <label>密码</label>
        </div>
<!--        <el-input v-model="authCode" placeholder="请输入验证码"  style="width: 100px"></el-input><br>-->
<!--        <input type="submit" name="" value="登录">-->
        <el-button style="color: #ffffff;"  type="text" @click="loginSubmit">登录</el-button>
        <p style="color: white">------------------------</p>
<!--        <input type="submit" name="" value="注册">-->
        <el-button style="color: #606266;"  type="text" @click="dialogFormVisible = true,title = '用户注册'">注册</el-button>
<!--        <input type="submit" name="" value="忘记密码">-->
        <el-button type="text" style="color: #606266;" @click="dialogFormVisible = true,title = '忘记/修改密码'">忘记/修改密码</el-button>

      </el-form>
    </div>

    <el-dialog :title=title  :visible.sync="dialogFormVisible" width="20%">
      <el-form :model="form">
        <el-form-item label="邮箱"  :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="输入用户邮箱" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.name" placeholder="输入用户密码"   autocomplete="off"></el-input>
        </el-form-item>
        <div style="display: inline">
          <el-input v-model="authCode" placeholder="验证码"
                    style="position: relative;  width: 100px;float: left;left: 25%"></el-input>
          <el-button style="position: absolute;  float:right;" @click="getAuthCode">获取验证码</el-button>
        </div>
        <br>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      title:'',
      authCode:"",
      loginParams:{
        eMail:'',
        passWord:''
      },
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    };
  },
  methods:{
    getAuthCode(){
    //TODO 添加获取用户验证码
    },
    loginSubmit(){
      console.log(this.loginParams);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  position: absolute;
  top: 35%;
  left: 70%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 40px;
  /*background:rgba(0,0,0,.8);*/
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .5);
  border-radius: 10px; /*登录窗口边角圆滑*/
}

.box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.box .inputBox {
  position: relative;
}

.box .inputBox input {
  width: 100%;
  padding: 10px 0;
  font-side: 16px;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 30px; /*输入框设置*/
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.box .inputBox label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.box .inputBox input:focus ~ label,
.box .inputBox input:valid ~ label {
  top: -18px;
  left: 0;
  color: #03a9f4;
  font-size: 12px;
}

.box input[type="submit"] {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  /*background: #03a9f4;*/
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
