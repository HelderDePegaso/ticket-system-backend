import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  import { Role } from 'src/shared/model/role.model';
  import { UserArea } from 'src/shared/model/user-area.model';

  import { Optional } from 'sequelize';

  import { PromotionDto as PromotionAttributes } from '../dtos/promotion.dto';

export interface PromotionCreationAttributes
  extends Optional<
    PromotionAttributes,
    'id' | 'status' | 'created_at' | 'updated_at'
  > {}

  
  @Table({
    tableName: 'promotions',
    timestamps: true,
  })
  export class Promotion extends Model<PromotionAttributes, PromotionCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;
  
    @ForeignKey(() => Role)
    @Column
    role_id: number;
  
    @ForeignKey(() => UserArea)
    @Column
    user_area_id?: number;
  
    @CreatedAt
    @Column
    created_at: Date;
  
    @UpdatedAt
    @Column
    updated_at: Date;
  
    @BelongsTo(() => Role)
    role: Role;
  
    @BelongsTo(() => UserArea)
    user_area: UserArea;
  }
  