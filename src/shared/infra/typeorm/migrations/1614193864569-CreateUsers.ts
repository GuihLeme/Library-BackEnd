import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614193864569 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'phone',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'created_at',
              type: 'date',
              isNullable: false,
            },
            {
              name: 'updated_at',
              type: 'date',
              isNullable: false,
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}
