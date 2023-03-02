//posts/1 访问
import styles from './index.module.css'
export default function Post1(props:any){
    console.log(props.post);
    
    return (
        <>
        <div className={styles.postName}>{props.post.name}</div>
        <div>{props.post.name}</div>
        </>
        
    )
}
const posts =  [{id:'1',name:'post1'},{id:'2',name:'post2'},{id:'3',name:'post3'}];
// 返回可以满足的所有id  没有1的时候 报404
export async function getStaticPaths(){
    const paths = posts.map((post)=>{
        return {
            params:{id:post.id}
        }
    })
    //paths;{{params:{id:'1'}},{},{}}
    // We'll pre-render only these paths at build time.
    // 必须是params 这个参数 包含所有能被匹配的选项 
    return {paths,fallback:false}
}
// 必须有这个函数 否则视为没有要渲染的数据 命中的哪一条的信息
// 接收返回的是 匹配的那一个 {params:{id:'2'}}
export async function getStaticProps(props:any){
    console.log(props.params.id);
    const post = posts[props.params.id];
    

    return {props:{post}};

}