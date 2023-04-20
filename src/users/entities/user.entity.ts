import { ApiHideProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, ManyToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Residence } from 'src/residences/entities/residence.entity';
import { Fonction } from 'src/fonctions/entities/fonction.entity';
import { Formation } from 'src/formations/entities/formation.entity';

@Entity('agents')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    cp: string;

    @Exclude()
    @ApiHideProperty()
    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => Residence, (residence) => residence.user, {nullable : true})
    residence: Residence

    @ManyToOne(() => Fonction, (fonction) => fonction.user, {nullable : true})
    fonction: Fonction

    @ManyToMany(() => Formation, (formation) => formation.participants, {nullable : true})
    formations: Formation[]

    @ManyToMany(() => Formation, (formation) => formation.formateurs, {nullable : true})
    forme: Formation[]
}
