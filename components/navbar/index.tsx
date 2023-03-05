import { navs } from './config'
import styles from './index.module.scss'
import Link from 'next/link'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Login from 'components/login'
export default function NavBar() {
  const { pathname, push } = useRouter()
  const handleGotoEditorPage = () => {}
  const handleLogin = () => {
    setShowLogin(true)
  }
  const [isShowLogin, setShowLogin] = useState(false)
  const handleClose = () => {
    setShowLogin(false)
  }
  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => {
          return (
            <Link key={nav?.label} href={nav.value}>
              <span className={pathname === nav?.value ? styles.active : ''}>
                {nav?.label}
              </span>
            </Link>
          )
        })}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleGotoEditorPage}>写文章</Button>
        <Button type="primary" onClick={handleLogin}>
          登录
        </Button>
      </section>
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  )
}
