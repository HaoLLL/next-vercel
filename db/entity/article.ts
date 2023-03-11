import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Comment } from './comment'
import { Tag } from './tag'
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

  // 保存的时候 需要映射
  @ManyToMany(() => Tag, (tag) => tag.articles, {
    cascade: true,
  })
  // 级联查找的时候
  @JoinTable({
    name: 'tags_articles_rel',
    joinColumn: {
      name: 'article_id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
    },
  })
  tags!: Tag[]
}
