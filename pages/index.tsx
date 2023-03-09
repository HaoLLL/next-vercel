/**
 * 
 * 服务端渲染：服务端取得数据 直接返回html
 * 查看网站源代码 看是不是有相关的数据
 * 客户端渲染： 饿了吗 js动态描画页面
 * 
 * 
 * 
 * 
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


    typeorm 中使用装饰器
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
    babel转换es5
    npm install @babel/core @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties babel-plugin-transform-typescript-metadata -D

    刷新以后 状态丢失 登录成功 cookie保存后 同步到store中
    next-cookie 保存avatar userId
    App.getInitialProps 获取cookie中的内容 给store

    登录成功：存cookie 改store


    next所有的使用获取数据的方式
    - ssr :每次访问页面 都返回一个静态html 首页
    getServerSideProps 连接数据库 获取数据 给组件返回props
    没有用户交互的内容 使用ssr getServerSideProps
    有用户交互的内容 请求后台接口
    - ssg: 编译的时候就生成了一些静态html 用于官网 动态多的时候 不适用 结合getStaticPaths
    - csr: 

    markdown 还原 npm install markdown-to-txt -S
    markdown 源文件渲染成markdown格式 npm install markdown-to-jsx -S

 *
 * @returns
 */

import { initDB } from 'db'
import { Article } from 'db/entity/article'
import ListItem from 'components/listItem'
import { IArticle } from 'pages/api/index'
import { Divider } from 'antd'
interface IProps {
  articles: IArticle[]
}
export default function Home(props: IProps) {
  return (
    <div>
      {props.articles.length > 0 &&
        props.articles.map((article) => {
          return (
            <div className="content-layout" key={article.id}>
              <div>
                <Divider></Divider>
                <ListItem article={article}></ListItem>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export async function getServerSideProps() {
  const db = await initDB()
  const articleRepo = db.getRepository(Article)

  const articles = await articleRepo.find({
    relations: ['user'],
  })

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  }
}
