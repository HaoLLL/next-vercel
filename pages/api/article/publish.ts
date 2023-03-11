import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { IronOptions } from 'config'
import { ISession } from 'pages/api/index'
import { User } from 'db/entity/user'
import { initDB } from 'db'
import { Article } from 'db/entity/article'
import { EXCEPTION_ARTICLE } from 'pages/api/config/code'
import { Tag } from 'db/entity/tag'
// 从req中取出session 是保存的cookie
export default withIronSessionApiRoute(publish, IronOptions)
async function publish(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session
  const { title, content, tagIds } = req.body

  const db = await initDB()
  const userRepo = db.getRepository(User)
  const articleRepo = db.getRepository(Article)
  const tagRepo = db.getRepository(Tag)
  console.log(tagIds)
  const tags = await tagRepo.find({
    where: tagIds.map((tagId: number) => ({ id: tagId })),
  })
  console.log(tags)

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
  //   用选中的tagId 查找tag信息 包含article 把这个article加进去 tag的article_count+1
  if (tags) {
    const newTags = tags.map((tag: any) => {
      tag.article_count = tag.article_count + 1
      return tag
    })
    article.tags = newTags
  }
  console.log(article)
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
