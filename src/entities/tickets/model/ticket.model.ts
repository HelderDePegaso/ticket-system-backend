import { Table , Column , Model , DataType , PrimaryKey,
    AutoIncrement,
    AllowNull,
    Default,
    ForeignKey,
    BelongsTo,
    CreatedAt,
    UpdatedAt,
    HasMany,
    BeforeCreate } from 'sequelize-typescript'



@Table({
    tableName: 'tickets',
    timestamps: true
})
export class Ticket extends Model<> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare id: number

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    user_id: number

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Area)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    area_id: number

    @BelongsTo(() => Area)
    area: Area

    @AllowNull(false)
    @Column(DataType.STRING(255))
    description: string

    @AllowNull(false)
    @Column(DataType.STRING(255))
    title: string

    @Default('open')
    @Column(DataType.STRING(255))
    status: string

    @Default('active')
    @Column(DataType.STRING(255))
    priority: string

}