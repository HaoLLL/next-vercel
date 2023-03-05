export default function About() {
  console.log('渲染')
  return (
    <>
      <p>Abount</p>
    </>
  )
}
/**
 * 营销页面 博客文章和个人简历  电商产品列表 帮助和文档
 *
 * “我可以在用户请求之前预先渲染此页面吗？” 如果答案是肯定的，则应选择“静态生成”。
 * 如果你无法在用户请求之前预渲染页面，则“静态生成” 不是 一个好主意。
 * 这也许是因为你的页面需要显示频繁更新的数据，并且页面内容会随着每个请求而变化
 *
 * 静态生成+客户端渲染
 * 服务器渲染
 * @param time
 * @returns
 */
// function timeout(time:any){
//     return new Promise<void>((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve()
//         },time)
//     })
// }

// 构建时候 被调用
//每次打包的时候执行 开发的时候 每次请求的时候执行
// export async function getStaticProps(){
//     console.log('getStaticProps');

//     await new Promise<void>((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve();
//             console.log('ss');
//         },2000);
//     });
//     return {
//         props:{
//             name:'L'
//         }
//     }
// }
// 有关Promise
function test() {
  Promise.resolve(42) //Promise的初始化
  new Promise((resolve, reject) => {
    resolve(42)
  })
  Promise.reject(new Error('出错了'))
  const errPromise = new Promise((resolve, reject) => {
    reject(new Error('出错了'))
  })

  /** 执行顺序 Promise中的立即执行 */
  const promise = new Promise(function (resolve) {
    console.log('inner promise') // 1
    resolve(42)
  })
  promise.then(function (value) {
    console.log(value) // 3
  })
  console.log('outer promise') // 2

  /** return 可以是Promise */
}

/** rejct的不能处理 */
function throwError(value: number) {
  // 抛出异常
  throw new Error(value + '')
}
// <1> onRejected不会被调用
function badMain(onRejected: any) {
  return Promise.resolve(42).then(throwError, onRejected)
}
// <2> 有异常发生时onRejected会被调用
function goodMain(onRejected: any) {
  return Promise.resolve(42).then(throwError).catch(onRejected)
}
// 运行示例
// badMain(function(){
//     console.log("BAD");
// });
// goodMain(function(){
//     console.log("GOOD");
// });
