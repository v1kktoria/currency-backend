import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCachedRatesTable1759260522855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "cached_rates",
            columns: [
                {
                    name: "base_currency",
                    type: "varchar",
                    length: "3",
                    isPrimary: true
                },
                {
                    name: "target_currency",
                    type: "varchar",
                    length: "3",
                    isPrimary: true
                },
                {
                    name: "rate",
                    type: "numeric",
                    isNullable: false
                },
                {
                    name: "updated_at",
                    type: "timestamptz",
                    default: "now()"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cached_rates");
    }

}
