import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { IronOptions } from 'config'
import { ISession } from 'pages/api/index'
import { AppDataSource } from 'db'
import { User } from 'db/entity/user'
import { UserAuth } from 'db/entity/userAuth'
import { Cookie } from 'next-cookie'
import { setCookie } from 'utils'
// 从req中取出session 是保存的cookie
export default withIronSessionApiRoute(login, IronOptions)
async function login(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session
  const cookies = Cookie.fromApiRoute(req, res)
  let { phone = '', verify = '', identity_type = 'phone' } = req.body
  verify = '0000'
  console.log(session.verifyCode)
  const db = AppDataSource.isInitialized
    ? AppDataSource
    : await AppDataSource.initialize()
  const userAuthsRepo = db.getRepository(UserAuth)
  console.log('sdfadsf')
  console.log(session.verifyCode)
  console.log(verify)

  if (String(session.verifyCode) === String(verify)) {
    // 验证码正确 user_auths里面查找 user:是定义的属性
    const userAuth = await userAuthsRepo.findOne({
      where: {
        identity_type,
        identifier: phone,
      },
      relations: ['user'],
    })
    if (userAuth) {
      // 已经存在的用户 拿到用户信息 存储到session中
      const user = userAuth.user
      const { id, nickname, avatar } = user
      session.userId = id
      session.nickname = nickname
      session.avatar = avatar
      await session.save()
      setCookie(cookies, { nickname, id, avatar })
      res.status(200).json({
        code: 0,
        msg: '登录成功',
        data: {
          userId: id,
          nickname,
          avatar,
        },
      })
    } else {
      //新用户 自动注册
      const user = new User()
      user.nickname = `用户_${Math.floor(Math.random() * 10000)}`
      user.avatar = '/images/avatar.png'
      user.job = ''
      user.introduce = ''

      const userAuth = new UserAuth()
      userAuth.identifier = phone
      userAuth.identity_type = identity_type
      // 没有到有效时间 就默认是登录的模式 cookie 24小时超时
      userAuth.credential = session.verifyCode
      userAuth.user = user //user_id 是一个外键 绑定User表的主键

      const resUserAuth = await userAuthsRepo.save(userAuth)
      const userRes = resUserAuth.user
      const { id, nickname, avatar } = userRes
      session.userId = id
      session.nickname = nickname
      session.avatar = avatar
      await session.save()
      setCookie(cookies, { nickname, id, avatar })
      res.status(200).json({
        code: 0,
        msg: '注册成功',
        data: {
          userId: id,
          nickname,
          avatar,
        },
      })
    }
  } else {
    res.status(200).json({
      code: -1,
      msg: '验证码错误',
    })
  }
}
