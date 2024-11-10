import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";

interface HighscoreDetails {
  baseScore: number;

  difficultyFactors: {
    lanes: number;

    obstacleType: {
      static: number;

      animated: number;
    };

    obstacleSpeedBonus: number;
  };

  successfulMoves: number;

  codeComplexityBonus: number;

  alternateDirectionsBonus: number;

  totalScore: number;
}

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  highscoreDetails?: HighscoreDetails;
  oldHighscores?: Array<HighscoreDetails>;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public password!: string;
  public highscoreDetails?: HighscoreDetails;
  public oldHighscores?: Array<HighscoreDetails>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async hashPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      highscoreDetails: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {
          baseScore: 0,
          difficultyFactors: {
            lanes: 0,
            obstacleType: { static: 0, animated: 0 },
            obstacleSpeedBonus: 0,
          },
          successfulMoves: 0,
          codeComplexityBonus: 0,
          alternateDirectionsBonus: 0,
          totalScore: 0,
        },
      },
      oldHighscores: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        defaultValue: [],
      }
    },
    {
      tableName: "users",
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          await user.hashPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          if (user.changed("password")) {
            await user.hashPassword(user.password);
          }
        },
      },
    }
  );
  return User;
}
