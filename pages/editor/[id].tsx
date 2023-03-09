import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { ChangeEvent, useState } from 'react'
import styles from './index.module.scss'
import { Input, Button, message } from 'antd'
import request from 'service/fetch'
import { useStore } from 'store'
  import { useRouter } from 'next/router'

  import { initDB } from "db"
import { Article } from 'db/entity/article'
import dynamic from 'next/dynamic'


const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
;(Edit as any).layout = null
export default function Edit(props:any) {
  const {article} = props
  console.log("ART");
  console.log(article)
  const [title, setTitle] = useState(article.title || '')
  const [content, setContent] = useState(article.content || '')
  const userId = useStore((state: any) => state.user?.userInfo?.userId)
  const { pathname, push,query } = useRouter()
  const articleId = query.id;

  const handleSubmit = async () => {
    if (!title) {
      message.warning('请输入文章标题')
      return
    }
    const response: any = await request.post('/api/article/update', {
      id:articleId,
      title,
      content,
    })
    if (response?.code === 0) {
      message.info('更新成功');
      articleId ? push(`/article/${articleId}`) : push('/')
      //跳转个人中心页面
    } else {
      message.error(response?.msg || '更新失败')
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
          更新
        </Button>
      </div>
      <MDEditor height={1080} value={content} onChange={handleContentChange} />
    </div>
  )
}



export async function getServerSideProps({params}:any){
    // 动态路由的参数部分
    const id= params.id;
    const db = await initDB();
    const articleRepo = db.getRepository(Article);
  
    const article = await articleRepo.findOne({
        where:{id},
        relations:['user']
    });
    return {
      props:{
        article:JSON.parse(JSON.stringify(article))
      }
    }
  
  }
  
