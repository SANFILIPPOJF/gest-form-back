import { ApiHideProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Residence } from 'src/residences/entities/residence.entity';
import { Fonction } from 'src/fonctions/entities/fonction.entity';

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
}
