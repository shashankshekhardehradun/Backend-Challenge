import { Sequelize, Model } from "sequelize";
const { DataTypes } = require('sequelize');



const sequelize = new Sequelize("dbinsurance", "postgres", "postgres", {
  host: "postgres",
  port: 5432,
  dialect: 'postgres',
  define: {
    timestamps: false, 
  },
  logging: false
});

interface UserAttributes {
  id: number;
  email: string;
  fullName: string;
  dob: Date;
  driveStartDate: Date;
}
const Users = sequelize.define<Model<UserAttributes>>('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  fullName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false
  },
  driveStartDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

interface CarAttributes {
  id: number;
  carMake: string;
  carModel: string;
  vin: Date;
  milesDriven: Date;
  userId: number;
}
const Cars = sequelize.define<Model<CarAttributes>>('Cars', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  carMake: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  carModel: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  vin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  milesDriven: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const Quotes = sequelize.define('Quotes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uniqueID: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  insuranceCompany: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  coverageType: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  premium: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  limit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deductible: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

});

const CarQuotes = sequelize.define('CarQuotes', {});


Cars.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
Users.hasMany(Cars, { foreignKey: 'userId' });

Cars.belongsToMany(Quotes, { through: 'CarQuotes' });
Quotes.belongsToMany(Cars, { through: 'CarQuotes' });

sequelize.sync({ force: false }); 

export{ sequelize, Users, Cars, Quotes, CarQuotes};
