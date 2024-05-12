import { Membership_Type } from 'src/membership_type/entities/membership_type.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('memberships')
export class Membership {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Membership_Type, (type) => type.memberships)
  @JoinColumn({ name: 'membership_type_id' })
  membershipType: Membership_Type;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({ type: 'text' })
  status: string;

  @OneToMany(() => User, (user) => user.membership)
  users: User[];
}
