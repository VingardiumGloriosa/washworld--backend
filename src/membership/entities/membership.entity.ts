import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { MembershipType } from './membership_type.entity';
import { User } from './user.entity';

@Entity('memberships')
export class Membership {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => MembershipType, (type) => type.memberships)
  @JoinColumn({ name: 'membership_type_id' })
  membershipType: MembershipType;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({ type: 'text' })
  status: string;

  @OneToMany(() => User, (user) => user.membership)
  users: User[];
}
