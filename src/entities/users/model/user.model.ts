import { Optional } from 'sequelize';
import{
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Unique,
    Default,
    CreatedAt,
    UpdatedAt,
    HasMany,
    BeforeCreate,
  } from 'sequelize-typescript';
  import { Configuration } from 'src/shared/model/configuration.model';
  import { UserArea } from 'src/shared/model/user-area.model';

  import { UserDto as UserAttributes } from 'src/entities/users/dto/user.dto';

  import { v4 as uuidv4 } from 'uuid';

  
  
  
  export type UserCreationAttributes = Optional<
    UserAttributes,
    'id' | 'uuid' | 'status' | 'created_at' | 'updated_at'
  >;
  

  @Table({
    tableName: 'users',
    timestamps: true,
  })
  export class User extends Model<UserAttributes, UserCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;
  
    @AllowNull(false)
    @Column(DataType.STRING(50))
    name: string;
  
    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(30))
    logon: string;
  
    @AllowNull(false)
    @Column(DataType.STRING(255))
    password: string;
  
    @Default('active')
    @Column(DataType.ENUM('active', 'inactive'))
    status: 'active' | 'inactive';
  
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

    @HasMany(() => Configuration, 'main_admin')
    configurations: Configuration[];
  
    @HasMany(() => UserArea, 'user_id')
    userAreas: UserArea[];

    // Methods
    @BeforeCreate
    static generateUuid(instance: User) {
      instance.uuid = uuidv4();
    }
  }
  