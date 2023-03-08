import { navs } from './config'
import styles from './index.module.scss'
import Link from 'next/link'
import { Button, Avatar, MenuProps } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useStore } from 'store'
import { Dropdown, message, Space } from 'antd'
import Login from 'components/login'

import { AppstoreOutlined, ContainerOutlined } from '@ant-design/icons'
export default function NavBar() {
  const { pathname, push } = useRouter()
  const handleLogin = () => {
    setShowLogin(true)
  }
  const [isShowLogin, setShowLogin] = useState(false)
  const [avatar, setAvatar] = useState(
    useStore((state: any) => state.user?.userInfo?.avatar),
  )
  const [userId, setUserId] = useState(
    useStore((state: any) => state.user?.userInfo?.userId),
  )
  const handleClose = () => {
    setShowLogin(false)
  }

  useStore.subscribe((state: any) => {
    console.log('susbscibe')
    console.log(state)
    // setAvatar(state.user?.userInfo?.avatar)
    // setUserId(state.user?.userInfo?.userId)
  })
  console.log('update')

  //个人主页 退出登录
  const items = [
    {
      label: '个人主页',
      key: '1',
      icon: <AppstoreOutlined />,
    },
    {
      label: '退出登录',
      key: '2',
      icon: <ContainerOutlined />,
    },
  ]

  const logout = () => {}
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      push(`/user/${userId}`)
      message.info(`Click on item ${key}`)
    } else {
      logout()
    }
  }
  const handleGotoEditorPage = () => {
    if (userId) {
      push('/editor/new')
    } else {
      message.warning('请先登录')
    }
  }

  console.log(avatar)
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
        {avatar ? (
          <Dropdown menu={{ items, onClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar size="large" src={avatar} />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        )}
      </section>
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  )
}
