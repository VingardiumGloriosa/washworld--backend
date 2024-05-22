import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1716376582708 implements MigrationInterface {
    name = 'InitMigration1716376582708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "license_plate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "loyalty_reward_types" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "membership_types" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "membership_types" ALTER COLUMN "currency" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "memberships" ALTER COLUMN "start_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "memberships" ALTER COLUMN "end_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "memberships" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "full_name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "locations" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "locations" ALTER COLUMN "address" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "locations" ALTER COLUMN "maps_url" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" ALTER COLUMN "maps_url" SET DEFAULT 'UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "locations" ALTER COLUMN "address" SET DEFAULT 'UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "locations" ALTER COLUMN "name" SET DEFAULT 'UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "full_name" SET DEFAULT 'UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT 'UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET DEFAULT 'UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "memberships" ALTER COLUMN "status" SET DEFAULT 'UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "memberships" ALTER COLUMN "end_date" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "memberships" ALTER COLUMN "start_date" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "membership_types" ALTER COLUMN "currency" SET DEFAULT 'UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "membership_types" ALTER COLUMN "name" SET DEFAULT 'UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "loyalty_reward_types" ALTER COLUMN "name" SET DEFAULT 'UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "license_plate" SET DEFAULT 'UNKNOWN'`);
    }

}
