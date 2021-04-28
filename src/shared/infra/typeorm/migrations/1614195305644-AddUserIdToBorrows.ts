import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddUserIdToBorrows1614195305644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('borrows',
      new TableColumn({
        name: 'user_id',
        type: 'varchar',
        isNullable: false,
      })
    )

    await queryRunner.createForeignKey('borrows',
      new TableForeignKey({
        name: 'BorrowsUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: `SET NULL`,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('borrows', 'BorrowsUser');

    await queryRunner.dropColumn('borrows', 'user_id');
  }
}
