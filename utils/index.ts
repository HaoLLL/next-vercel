 interface ICookies {
    nickname:string,
    avatar:string,
    id:number,
 }
export const setCookie = (cookies:any,{nickname,avatar,id}:ICookies)=>{
    const expires = new Date(Date.now()+24*60*60*1000);
    // 允许访问的path
    const path = '/'
    cookies.set('userId',id,{
        path,
        expires
    })
    cookies.set('nickname',nickname,{
        path,
        expires
    })
    cookies.set('avatar',avatar,{
        path,
        expires
    })

}