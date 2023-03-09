import { IronSession } from 'iron-session'
export type ISession = IronSession & Record<string, any>

type IUser = {
  id: number
  nickname: string
  job: string
  avatar: string
  introduce: string
}
export type IArticle = {
  id: number
  title: string
  content: string
  create_time: Date
  update_time: Date
  views: number
  user: IUser
  comments?: []
}
