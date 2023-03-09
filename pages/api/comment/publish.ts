import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { IronOptions } from 'config'
import { ISession } from 'pages/api/index'
import { User } from 'db/entity/user'
import { initDB } from 'db'
import { Article } from 'db/entity/article'
import { Comment } from 'db/entity/comment'
// 从req中取出session 是保存的cookie
export default withIronSessionApiRoute(publish, IronOptions)
async function publish(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session
  const { articleId, content } = req.body

  const db = await initDB()
  const userRepo = db.getRepository(User)
  const commentRepo = db.getRepository(Comment)
  const articleRepo = db.getRepository(Article)
  const comment = new Comment()
  comment.content = content
  comment.create_time = new Date()
  comment.update_time = new Date()

  const user = await userRepo.findOne({ where: { id: session.userId } })
  const article = await articleRepo.findOne({ where: { id: articleId } })
  console.log(user)
  if (user) {
    comment.user = user
  }
  if (article) {
    comment.article = article
  }
  const data = await commentRepo.save(comment)
  if (data) {
    res.status(200).json({
      data,
      code: 0,
      msg: '发表成功',
    })
  } else {
    res.status(200).json({
      code: -1,
      msg: '发表失败',
    })
  }
}
