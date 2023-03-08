import Link from "next/link";
import {IArticle} from 'pages/api/index'
import styles from './index.module.scss'
import { EyeOutlined } from '@ant-design/icons'
import {Avatar} from 'antd'
import {formatDistanceToNow} from 'date-fns'
import {markdownToTxt} from 'markdown-to-txt'
interface IProps {
    article:IArticle
}
export default function ListItem(props:IProps){
    
    const {article} = props;
    const {user} = article
    console.log(article.user);
    return (
        <Link href={`/article/${article.id}`}>
            <div className={styles.container}>
                <div className={styles.article}>
                    <div className={styles.userInfo}>
                        <span className={styles.name}>{user?.nickname}</span>
                        <span className={styles.date}>{formatDistanceToNow(new Date(article?.update_time))}</span>
                    </div>
                    <h4  className={styles.title}>{article?.title}</h4>
                    {/* markdown转TXT 省略号 */}
                    <p  className={styles.content}>{markdownToTxt(article?.content)}</p>
                    <div className={styles.statistics}>
                    <EyeOutlined/>
                    <span className={styles.views}>{article.views}</span>
                    </div>
                
                </div>
                <Avatar src={user.avatar} size={48}></Avatar>
            </div>
        </Link>    
    )
}