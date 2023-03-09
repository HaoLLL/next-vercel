import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Article } from './article'
import { User } from './user'

@Entity('comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  content!: string

  @Column()
  create_time!: Date

  @Column()
  update_time!: Date

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @ManyToOne(() => Article, {
    cascade: true,
  })
  @JoinColumn({ name: 'article_id' })
  article!: Article
}
