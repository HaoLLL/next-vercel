// 对象关系映射
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user'

// 加！：变量的值不会是null undefined
@Entity({ name: 'user_auths' })
export class UserAuth extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  identity_type!: string

  @Column()
  identifier!: string

  @Column()
  credential!: string

  //  你可以在@ManyToOne / @OneToMany关系中省略@JoinColumn，除非你需要自定义关联列在数据库中的名称
  //  @ManyToOne可以单独使用，但@OneToMany必须搭配@ManyToOne使用
  // 多的一方 建立关系 自己的user_id 是User对象对应的表的id
  // 默认关联userId 
  // JoinColumn的user_id绑定一个user对象 ManyToOne级联查询或者存储User对象
  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: User
}
