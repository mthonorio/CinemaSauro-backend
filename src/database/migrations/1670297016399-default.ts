import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670297016399 implements MigrationInterface {
    name = 'default1670297016399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "imageUrl" character varying NOT NULL DEFAULT 'https://img.freepik.com/free-photo/gray-abstract-wireframe-technology-background_53876-101941.jpg?w=2000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "imageUrl"`);
    }

}
