import { initDB } from "db"
import { Article } from "db/entity/article"
import ListItem from 'components/listItem'
import {IArticle} from 'pages/api/index'
import {Avatar} from 'antd'
import styles from './index.module.scss'
import {useStore} from 'store'
import Markdown from 'markdown-to-jsx'
import Link from "next/link"
import {format} from 'date-fns'
interface IProps {
    article:IArticle
  
  }

export default function ArticleDetail(props:IProps){
    const {article} = props
    const {user:{nickname,avatar,id}} = article
    const userId = useStore((state: any) => state.user?.userInfo?.userId);
    return (
        <div>
            <div className="content-layout">
                <h2 className={styles.title}>{article.title}</h2>
                <div className={styles.user}>
                    <Avatar src={avatar} size={50}></Avatar>
                    <div className={styles.info}>
                        <div className={styles.name}>{nickname}</div>
                        <div className={styles.date}>
                            <div>{format(new Date(article.update_time),'yyyy-MM-dd HH:mm:ss')}</div>
                            <div className={styles.views}>阅读数：{article.views}</div>
                        </div>
                        {
                            Number(userId) === Number(id) && 
                            <Link href={`/editor/${article.id}`}>编辑</Link>
                        }
                    </div>
                </div>
                <Markdown className={styles.markdown}>{article.content}</Markdown>
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
  
    return {
      props:{
        article:JSON.parse(JSON.stringify(article))
      }
    }
  
  }
  