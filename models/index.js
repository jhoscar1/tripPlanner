const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/trip-planner');

const Place = db.define('place', {
    address: {
        type: Sequelize.TEXT
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
        // Are we sure about this data type?
        // Potential Getter Method
    },
    location: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
    }
});

const Hotel = db.define('hotel', {
    name: {
        type: Sequelize.STRING
    },
    numStars: {
        type: Sequelize.FLOAT,
        validate: {
            min: 1,
            max: 5
        }
    },
    amenities: {
        type: Sequelize.TEXT
        // Hook or getter method coming??
    }
});

const Activity = db.define('activity', {
    name: {
        type: Sequelize.STRING
    },
    ageRange: {
        type: Sequelize.STRING
        // Validation??
    }
});

const Restaurant = db.define('restaurant', {
    name: {
        type: Sequelize.STRING
    },
    cuisine: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    }
});

Restaurant.belongsTo(Place);
Activity.belongsTo(Place);
Hotel.belongsTo(Place);

module.exports = {
    Restaurant,
    Activity,
    Hotel,
    db
}