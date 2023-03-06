// 对象关系映射
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

// 加！：变量的值不会是null undefined
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  nickname!: string

  @Column()
  job!: string

  @Column()
  avatar!: string

  @Column()
  introduce!: string
}
