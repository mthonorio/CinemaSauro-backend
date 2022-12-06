import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670352311466 implements MigrationInterface {
    name = 'default1670352311466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "snacks" character varying NOT NULL, "tickets" character varying NOT NULL, "value_total" money NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "client_id" uuid, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d8608598c2c4f907a78de2ae461" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "capacity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "session_id" uuid NOT NULL, "seat" integer NOT NULL, "value" money NOT NULL, "date_session" TIMESTAMP NOT NULL, "category" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "discount_percentage" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dfa6ea45394e701fd4eefc49f09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "timetable" character varying NOT NULL, "date_start" TIMESTAMP WITH TIME ZONE NOT NULL, "date_end" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "movie_id" uuid, "type_session_id" uuid, "room_id" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "censorship" character varying NOT NULL, "category" character varying NOT NULL, "duration" integer NOT NULL, "production_company" character varying NOT NULL, "imageUrl" character varying NOT NULL, "isPremiere" boolean NOT NULL, "isNational" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "snacks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "value" money NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7ae77e4dcf87277e4dd0c717c04" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cast" ("movie_id" uuid NOT NULL, "actor_id" uuid NOT NULL, CONSTRAINT "PK_9761ae0a110a88f1ab0e22c5846" PRIMARY KEY ("movie_id", "actor_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_98e7d213380c1f473a42400c5e" ON "cast" ("movie_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_544388eab54d5ea1811fc5d2c3" ON "cast" ("actor_id") `);
        await queryRunner.query(`CREATE TABLE "purchase_ticket" ("purchase_id" uuid NOT NULL, "ticket_id" uuid NOT NULL, CONSTRAINT "PK_00dcf4ce9832493319cc505ed62" PRIMARY KEY ("purchase_id", "ticket_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b35bdb89940bbe05b53fe554c2" ON "purchase_ticket" ("purchase_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_367775e77b25fe47ab28d6036d" ON "purchase_ticket" ("ticket_id") `);
        await queryRunner.query(`CREATE TABLE "purchase_snack" ("purchase_id" uuid NOT NULL, "snack_id" uuid NOT NULL, CONSTRAINT "PK_7b7ab385e1e0c4e188cbacdaf86" PRIMARY KEY ("purchase_id", "snack_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_646f1324139ce942db6214c86b" ON "purchase_snack" ("purchase_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f91fcbf06314c333517289a09" ON "purchase_snack" ("snack_id") `);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_843bd1fa2fa57f88273c5808e9c" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_73f270d03cacce3e2eac9698341" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_beec8b7abd817dd4710c727f5c4" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_0f2d0fd8007c3b30b571ad366c2" FOREIGN KEY ("type_session_id") REFERENCES "type_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_a4d58a4fe886b32311887034616" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cast" ADD CONSTRAINT "FK_98e7d213380c1f473a42400c5e7" FOREIGN KEY ("movie_id") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cast" ADD CONSTRAINT "FK_544388eab54d5ea1811fc5d2c35" FOREIGN KEY ("actor_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_ticket" ADD CONSTRAINT "FK_b35bdb89940bbe05b53fe554c2b" FOREIGN KEY ("purchase_id") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purchase_ticket" ADD CONSTRAINT "FK_367775e77b25fe47ab28d6036d7" FOREIGN KEY ("ticket_id") REFERENCES "purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purchase_snack" ADD CONSTRAINT "FK_646f1324139ce942db6214c86b9" FOREIGN KEY ("purchase_id") REFERENCES "snacks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purchase_snack" ADD CONSTRAINT "FK_0f91fcbf06314c333517289a097" FOREIGN KEY ("snack_id") REFERENCES "purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_snack" DROP CONSTRAINT "FK_0f91fcbf06314c333517289a097"`);
        await queryRunner.query(`ALTER TABLE "purchase_snack" DROP CONSTRAINT "FK_646f1324139ce942db6214c86b9"`);
        await queryRunner.query(`ALTER TABLE "purchase_ticket" DROP CONSTRAINT "FK_367775e77b25fe47ab28d6036d7"`);
        await queryRunner.query(`ALTER TABLE "purchase_ticket" DROP CONSTRAINT "FK_b35bdb89940bbe05b53fe554c2b"`);
        await queryRunner.query(`ALTER TABLE "cast" DROP CONSTRAINT "FK_544388eab54d5ea1811fc5d2c35"`);
        await queryRunner.query(`ALTER TABLE "cast" DROP CONSTRAINT "FK_98e7d213380c1f473a42400c5e7"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_a4d58a4fe886b32311887034616"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_0f2d0fd8007c3b30b571ad366c2"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_beec8b7abd817dd4710c727f5c4"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_73f270d03cacce3e2eac9698341"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_843bd1fa2fa57f88273c5808e9c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f91fcbf06314c333517289a09"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_646f1324139ce942db6214c86b"`);
        await queryRunner.query(`DROP TABLE "purchase_snack"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_367775e77b25fe47ab28d6036d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b35bdb89940bbe05b53fe554c2"`);
        await queryRunner.query(`DROP TABLE "purchase_ticket"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_544388eab54d5ea1811fc5d2c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_98e7d213380c1f473a42400c5e"`);
        await queryRunner.query(`DROP TABLE "cast"`);
        await queryRunner.query(`DROP TABLE "snacks"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "type_session"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "actors"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
    }

}
