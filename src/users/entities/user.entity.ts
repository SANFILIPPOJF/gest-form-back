import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Residence } from 'src/residences/entities/residence.entity';
import { Fonction } from 'src/fonctions/entities/fonction.entity';
import { Formation } from 'src/formations/entities/formation.entity';
import { FormationType } from 'src/formation-types/entities/formation-type.entity';
import { Habilitation } from 'src/habilitations/entities/habilitation.entity';

@Entity('agents')
export class User extends BaseEntity{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ unique: true })
    cp: string;

    @Exclude()
    @ApiHideProperty()
    @Column()
    password: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty()
    @ManyToOne(() => Residence, (residence) => residence.users)
    residence: Residence

    @ApiProperty()
    @ManyToOne(() => Fonction, (fonction) => fonction.user, {nullable : true})
    fonction: Fonction

    @OneToMany(() => Habilitation, (habilitation) => habilitation.user, {nullable : true})
    habilitations: Habilitation[]

    @ManyToMany(() => Formation, (formation) => formation.participants, {nullable : true})
    formations: Formation[]

    @ManyToMany(() => Formation, (formation) => formation.formateurs, {nullable : true})
    forme: Formation[]

    @ManyToMany(() => FormationType, (formationType) => formationType.formateurs, {nullable : true})
    habFormateurs: FormationType[]
}
