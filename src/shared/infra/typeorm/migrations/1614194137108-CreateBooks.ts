import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBooks1614194137108 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'books',
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
              name: 'author',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'publisher',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'cover',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'available',
              type: 'boolean',
              isNullable: false,
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('books')
    }

}
