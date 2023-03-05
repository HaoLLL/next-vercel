import NavBar from 'components/navbar'
import Footer from 'components/footer'
import type { NextPage } from 'next'
import { AppProps } from 'next/app'
// const index: NextPage = ({ children }) => {
//   return <div>sdf</div>
// }
// export default index
export default function index({ children }: any) {
  console.log(children)
  return (
    <div>
      <NavBar></NavBar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  )
}
