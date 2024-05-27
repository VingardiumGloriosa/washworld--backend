import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1716836402825 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('loyalty_memberships', 'isActive', 'is_active');
        await queryRunner.renameColumn('loyalty_memberships', 'userId', 'user_id');
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('loyalty_memberships', 'is_active', 'isActive');
        await queryRunner.renameColumn('loyalty_memberships', 'user_id', 'userId');
      }

}
