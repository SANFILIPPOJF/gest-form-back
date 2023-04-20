import { Formation } from "src/formations/entities/formation.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('salles')
export class Salle extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    adresse: String;

    @Column()
    capacite: number;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Formation, (formation) => formation.salle, {nullable : true})
    utilisations: Formation[]
}
