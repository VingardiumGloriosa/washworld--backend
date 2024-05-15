import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Membership_Type } from '../../membership_type/entities/membership_type.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Membership {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Membership_Type, membershipType => membershipType.memberships)
    @JoinColumn({ name: 'membership_type_id' })
    membershipType: Membership_Type;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    status: string;

    @OneToOne(() => User)
    @Column()
    user: User;  // Assuming you're storing a reference to a user
}
