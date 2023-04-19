import { ApiHideProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Exclude } from 'class-transformer';

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
}
