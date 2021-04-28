import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddIsActiveToBorrows1616023900363 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('borrows',
        new TableColumn({
          name: 'is_active',
          type: 'boolean',
          isNullable: false,
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('borrows', 'is_active')
    }

}
