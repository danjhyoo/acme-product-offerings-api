const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/acme_products");

const { UUID, UUIDV4, STRING, INTEGER } = Sequelize;

const Product = db.define("product", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    allowEmpty: false
  },
  suggestedPrice: {
    type: INTEGER
  }
});
const Company = db.define("company", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    allowEmpty: false
  }
});
const Offering = db.define("offering", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  price: {
    type: INTEGER
  }
});

Offering.belongsTo(Product);
Product.hasMany(Offering);
Offering.belongsTo(Company);
Company.hasMany(Offering);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const _product = [
    { name: "basketball", suggestedPrice: 10 },
    { name: "soccerball", suggestedPrice: 14 },
    { name: "baseball", suggestedPrice: 8 }
  ];
  const _company = ["nike", "adidas", "reebok"];
  const _offering = [5, 6, 7];

  const [
    [basketball, soccerball, baseball],
    [nike, adidas, reebok],
    [five, six, seven]
  ] = await Promise.all([
    Promise.all(_product.map(data => Product.create(data))),
    Promise.all(_company.map(name => Company.create({ name }))),
    Promise.all(_offering.map(price => Offering.create({ price })))
  ]);
  await five.setProduct(basketball);
  await five.setCompany(nike);
  await six.setProduct(soccerball);
  await six.setCompany(adidas);
  await seven.setProduct(baseball);
  await seven.setCompany(reebok);

  //updating a property
  await basketball.update({ suggestedPrice: 100 });

  //another way to update
  baseball.suggestedPrice = 2;
  await baseball.save();
};

module.exports = {
  syncAndSeed,
  models: {
    Product,
    Company,
    Offering
  }
};
