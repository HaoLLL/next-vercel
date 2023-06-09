import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Article } from './article'
import { User } from './user'
@Entity('tags')
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  title!: string

  @Column()
  icon!: string

  @Column()
  follow_count!: number

  @Column()
  article_count!: number

  //和user 多对多 建立关联表
  @ManyToMany(() => User, {
    cascade: true,
  })
  @JoinTable({
    name: 'tags_users_rel',
    joinColumn: {
      name: 'tag_id',
    },
    inverseJoinColumn: {
      name: 'user_id',
    },
  })
  users!: User[]

  //和article 多对多  建立关联表
  @ManyToMany(
    () => Article,
    (article) => {
      article.tags
    },
  )
  @JoinTable({
    name: 'tags_articles_rel',
    joinColumn: {
      name: 'tag_id',
    },
    inverseJoinColumn: {
      name: 'article_id',
    },
  })
  articles!: Article[]
}
