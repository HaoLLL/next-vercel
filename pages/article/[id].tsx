import { initDB } from "db"
import { Article } from "db/entity/article"
import ListItem from 'components/listItem'
import {IArticle} from 'pages/api/index'
import {Avatar,Input,Button,message} from 'antd'
import styles from './index.module.scss'
import {useStore} from 'store'
import Markdown from 'markdown-to-jsx'
import Link from "next/link"
import {format} from 'date-fns'
import {  useState } from "react"
import request from 'service/fetch'
interface IProps {
    article:IArticle
  
  }

export default function ArticleDetail(props:IProps){
    const {article} = props
    const {user:{nickname,avatar:articleAvatar,id}} = article
    const userId = useStore((state: any) => state.user?.userInfo?.userId);
    const avatar = useStore((state: any) => state.user?.userInfo?.avatar);
    const [textValue,setTextValue] = useState('');
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextValue(e.target.value)
      };
    const handleSubmitComment = async()=>{
        if (!textValue) {
            message.warning('请输入文章评论')
            return
          }
          const response: any = await request.post('/api/comment/publish', {
            id:articleId,
            title,
            content,
          })
          if (response?.code === 0) {
            message.info('发表成功');
            //跳转个人中心页面
          } else {
            message.error(response?.msg || '发表失败')
          }

        
    }
    return (
        <div>
            <div className="content-layout">
                <h2 className={styles.title}>{article.title}</h2>
                <div className={styles.user}>
                    <Avatar src={articleAvatar} size={50}></Avatar>
                    <div className={styles.info}>
                        <div className={styles.name}>{nickname}</div>
                        <div className={styles.date}>
                            <div>{format(new Date(article.update_time),'yyyy-MM-dd HH:mm:ss')}</div>
                            <div className={styles.views}>阅读数：{article.views}</div>
                            {
                            Number(userId) === Number(id) && 
                            <Link href={`/editor/${article.id}`}>编辑</Link>
                        }
                        </div>
                    </div>
                </div>
                <Markdown className={styles.markdown}>{article.content}</Markdown>
            </div>
            <div className={styles.divider}></div>
            <div className="content-layout">
              <div className={styles.comment}>
                <h3>评论</h3>
                {
                    userId && (
                        <div className={styles.enter}>
                            <Avatar src={avatar} size={40}></Avatar>
                            <div className={styles.content}>
                                <Input.TextArea  
                                onChange={handleTextChange} 
                                value={textValue} 
                                rows={4} 
                                placeholder='请输入评论'/>
                                <div className={styles.submit}>
                                <Button type='primary' onClick={handleSubmitComment}>发表评论</Button>
                                </div>
                            </div>

                        </div>
                    )
                }

              </div>
            </div>
            
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
    if(article){
        //阅读次数+1
        article.views = article.views+1;
        articleRepo.save(article);
    }
  
    return {
      props:{
        article:JSON.parse(JSON.stringify(article))
      }
    }
  
  }
  