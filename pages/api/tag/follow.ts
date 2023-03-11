import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { IronOptions } from 'config'
import { ISession } from 'pages/api/index'
import { initDB } from 'db'
import { Tag } from 'db/entity/tag'
import { User } from 'db/entity/user'
// 从req中取出session 是保存的cookie

// tagId; type; userId
// 修改关联表；tag的关注+1
// 找user  没有就是没有登录
// 找到users  操作users对象

export default withIronSessionApiRoute(follow, IronOptions)
async function follow(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session
  const { tagId, type } = req.body

  const db = await initDB()
  const tagRepo = db.getRepository(Tag)
  const userRepo = db.getRepository(User)

  const user = await userRepo.findOne({ where: { id: session.userId } })
  if (!user) {
    res.status(200).json({
      msg: '未登录',
      code: 0,
    })
    return
  }
  //   relations:是属性
  const tag: any = await tagRepo.findOne({
    relations: ['users'],
    where: { id: tagId },
  })
  console.log(tag)
  console.log(user)
  if (tag?.users) {
    if (type === 'follow') {
      tag.users = tag?.users?.concat([user])
      tag.follow_count = tag.follow_count + 1
    } else if (type === 'unfollow') {
      tag.users = tag?.users?.filter((user: any) => user.id !== session.userId)
      tag.follow_count = tag.follow_count - 1
    }
  }
  console.log(tag)

  if (tag) {
    const resTag = await tagRepo.save(tag)
    res.status(200).json({
      data: resTag,
      code: 0,
      msg: '保存成功',
    })
  } else {
    res.status(200).json({
      code: -1,
      msg: '保存失败',
    })
  }
}
