import Sequelize from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Borrowing = sequelize.define('borrowings', {
    borrowing_id: {
        autoIncrement: true,
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
    borrowed_on: {
        type: Sequelize.DATE,
        allowNull: true
    },
    returned_on: {
        type: Sequelize.DATE,
        allowNull: true
    },
    returned: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'borrowings',
    timestamps: false,
    indexes: [{
        name: "PRIMARY",
        unique: true,
        fields: [
            { name: "borrowing_id" }
        ]
    }]
});

export default Borrowing;