import { Recruit } from 'src/recruit/recruit.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('exam')
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Recruit)
  @JoinColumn({ name: 'recruitId' })
  recruit: Recruit;

  @Column({
    nullable: true,
  })
  recruit_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    nullable: true,
  })
  user_id: string;

  @Column({
    nullable: true,
  })
  period: string;

  @Column({
    nullable: true,
  })
  subject: string;

  @Column({
    nullable: true,
  })
  score: string;

  @Column({
    nullable: true,
  })
  createdAt: Date;

  @Column({
    nullable: true,
  })
  updatedAt: Date;
}
