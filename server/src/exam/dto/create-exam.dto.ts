import { Recruit } from "src/recruit/recruit.entity";
import { User } from "src/users/users.entity";

export class CreateExamDto {
  id: string;
  recruitId: string;
  recruit: Recruit;
  userId: string;
  user: User;
  period: string;
  subject: string;
  score: string;
  createdAt: Date;
  updatedAt: Date;
}
