import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1759259795056 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "user_id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "base_currency",
                    type: "varchar",
                    length: "3",
                    default: "'USD'"
                },
                {
                    name: "favorites",
                    type: "varchar",
                    isArray: true,
                    default: "'{}'"
                },
                {
                    name: "created_at",
                    type: "timestamptz",
                    default: "now()"
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
        await queryRunner.dropTable("users");
    }

}
