import { Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("cached_currencies")
export class CachedCurrency {

    @PrimaryColumn({ type: "varchar", length: 3 })
    code!: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at!: Date;
}