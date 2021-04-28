import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddBookIdToBorrows1614195930343 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('borrows',
        new TableColumn({
          name: 'book_id',
          type: 'varchar',
          isNullable: false,
        })
      )

      await queryRunner.createForeignKey('borrows',
        new TableForeignKey({
          name: 'BorrowsBook',
          columnNames: ['book_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'books',
          onDelete: `SET NULL`,
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('borrows', 'BorrowsBook')

      await queryRunner.dropColumn('borrows', 'book_id')
    }

}
