import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
      user_id!: string;

    @Column({ type: "varchar",  length: 3, default: "USD" })
      base_currency!: string;

    @Column("varchar", {array: true, default: []})
      favorites!: string[];

    @CreateDateColumn({ type: "timestamptz" })
      created_at!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
      updated_at!: Date;
}