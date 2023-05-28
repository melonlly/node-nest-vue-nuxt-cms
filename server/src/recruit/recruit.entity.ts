import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recruit')
export class Recruit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  period: string;

  @Column({
    nullable: false,
  })
  plan: string;

  @Column({
    nullable: true,
  })
  createdAt: Date;

  @Column({
    nullable: true,
  })
  updatedAt: Date;
}
