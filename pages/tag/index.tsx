// CSR 实现
import { Button, message, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useStore } from 'store'
import * as ANTD_ICONS from '@ant-design/icons'
import request from 'service/fetch'
export default function Tab() {
  const [followTags, setFollowTags] = useState([])
  const [allTags, setAllTags] = useState([])
  const [needRefresh, setNeedRefresh] = useState(false)
  const userId = useStore((state: any) => state?.user?.userInfo?.userId)
  console.log(userId)
  const onChange = (key: string) => {
    console.log(key)
  }
  const handleUnfollow = (tagId: any) => {
    request
      .post('/api/tag/follow', {
        tagId,
        type: 'unfollow',
      })
      .then((res: any) => {
        if (res.code == 0) {
          message.success('取消关注成功')
          setNeedRefresh(!needRefresh)
        } else {
          message.error(res?.msg || '取消关注失败')
        }
      })
  }
  const handleFollow = (tagId: any) => {
    request
      .post('/api/tag/follow', {
        tagId,
        type: 'follow',
      })
      .then((res: any) => {
        if (res.code == 0) {
          message.success('关注成功')
          setNeedRefresh(!needRefresh)
        } else {
          message.error(res?.msg || '关注失败')
        }
      })
  }
  useEffect(() => {
    request('/api/tag/get').then((res: any) => {
      const { followTags, allTags } = res.data
      setFollowTags(followTags)
      setAllTags(allTags)
      console.log(followTags)
      console.log(allTags)
    })
  }, [needRefresh])

  const items: TabsProps['items'] = [
    {
      key: 'follow',
      label: `已关注标签`,
      children: (
        <div className={styles.tags}>
          {followTags?.map((tag: any) => {
            return (
              <div key={tag?.title} className={styles.tagWrapper}>
                <div>{(ANTD_ICONS as any)[tag.icon]?.render()}</div>
                <div className={styles.title}>{tag?.title}</div>
                <div>
                  {' '}
                  {tag?.follow_count} 人关注 {tag?.article_count} 文章
                </div>
                {tag?.users?.find((user: any) => Number(user.id) == userId) ? (
                  <Button
                    type="primary"
                    onClick={() => handleUnfollow(tag?.id)}
                  >
                    已关注
                  </Button>
                ) : (
                  <Button onClick={() => handleFollow(tag?.id)}>关注</Button>
                )}
              </div>
            )
          })}
        </div>
      ),
    },
    {
      key: '2',
      label: `全部标签`,
      children: (
        <div className={styles.tags}>
          {allTags?.map((tag: any) => {
            return (
              <div key={tag?.title} className={styles.tagWrapper}>
                <div>{(ANTD_ICONS as any)[tag.icon]?.render()}</div>
                <div className={styles.title}>{tag?.title}</div>
                <div>
                  {' '}
                  {tag?.follow_count} 人关注 {tag?.article_count} 文章
                </div>
                {tag?.users?.find((user: any) => Number(user.id) == userId) ? (
                  <Button
                    type="primary"
                    onClick={() => handleUnfollow(tag?.id)}
                  >
                    已关注
                  </Button>
                ) : (
                  <Button onClick={() => handleFollow(tag?.id)}>关注</Button>
                )}
              </div>
            )
          })}
        </div>
      ),
    },
    {
      key: '3',
      label: `Tab 3`,
      children: `Content of Tab Pane 3`,
    },
  ]

  // interface ITag {
  //   id: number
  //   title: string
  //   icon: string
  //   follow_count: number
  // }
  return (
    <div className="content-layout">
      <Tabs defaultActiveKey="follow" items={items} onChange={onChange} />
    </div>
  )
}
