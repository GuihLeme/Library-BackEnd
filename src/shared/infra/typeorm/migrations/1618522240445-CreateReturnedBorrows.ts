import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateReturnedBorrows1618522240445 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'returnedBorrows',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              isNullable: false,
            },
            {
              name: 'borrow_at',
              type: 'date',
              isNullable: false,
            },
            {
              name: 'return_at',
              type: 'date',
              isNullable: false,
            },
            {
              name: 'renewed',
              type: 'boolean',
              isNullable: false,
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('returnedBorrows');
    }

}
