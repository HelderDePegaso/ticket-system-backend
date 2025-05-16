// src/modules/areas/model/area.model.ts

import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Default,
    ForeignKey,
    BelongsTo,
    CreatedAt,
    UpdatedAt,
    HasMany,
    BeforeCreate,
  } from 'sequelize-typescript';
  import { Domain } from 'src/entities/xtras/model/domain.model';
  import { UserArea } from 'src/entities/xtras/model/user-area.model';

  import { Optional } from 'sequelize';
  import { AreaDto as AreaAttributes } from '../dto/area.dto';
import { v4 as uuidv4 } from 'uuid';

  export type  AreaCreationAttributes  = Optional<AreaAttributes, "id" |  "uuid" | "domain_id"  | "status" | "super_area"> 
  
  @Table({
    tableName: 'areas',
    timestamps: true,
  })
  export class Area extends Model<AreaAttributes, AreaCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;
  
    @AllowNull(false)
    @Column(DataType.STRING(20))
    declare name: string;
  
    @ForeignKey(() => Domain)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    domain_id: number;
  
    @BelongsTo(() => Domain)
    domain: Domain;
  
    @Default('active')
    @Column(DataType.ENUM('active', 'inactive'))
    status: 'active' | 'inactive';
  
    @AllowNull(true)
    @Column(DataType.INTEGER)
    super_area: number;
    
    @Column({
      type: DataType.STRING(36),
      allowNull: false,
      unique: true
    })
    uuid: string;

    @CreatedAt
    @Column
    created_at: Date;
  
    @UpdatedAt
    @Column
    updated_at: Date;

    // Methods
    @BeforeCreate
    static generateUuid(instance: Area) {
      console.log("instance");
      instance.uuid = uuidv4();
      console.log(instance.uuid);
    }
    
    
    @HasMany(() => UserArea, 'area_id')
    userAreas: UserArea[];
  }
  