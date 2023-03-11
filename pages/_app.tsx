import '../styles/globals.css'
import Layout from 'components/layout'
import { NextPage } from 'next'
import { useStore } from 'store'

interface IAppProps {
  initialValue: Record<string, any>
  Component: NextPage
  pageProps: any
}

export default function App({ initialValue, Component, pageProps }: IAppProps) {
  console.log('执行！！！！！')
  const initUserInfo = useStore((state: any) => state.initUserInfo)
  if (initialValue.user) {
    console.log('initiValue')
    initUserInfo(initialValue.user)
  }
  // 第一次请求在server端显示 以后在浏览器中显示
  // console.log('app update')
  const renderLayout = () => {
    if ((Component as any).layout === null) {
      return <Component {...pageProps} />
    } else {
      return (
        <Layout>
          {/* 是根据路由更换的部分 这样导航和页脚 显示在每一个页面上面 */}
          <Component {...pageProps} />
        </Layout>
      )
    }
  }
  return <>{renderLayout()}</>
}
//每刷新一次 就执行一次
// 第一次请求的时候 服务端执行 以后得时候 客户端执行
// req ===null 受到getServerSideProps的影响 打包就会执行！！！
App.getInitialProps = async ({ ctx }: any) => {
  console.log('safasdagsdgafgadhgf')
  if (ctx?.req == null) {
    console.log('req == null')
    return {
      initialValue: {},
    }
  } else {
    console.log('req !!!= null')
    const { userId, avatar, nickname } = ctx?.req?.cookies || {}
    return {
      initialValue: {
        user: {
          userInfo: {
            userId,
            avatar,
            nickname,
          },
        },
      },
    }
  }
}
