import { Optional } from 'sequelize';
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/entities/users/model/user.model';

import { ConfigurationAttributes } from '../xtras-dtos/configuration.dto';


type ConfigurationCreationAttributes = Optional<
  ConfigurationAttributes,
    'id' | 'main_admin'
  >;

@Table({
  tableName: 'configurations',
  timestamps: true,
})
export class Configuration extends Model<Configuration, ConfigurationCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.ENUM('detailed', 'free'),
    allowNull: true,
    defaultValue: 'detailed',
  })
  role_distribuition?: 'detailed' | 'free';

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  main_admin!: number;

  @BelongsTo(() => User, 'main_admin')
  main_admin_user!: User;
}
