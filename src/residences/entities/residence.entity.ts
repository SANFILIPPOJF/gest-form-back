import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('residences')
export class Residence extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => User, (user) => user.residence, {nullable : true})
    user: User[]
}
