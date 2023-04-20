import { Fonction } from "src/fonctions/entities/fonction.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn,JoinTable } from "typeorm";

@Entity('formationTypes')
export class FormationType extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    codeRAF: String;

    @Column()
    duree: String;

    @Column({default: true})
    isActive: boolean;

    @ManyToMany(() => Fonction, (fonction) => fonction.formationTypes, { nullable: true })
    @JoinTable({
        name: 'concerne'
    })
    concerne: Fonction[]
}
