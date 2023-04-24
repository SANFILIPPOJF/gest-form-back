import { Fonction } from "src/fonctions/entities/fonction.entity";
import { Formation } from "src/formations/entities/formation.entity";
import { Habilitation } from "src/habilitations/entities/habilitation.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn,JoinTable, OneToMany } from "typeorm";

@Entity('formationTypes')
export class FormationType extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    codeRAF: string;

    @Column()
    duree: string;

    @Column({default: true})
    isActive: boolean;

    @OneToMany(() => Formation, (formation) => formation.formationType, {nullable : true})
    formations: Formation[];

    @OneToMany(() => Habilitation, (habilitation) => habilitation.formationType, {nullable : true})
    habilites: Habilitation[];

    @ManyToMany(() => Fonction, (fonction) => fonction.formationTypes, {nullable: true})
    @JoinTable({
        name: 'concerne'
    })
    concerne: Fonction[]

    @ManyToMany(() => User, (user) => user.habFormateurs, {nullable: true})
    formateurs: User[]
}
