import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Student } from "./Student";

@Entity()
export class Class {
    @PrimaryColumn()
    shortName?: string;

    @Column()
    fullName?: string;

    @OneToMany(type => Student, student => student.class)
    students?: Student[];
}