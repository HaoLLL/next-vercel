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
  identity_types!: number

  @Column()
  identity_type!: string

  @Column()
  identifier!: string

  @Column()
  credential!: string

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: User
}
