import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exam')
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  recruit_id: string;

  @Column({
    nullable: false,
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
