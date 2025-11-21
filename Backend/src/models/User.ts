import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import bcrypt from "bcrypt";
import { UserAttributes, UserCreationAttributes } from "../interfaces/IUser";
import { UserRole } from "../enums/EuserRoles";
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public userid!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: UserRole;
    public managerid!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        userid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: false,
            defaultValue: UserRole.EMPLOYEE,
        },
        managerid: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'userid',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }

    },
    {
        sequelize,
        tableName: "users",
        timestamps: true,

        hooks: {
            beforeCreate: async (user: User) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            },
            beforeUpdate: async (user: User) => {
                if (user.changed("password")) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        },
    }
);