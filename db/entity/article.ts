import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Comment } from './comment'
import { User } from './user'

@Entity('articles')
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  title!: string

  @Column()
  content!: string

  @Column()
  views!: number

  @Column()
  create_time!: Date

  @Column()
  update_time!: Date

  //   假删除
  @Column()
  is_delete!: number

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @OneToMany(() => Comment, (comment) => comment.article)
  comments!: Comment[]
}
