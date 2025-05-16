import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
  } from 'sequelize-typescript';
  import { Area } from 'src/entities/areas/model/area.model';
  
  @Table({
    tableName: 'domains',
    timestamps: true,
  })
  export class Domain extends Model<Domain> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;
  
    @Column({
      type: DataType.STRING(20),
      allowNull: false,
    })
    name!: string;
  
    @Column({
      type: DataType.ENUM('active', 'inactive'),
      allowNull: true,
      defaultValue: 'active',
    })
    status?: 'active' | 'inactive';
  
    @HasMany(() => Area, 'domain_id')
    areas!: Area[];
  }
  