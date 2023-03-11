import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { IronOptions } from 'config'
import { ISession } from 'pages/api/index'
import { initDB } from 'db'
import { EXCEPTION_ARTICLE } from 'pages/api/config/code'
import { Tag } from 'db/entity/tag'
// 从req中取出session 是保存的cookie
export default withIronSessionApiRoute(get, IronOptions)
async function get(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session

  const db = await initDB()
  const tagRepo = db.getRepository(Tag)

  const followTags = await tagRepo
    .createQueryBuilder('tag')
    .leftJoinAndSelect('tag.users', 'user')
    .where('user.id = :id', { id: session.userId })
    .getMany()
  const allTags = await tagRepo.find({ relations: ['users'] })
  //   const allTags = await tagRepo
  //     .createQueryBuilder('tag')
  //     .leftJoinAndSelect('tag.users', 'user')
  //     .getMany()

  if (allTags) {
    res.status(200).json({
      data: { followTags, allTags },
      code: 0,
      msg: '发布成功',
    })
  } else {
    res.status(200).json({
      ...EXCEPTION_ARTICLE.PUBLISH_FIALED,
    })
  }
}
