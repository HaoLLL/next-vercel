import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      {/* 是根据路由更换的部分 这样导航和页脚 显示在每一个页面上面 */}
      <Component {...pageProps} />
    </Layout>
  )
}
