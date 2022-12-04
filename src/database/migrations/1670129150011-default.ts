import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670129150011 implements MigrationInterface {
    name = 'default1670129150011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "snacks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7ae77e4dcf87277e4dd0c717c04" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase_snack" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "snack_id" uuid, "purchase_id" uuid, CONSTRAINT "PK_7b7702f71ad3d7e276f0f955de2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d8608598c2c4f907a78de2ae461" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cast" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "movie_id" uuid, "actor_id" uuid, CONSTRAINT "PK_c27b51350cb072d995c340b86b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "censorship" character varying NOT NULL, "category" character varying NOT NULL, "duration" character varying NOT NULL, "production_company" character varying NOT NULL, "isPremiere" boolean NOT NULL, "isNational" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "capacity" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_section" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "discount_percentage" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1b1112632c690a5ce0da2894697" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "section" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "timetable" character varying NOT NULL, "date_start" TIMESTAMP WITH TIME ZONE NOT NULL, "date_end" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "movie_id" uuid, "type_section_id" uuid, "room_id" uuid, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clientId" integer NOT NULL, "buyId" integer NOT NULL, "movieId" integer NOT NULL, "sectionId" integer NOT NULL, "seatId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "section_id" uuid, CONSTRAINT "REL_3eb8d5dac79061eea1650feb2b" UNIQUE ("section_id"), CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase_ticket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ticket_id" uuid, "purchase_id" uuid, "section_id" uuid, CONSTRAINT "PK_8b07a361e97302bb4ffc26f08dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "id_client" integer NOT NULL, "value_ticket" integer NOT NULL, "value_discount_ticket" integer NOT NULL, "value_total_ticket" integer NOT NULL, "value_snack" integer NOT NULL, "value_total_snack" integer NOT NULL, "value_total_purchase" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "client_id" uuid, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "category" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase_snack" ADD CONSTRAINT "FK_0f91fcbf06314c333517289a097" FOREIGN KEY ("snack_id") REFERENCES "snacks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_snack" ADD CONSTRAINT "FK_646f1324139ce942db6214c86b9" FOREIGN KEY ("purchase_id") REFERENCES "purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cast" ADD CONSTRAINT "FK_98e7d213380c1f473a42400c5e7" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cast" ADD CONSTRAINT "FK_544388eab54d5ea1811fc5d2c35" FOREIGN KEY ("actor_id") REFERENCES "actors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_f74a1700207c255dadddaebfe8c" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_c653aa6b82e8975a448ebdafc1c" FOREIGN KEY ("type_section_id") REFERENCES "type_section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_861d275b4af718769e71f170b48" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_3eb8d5dac79061eea1650feb2ba" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_ticket" ADD CONSTRAINT "FK_367775e77b25fe47ab28d6036d7" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_ticket" ADD CONSTRAINT "FK_b35bdb89940bbe05b53fe554c2b" FOREIGN KEY ("purchase_id") REFERENCES "purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_ticket" ADD CONSTRAINT "FK_4ac59699ede1b44fcc2fc42390e" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_843bd1fa2fa57f88273c5808e9c" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_843bd1fa2fa57f88273c5808e9c"`);
        await queryRunner.query(`ALTER TABLE "purchase_ticket" DROP CONSTRAINT "FK_4ac59699ede1b44fcc2fc42390e"`);
        await queryRunner.query(`ALTER TABLE "purchase_ticket" DROP CONSTRAINT "FK_b35bdb89940bbe05b53fe554c2b"`);
        await queryRunner.query(`ALTER TABLE "purchase_ticket" DROP CONSTRAINT "FK_367775e77b25fe47ab28d6036d7"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_3eb8d5dac79061eea1650feb2ba"`);
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_861d275b4af718769e71f170b48"`);
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_c653aa6b82e8975a448ebdafc1c"`);
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_f74a1700207c255dadddaebfe8c"`);
        await queryRunner.query(`ALTER TABLE "cast" DROP CONSTRAINT "FK_544388eab54d5ea1811fc5d2c35"`);
        await queryRunner.query(`ALTER TABLE "cast" DROP CONSTRAINT "FK_98e7d213380c1f473a42400c5e7"`);
        await queryRunner.query(`ALTER TABLE "purchase_snack" DROP CONSTRAINT "FK_646f1324139ce942db6214c86b9"`);
        await queryRunner.query(`ALTER TABLE "purchase_snack" DROP CONSTRAINT "FK_0f91fcbf06314c333517289a097"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TABLE "purchase_ticket"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TABLE "type_section"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "cast"`);
        await queryRunner.query(`DROP TABLE "actors"`);
        await queryRunner.query(`DROP TABLE "purchase_snack"`);
        await queryRunner.query(`DROP TABLE "snacks"`);
    }

}
