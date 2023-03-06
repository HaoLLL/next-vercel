import { NextApiRequest, NextApiResponse } from 'next'
import request from 'service/fetch'
import { withIronSessionApiRoute } from 'iron-session/next'
import { IronOptions } from 'config'
import { ISession } from 'pages/api/index'
import { AppDataSource } from 'db'
import { User } from 'db/entity/user'
// 从req中取出某一个session
export default withIronSessionApiRoute(login, IronOptions)
async function login(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session
  //   const { phone = '', verify = '' } = req.body
  //   console.log(phone + ' ' + verify)
  //   const db = await AppDataSource.initialize()
  //   const userRepo = db.getRepository(User)
  //   console.log(db)
  //   const users = await userRepo.find()
  console.log(session)

  //   if (String(session.verifyCode === String(verify))) {
  // 验证码正确 user_auths里面查找
  //   }

  console.log('!!!!!')
  //   console.log(users)

  //   res.status(200).json({
  //     code: 0,
  //     name: 'lei',
  //   })
}
