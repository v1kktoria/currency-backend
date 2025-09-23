import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("cached_rates")
export class CachedRate {
    
    @PrimaryColumn({ type: "varchar", length: 3 })
      base_currency!: string;

    @PrimaryColumn({ type: "varchar", length: 3 })
      target_currency!: string;

    @Column("numeric")
      rate!: number;

    @UpdateDateColumn({ type: "timestamptz"})
      updated_at!: Date;
}