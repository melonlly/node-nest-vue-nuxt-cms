import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  recruit_id: string;

  @Column({
    nullable: true,
  })
  status: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: true,
  })
  sex: string;

  @Column({
    nullable: true,
  })
  nation: string;

  @Column({
    nullable: true,
  })
  politics: string;

  @Column({
    nullable: true,
  })
  card_type: string;

  @Column({
    nullable: false,
  })
  card_no: string;

  @Column({
    nullable: true,
  })
  base: string;

  @Column({
    nullable: true,
  })
  base_phone: string;

  @Column({
    nullable: true,
  })
  born: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
  })
  postcode: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: true,
  })
  createdAt: Date;

  @Column({
    nullable: true,
  })
  updatedAt: Date;
}
