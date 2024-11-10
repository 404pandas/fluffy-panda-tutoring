import { DataTypes, Model, Sequelize } from "sequelize";

export class Collectable extends Model {}
export function CollectableFactory(sequelize: Sequelize) {
  Collectable.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      collectableImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      collectableAltDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      dateEarned: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      gameName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      collectionDetails: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      collected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "Collectable",
      sequelize,
    }
  );
  return Collectable;
}
