import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1759132974472 implements MigrationInterface {
    name = 'InitSchema1759132974472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cached_rates" ("base_currency" character varying(3) NOT NULL, "target_currency" character varying(3) NOT NULL, "rate" numeric NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_639e58a926207328b36eb943964" PRIMARY KEY ("base_currency", "target_currency"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "base_currency" character varying(3) NOT NULL DEFAULT 'USD', "favorites" character varying array NOT NULL DEFAULT '{}', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "cached_currencies" ("code" character varying(3) NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b4e3152a34035388e684264a58b" PRIMARY KEY ("code"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cached_currencies"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cached_rates"`);
    }

}