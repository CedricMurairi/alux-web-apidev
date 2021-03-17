import Sequelize from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Borrowing = sequelize.define('borrowing', {
    borrowing_id: {
        autoincrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    member_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    book_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    returned: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'borrowings',
    timestamps: true,
    indexes: [{
        name: "PRIMARY",
        unique: true,
        fields: [
            { name: "borrowing_id" }
        ]
    }]
});

export default Borrowing;