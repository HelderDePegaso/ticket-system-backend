import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    HasMany,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    UpdatedAt,
    DataType,
    BeforeCreate,
  } from 'sequelize-typescript';
  import { User } from 'src/entities/users/model/user.model';
  import { Area } from 'src/entities/areas/model/area.model';
  import { Promotion } from './promotion.model';
  import { UserAreaDto as UserAreaAttributes } from '../dtos/user-area-dto';
import { Optional } from 'sequelize';
  

  type UserAreaCreationAttributes = Optional<UserAreaAttributes, 'id' | 'uuid' | 'created_at' | 'updated_at'>;

  @Table({
    tableName: 'user_areas',
    timestamps: true,
  })
  export class UserArea extends Model<UserAreaAttributes, UserAreaCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;
  
    @ForeignKey(() => User)
    @Column
    user_id: number;
  
    @ForeignKey(() => Area)
    @Column
    area_id: number;
  
    @CreatedAt
    @Column
    created_at: Date;
  
    @UpdatedAt
    @Column
    updated_at: Date;

    @Column({
      type: DataType.STRING(36),
      allowNull: false,
      unique: true
    })
        uuid: string;
  
    @BelongsTo(() => User)
    user: User;
  
    @BelongsTo(() => Area)
    area: Area;
  
    @HasMany(() => Promotion)
    promotions: Promotion[];

    
    // Methods
    
  }

