import { FormationType } from "src/formation-types/entities/formation-type.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('fonctions')
export class Fonction extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => User, (user) => user.fonction, {nullable : true})
    user: User[]

    @ManyToMany(() => FormationType, (formationType) => formationType.concerne, { nullable: true })
    formationTypes: FormationType[]
}
