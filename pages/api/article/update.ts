import { NextApiRequest, NextApiResponse } from 'next'
import { initDB } from 'db'
import { Article } from 'db/entity/article'
// 从req中取出session 是保存的cookie
// 先找到 然后修改实体变量
// export default withIronSessionApiRoute(update, IronOptions)
export default async function update(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { title, content, id } = req.body
  const db = await initDB()
  const articleRepo = db.getRepository(Article)

  const article = await articleRepo.findOne({
    where: { id },
    relations: ['user'],
  })
  if (article) {
    article.title = title
    article.content = content
    article.update_time = new Date()
    const data = await articleRepo.save(article)
    if (data) {
      res.status(200).json({
        data,
        code: 0,
        msg: '发布成功',
      })
    } else {
      res.status(200).json({
        code: 2003,
        msg: '更新失败',
      })
    }
  } else {
    res.status(200).json({
      code: 2003,
      msg: '未找到文章',
    })
  }
}
