import Sequelize from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Books = sequelize.define('member', {
  book_id: {
    autoIncrement: true,
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  author: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  publish_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  isbn: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  no_of_copies: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'books',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "book_id" },
      ]
    },
  ]
});

export default Books
