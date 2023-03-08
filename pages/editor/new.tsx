import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import { ChangeEvent, useState } from 'react'
import styles from './index.module.scss'
import { Input, Button, message } from 'antd'
import request from 'service/fetch'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
// ;(New as any).layout = null
export default function New() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const handleSubmit = async () => {
    if (!title) {
      message.warning('请输入文章标题')
      return
    }
    const response: any = await request.post('/api/article/publish', {
      title,
      content,
    })
    if (response?.code === 0) {
      message.info('发布成功')
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
  return (
    <div className={styles.container}>
      <div className={styles.operation}>
        <Input
          className={styles.title}
          placeholder="请输入文章标题"
          value={title}
          onChange={handleInputChange}
        ></Input>
        <Button onClick={handleSubmit} type="primary" className={styles.button}>
          发布
        </Button>
      </div>
      <MDEditor height={1080} value={content} onChange={handleContentChange} />
    </div>
  )
}
