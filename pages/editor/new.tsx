import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import { ChangeEvent, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Input, Button, message, Select } from 'antd'
import request from 'service/fetch'
import { useStore } from 'store'
import { useRouter } from 'next/router'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
;(New as any).layout = null
export default function New() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const userId = useStore((state: any) => state.user?.userInfo?.userId)
  const { push } = useRouter()

  const [allTags, setAllTags] = useState([])
  useEffect(() => {
    request('/api/tag/get').then((res: any) => {
      if (res.code == 0) {
        const { allTags } = res.data
        console.log(allTags)
        setAllTags(allTags)
      }
    })
  }, [])

  const handleSubmit = async () => {
    if (!title) {
      message.warning('请输入文章标题')
      return
    }
    const response: any = await request.post('/api/article/publish', {
      title,
      content,
      tagIds,
    })
    if (response?.code === 0) {
      message.info('发布成功')
      userId ? push(`/user/${userId}`) : push('/')
      //跳转个人中心页面
    } else {
      message.error(response?.msg || '发布失败')
    }
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e?.target?.value)
  }
  const handleContentChange = (content: any) => {
    setContent(content)
  }
  const [tagIds, setTagIds] = useState([])
  const handleSelectTag = (value: any) => {
    setTagIds(value)
  }
  return (
    <div className={styles.container}>
      <div className={styles.operation}>
        <Input
          className={styles.title}
          placeholder="请输入文章标题"
          value={title}
          onChange={handleInputChange}
        ></Input>
        <Select
          className={styles.tag}
          mode="multiple"
          allowClear
          placeholder="请选择标签"
          onChange={handleSelectTag}
        >
          {allTags.map((tag: any) => {
            return (
              <Select.Option key={tag.id} value={tag.id}>
                {tag.title}
              </Select.Option>
            )
          })}
        </Select>
        <Button onClick={handleSubmit} type="primary" className={styles.button}>
          发布
        </Button>
      </div>
      <MDEditor height={1080} value={content} onChange={handleContentChange} />
    </div>
  )
}
