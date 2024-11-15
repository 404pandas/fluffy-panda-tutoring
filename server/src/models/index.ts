import dotenv from "dotenv";
dotenv.config();


import { Sequelize } from "sequelize";
import { UserFactory } from "./user.js";
import { CollectableFactory } from "./collectable.js";

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "",
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

const User = UserFactory(sequelize);
const Collectable = CollectableFactory(sequelize);
User.hasMany(Collectable, { foreignKey: "CollectableId" });
Collectable.belongsTo(User, {
  foreignKey: "CollectableId",
  as: "collectables",
});

export { sequelize, User, Collectable };
