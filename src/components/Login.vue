<template>
  <div>
    <div class="box">
      <h2>用户登录</h2>
      <el-form v-model="loginParams">
        <div class="inputBox">
          <input v-model="loginParams.userEmail" name="" oninvalid="setCustomValidity('Please enter your count!');"
                 required
                 type="text"
                 oninput="setCustomValidity('');">
          <label>邮箱地址</label>
        </div>
        <div class="inputBox">
          <input v-model="loginParams.userPassword" name=""
                 oninvalid="setCustomValidity('Please enter your password!');"
                 required type="password"
                 oninput="setCustomValidity('');">
          <label>密码</label>
        </div>
        <div>
          <div style="float: left;margin-left: 10px">
            <el-checkbox v-model="checked">记住我</el-checkbox>
          </div>
          <div style="float: right;margin-right: 140px">
            <el-button style="color: #ffffff;" type="text" @click="loginSubmit">登录</el-button>
          </div>
        </div>
        <br><br>
        <p style="color: white">------------------------</p>
        <el-button style="color: #606266;" type="text" @click="registerButton">注册</el-button>
        <el-button style="color: #606266;" type="text" @click="updateButton">忘记/修改密码</el-button>

      </el-form>
    </div>

    <el-dialog :title=title :visible.sync="dialogFormVisible" width="20%">
      <el-form ref="registerParams" :model="registerParams" :rules="rulesRegister">
        <el-form-item :label-width="formLabelWidth" label="邮箱" prop="userEmail">
          <el-input v-model="registerParams.userEmail" autocomplete="off" placeholder="输入用户邮箱"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码" prop="userPassword">
          <el-input v-model="registerParams.userPassword" :show-password="true" autocomplete="off" placeholder="输入用户密码"
                    type="password"></el-input>
        </el-form-item>
        <div style="display: inline">
          <el-input v-model="registerParams.authCode" placeholder="验证码"
                    style="position: relative;  width: 100px;float: left;left: 25%"></el-input>
          <el-button style="position: absolute;  float:right;" @click="getAuthCode">获取验证码</el-button>
        </div>
        <br>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerAndUpdate('registerParams')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const Base64 = require('js-base64').Base64
export default {
  name: 'Login',
  props: {
    msg: String
  },
  data() {
    return {
      checked: false,
      title: '',
      rulesRegister: {
        userEmail: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
        ],
        userPassword: [
          {required: true, message: '请输入邮箱密码', trigger: 'blur'},
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
        ]
      },
      loginParams: {
        userEmail: '',
        userPassword: ''
      },
      registerParams: {
        userEmail: '',
        userPassword: '',
        authCode: '',
        titleType: '',//确定registerAndUpdate方法中的操作是注册还是更新修改密码(register,update)
      },
      dialogFormVisible: false,
      formLabelWidth: '120px'
    };
  },
  created() {
    this.getRememberMe()
  },
  methods: {
    registerButton() {
      var _self = this;
      _self.registerParams = _self.loginParams;
      _self.dialogFormVisible = true;
      _self.title = '用户注册';
      _self.registerParams.titleType = 'register';
    },
    updateButton() {
      var _self = this;
      _self.registerParams = _self.loginParams;
      _self.dialogFormVisible = true;
      _self.title = '忘记/修改密码';
      _self.registerParams.titleType = 'update';
    },
    getAuthCode() {
      let _self = this;
      var params = _self.registerParams;
      var url = this._CONTEXTURL + "/base/getRegisterCode?titleType=" + _self.registerParams.titleType;
      var config = {
        "type": "post",
        "url": url,
        "data": JSON.stringify(params),
      }
      this.$ajax.post(url, params, config).then(function (response) {
        if (response.data.code === 200) {
          _self.$message({
            message: response.data.msg,
            type: 'success'
          });
        } else {
          _self.$message({
            message: response.data.msg,
            type: 'warning'
          });
        }
      });
    },
    registerAndUpdate(registerParams) {
      var _self = this;
      var params = _self.registerParams;
      this.$refs[registerParams].validate((valid) => {
        if (valid) {
          var data = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          if (!data.test(params.userEmail)) {
            _self.$message({
              message: '请输入正确的邮箱地址',
              type: 'warning'
            });
            return;
          } else {
            if (params.authCode === '' || params.authCode === undefined || params.authCode.length !== 6) {
              _self.$message({
                message: '请输入6位验证码',
                type: 'warning'
              });
              return;
            }
            var url = this._CONTEXTURL + "/base/updateAndRegister?authCod=" + _self.registerParams.authCode + "&titleType=" + _self.registerParams.titleType;
            var config = {
              "type": "post",
              "url": url,
              "data": params,
            }
            this.$ajax.post(url, params, config).then(function (response) {
              if (response.data.code === 200) {
                _self.$message({
                  message: response.data.msg + '，可以直接登录~',
                  type: 'success'
                });
                _self.loginParams.userEmail = _self.registerParams.userEmail;
                _self.loginParams.userPassword = _self.registerParams.userPassword;
                _self.dialogFormVisible = false;
              } else {
                _self.$message({
                  message: response.data.msg,
                  type: 'warning'
                });
              }
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    loginSubmit() {
      var _self = this;
      var params = _self.loginParams;
      var data = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!data.test(params.userEmail)) {
        _self.$message({
          message: '请输入正确的邮箱地址',
          type: 'warning'
        });
        return;
      } else {
        if (params.userPassword.length < 6 || params.userPassword.length > 12) {
          _self.$message({
            message: '请输入6-12位的密码',
            type: 'warning'
          });
          return;
        }
        var url = this._CONTEXTURL + "/base/login"
        this.$ajax.post(url, params).then(function (response) {
          if (response.data.code === 200) {
            if (_self.checked === true) {
              _self.rememberMe();
            }
            _self.$message({
              message: response.data.msg,
              type: 'success'
            });
            window.localStorage.setItem("Token", response.data.data);
            _self.router.push({path: '/index', query: {userEmail: _self.loginParams.userEmail}});
          } else {
            _self.$message({
              message: response.data.msg,
              type: 'success'
            });
          }
        })
      }
    },
    rememberMe() {
      let _self = this;
      if (_self.checked === true) {
        window.localStorage.setItem("userEmail", _self.loginParams.userEmail);
        window.localStorage.setItem("userPassword", _self.loginParams.userPassword);
      } else {
        window.localStorage.removeItem("userEmail");
        window.localStorage.removeItem("userPassword");
      }
    },
    getRememberMe() {
      let _self = this;
      let userEmail = window.localStorage.getItem("userEmail");
      let userPassword = window.localStorage.getItem("userPassword");
      // 如果存在赋值给表单，并且将记住密码勾选
      if (userEmail !== null && userPassword !== null) {
        _self.loginParams.userEmail = userEmail;
        _self.loginParams.userPassword = userPassword;
        _self.checked = true;
      }
      console.log(_self.loginParams);
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
