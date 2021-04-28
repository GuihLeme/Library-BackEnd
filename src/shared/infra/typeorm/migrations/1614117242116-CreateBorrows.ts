import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBorrows1614117242116 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'borrows',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
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
      await queryRunner.dropTable('borrows');
    }

}
