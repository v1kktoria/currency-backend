import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCachedCurrenciesTable1759260805993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "cached_currencies",
            columns: [
                {
                    name: "code",
                    type: "varchar",
                    length: "3",
                    isPrimary: true
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
        await queryRunner.dropTable("cached_currencies");
    }

}
