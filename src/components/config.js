export const isLogin = ref(false)

const formItemsFields = {
  userName: 'userName',
  account: 'account',
  pwd: 'pwd',
  pwdAgain: 'pwdAgain'
}

export const formItems = [
  { isLogin: false, label: '昵称', prop: formItemsFields.userName, placeholder: '请输入昵称', type: 'text', showPassword: false, clearable: true },
  { isLogin: true, label: '账号', prop: formItemsFields.account, placeholder: '请输入账号', type: 'text', showPassword: false, clearable: true },
  { isLogin: true, label: '密码', prop: formItemsFields.pwd, placeholder: '请输入密码', type: 'password', showPassword: true, clearable: true },
  { isLogin: false, label: '重输密码', prop: formItemsFields.pwdAgain, placeholder: '请再次输入密码', type: 'password', showPassword: true, clearable: true },
]

export const formData = reactive({
  [formItemsFields.userName]: '',
  [formItemsFields.account]: '',
  [formItemsFields.pwd]: '',
  [formItemsFields.pwdAgain]: ''
})

const checkUserName = (rule, value, callback) => {
  if (isLogin.value && (value.length < 1 || value.length > 20)) {
    callback(new Error('昵称输入长度为1-20'))
  } else {
    callback()
  }
}

const checkAccount = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入账号'))
  } else if (!/^[\d.]+$/.test(value)) {
    callback(new Error('请输入数字'))
  } else if (6 > value.length || value.length > 11) {
    callback(new Error('账号输入长度为6-11'))
  } else {
    callback()
  }
}

const checkpwd = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入密码'))
  } else if (!/^.*(?=.{6,20})(?=.*\d)(?=.*[A-z])(?=.*[!@#$%^&*?_]).*$/.test(value)) {
    callback(new Error('密码长度为6-20，包含至少一个字母，一个数字和一个其他字符'))
  } else {
    callback()
  }
}

const checkpwdAgain = (rule, value, callback) => {
  if (isLogin.value && value !== formData.pwd) {
    callback(new Error('两次密码输入不一致，请重新输入'))
  } else {
    callback()
  }
}

export const formRules = reactive({
  [formItemsFields.userName]: [{ validator: checkUserName, trigger: 'blur' }],
  [formItemsFields.account]: [{ validator: checkAccount, trigger: 'blur' }],
  [formItemsFields.pwd]: [{ validator: checkpwd, trigger: 'blur' }],
  [formItemsFields.pwdAgain]: [{ validator: checkpwdAgain, trigger: 'blur' }],
})