import { IsNotEmpty, IsString } from "class-validator";
import { FormationType } from "src/formation-types/entities/formation-type.entity";
import { Salle } from "src/salles/entities/salle.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('formations')
export class Formation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'timestamp with time zone'})
    date: Date;

    @Column( {nullable: true} )
    heure: String;

    @Column({ default: 0 })
    status: number;

    @Column( { nullable:true , default:"" } )
    @IsString()
    motifAnnulation: string;

    @ManyToOne(() => FormationType, (formationType) => formationType.formations, {nullable : true})
    formationType: FormationType;

    @ManyToMany(() => User, (user) => user.formations, { nullable: true })
    @JoinTable({
        name: 'participants'
    })
    participants: User[]

    @ManyToMany(() => User, (user) => user.forme, { nullable: true })
    @JoinTable({
        name: 'formateurs'
    })
    formateurs: User[]

    @ManyToOne(() => Salle, (salle) => salle.utilisations, {nullable : true})
    salle: Salle
}
