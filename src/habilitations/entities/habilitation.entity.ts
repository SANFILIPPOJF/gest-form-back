import { FormationType } from "src/formation-types/entities/formation-type.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('habilitations')
export class Habilitation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @ManyToOne(() => User, (user) => user.habilitations, {nullable : true})
    user: User;

    @ManyToOne(() => FormationType, (formationType) => formationType.habilites, {nullable : true})
    formationType: FormationType
}
