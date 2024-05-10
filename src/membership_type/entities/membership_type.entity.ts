import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Membership } from 'src/membership/entities/membership.entity';

@Entity('membership_types')
export class Membership_Type {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'text' })
  currency: string;

  @Column({ type: 'interval', nullable: true })
  washing_duration?: string;

  @OneToMany(() => Membership, (membership) => membership.membershipType)
  memberships: Membership[];
}
