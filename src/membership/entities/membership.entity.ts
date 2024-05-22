import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Membership_Type } from '../../membership_type/entities/membership_type.entity';
import { User } from '../../user/entities/user.entity';

@Entity('memberships')
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Membership_Type,
    (membershipType) => membershipType.memberships,
  )
  @JoinColumn({ name: 'membership_type_id' })
  membershipType: Membership_Type;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  status: string;

  @OneToOne(() => User, user => user.membership)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
