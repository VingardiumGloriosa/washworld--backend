import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Membership } from '../../membership/entities/membership.entity';

@Entity('membership_types')
export class Membership_Type {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text' })
  currency: string;

  @Column({ type: 'interval', nullable: true })
  washing_duration?: string;

  @OneToMany(() => Membership, (membership) => membership.membershipType)
  @JoinColumn({ name: 'membership_id' })
  memberships: Membership[];
}
