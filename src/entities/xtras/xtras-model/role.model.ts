import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany, UpdatedAt, CreatedAt } from 'sequelize-typescript';
import { Promotion } from './promotion.model';



import { RoleDto as RoleAttributes } from '../xtras-dtos/role.dto';
import { Optional } from 'sequelize';

interface RoleCreationAttributes
  extends Optional<
    RoleAttributes,
    'id' | 'status' | 'created_at' | 'updated_at'
  > {}

@Table({
  tableName: 'roles',
  timestamps: true, // ainda ativamos timestamps automáticos (createdAt, updatedAt)
})
export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    unique: true,
  })
  name: string;

  
  
  @CreatedAt
  @Column
  created_at: Date;
   
  @UpdatedAt
  @Column
  updated_at: Date;

  @HasMany(() => Promotion, 'role_id')
  promotions: Promotion[];
}
