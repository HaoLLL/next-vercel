import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { IronOptions } from 'config'
import { ISession } from 'pages/api/index'
import { User } from 'db/entity/user'
import { initDB } from 'db'
import { Article } from 'db/entity/article'
import { EXCEPTION_ARTICLE } from 'pages/api/config/code'
// 从req中取出session 是保存的cookie
export default withIronSessionApiRoute(publish, IronOptions)
async function publish(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session
  const { title, content } = req.body

  const db = await initDB()
  const userRepo = db.getRepository(User)
  const articleRepo = db.getRepository(Article)
  const article = new Article()
  article.title = title
  article.content = content
  article.create_time = new Date()
  article.update_time = new Date()
  article.is_delete = 0
  article.views = 0

  const user = await userRepo.findOne({ where: { id: session.userId } })
  console.log(user)
  if (user) {
    article.user = user
  }
  const data = await articleRepo.save(article)
  if (data) {
    res.status(200).json({
      data,
      code: 0,
      msg: '发布成功',
    })
  } else {
    res.status(200).json({
      ...EXCEPTION_ARTICLE.PUBLISH_FIALED,
    })
  }
}
