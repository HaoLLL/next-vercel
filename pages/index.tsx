/**
 * eslint(代码校验 语法错误)+stylelint(ccs样式格式化)+prettier(代码格式化)
 * npm install eslint stylelint stylelint-config-standard-scss
 * preference->setting->code actions on save settings.json中 "source.fixAll.stylelint": true
 * preference->setting->format on save
 *
 * Mockjs 假数据
 * npm install mockjs
 *
 * 自定义目录 alias tsconfig.json
 * "baseUrl": ".",
    "paths": {
      "@/components": ["components/*"]
    }

    npm install sass -D
    npm install antd --save

    短信验证收发 短信平台服务 创建短信模板
    github第三方登录

    短信平台：容联云通信
    服务端验证验证码：服务端保存内存中 redis
    iron-session: next中保存一些信息的库 其他的api路由可以共用 32位随机密码生成器
    自动给客户端发送cookie_name 每次带着cookie 解析字符串 检查是不是登录
    .env.development 环境变量注入 

    remotemysql tomas

    npm install typeorm mysql2
    npm install reflect-metadata --save
 *
 * @returns
 */
export default function home() {
  return <div>Home</div>
}
