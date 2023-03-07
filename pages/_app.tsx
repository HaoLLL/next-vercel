import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/layout'
import { NextPage } from 'next'
import {useStore} from 'store'

interface IAppProps{
  initialValue:Record<string,any>,
  Component:NextPage,
  pageProps:any
}

export default function App({ initialValue,Component, pageProps }: IAppProps) {
  const initUserInfo = useStore((state:any)=>state.initUserInfo);
  initUserInfo(initialValue.user);
  return (
    // <StoreProvider initialValue={initialValue}>
      <Layout>
        {/* 是根据路由更换的部分 这样导航和页脚 显示在每一个页面上面 */}
        <Component {...pageProps} />
      </Layout>
    // </StoreProvider>
    
  )
}
App.getInitialProps = async({ctx}:any)=>{
  const {userId,avatar,nickname} = ctx?.req.cookies;
  return {
    initialValue:{
      user:{
        userInfo:{
          avatar,
          userId,
          nickname
        }
      }
    }
  }
}

