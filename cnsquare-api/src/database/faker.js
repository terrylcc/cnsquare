const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const config = require("../config/index");

/**
 * Create a User object with fake data
 * @returns User
 */
exports.createUser = (id) => {
  const creditCardExpiryDate = `${faker.datatype
    .number({ min: 1, max: 12 })
    .toString()
    .padStart(2, "0")}/${new Date(faker.date.future(5)).getFullYear()}`;

  return {
    id: id,

    userName: faker.internet.userName(),
    password: bcrypt.hashSync(faker.internet.password(), 10),

    firstName: faker.name.firstName(),
    lastName: faker.name.firstName(),

    avatar: faker.image.avatar(),

    email: faker.internet.email(),
    address: faker.address.streetAddress(true),
    district: ["Hong Kong Island", "Kowloon", "New Territories"][
      faker.datatype.number({ min: 0, max: 2 })
    ],
    city: "Hong Kong",
    phoneNumber: faker.phone.number("+852 #### ####"),

    creditCardIssuer: faker.finance.creditCardIssuer(),
    creditCardNumber: faker.finance.creditCardNumber(),
    creditCardExpiryDate: creditCardExpiryDate,
    creditCardCVV: faker.finance.creditCardCVV(),

    tier: faker.datatype.number({ min: 0, max: 2 }), // 0: standard, 1: student, 2: vip
    points:
      this.tier == 2
        ? faker.datatype.number({ min: 1000, max: 5000 })
        : faker.datatype.number({ min: 0, max: 999 }),
    birthDate: faker.date.birthdate(),

    registeredAt: faker.date.past(),
  };
};

/**
 * Create a Order Object with fake data
 * @returns Order
 */
exports.createOrder = (id) => {
  let items = [];
  for (let i = 0; i < faker.datatype.number({ min: 1, max: 10 }); i++) {
    items.push({
      productId: faker.datatype.number({
        min: 1,
        max: config.NUMBER_OF_PRODUCTS,
      }),
      quantity: faker.datatype.number({ min: 1, max: 10 }),
    });
  }

  return {
    id: id,

    userId: faker.datatype.number({ min: 1, max: config.NUMBER_OF_USERS }),

    items: items,

    parcelLocation: faker.address.nearbyGPSCoordinate([22.3193, 114.1694]),

    status: faker.datatype.number({ min: 0, max: 2 }), // 0: preparing, 1: shipping 2: fulfilled
    
    createdAt: faker.date.past(),
  };
};

/**
 * Create a Product Object with fake data
 * @returns Product
 */
exports.createProduct = (id) => {  
  const typeList = ["writing_tools", "paper_products", "desk_accessories"];
  const featureList = ["", "new", "hot"];

  const colorList = ["black", "silver", "gray", "white", "maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua"]
  const sizeList = ["small", "medium", "large"];

  let prices = [];      
  let tprice = parseInt(faker.commerce.price());
  for (let i = 0; i < 3; i++) {
    prices.push({
      tier: i,
      price: tprice.toFixed(0),
    });    
    tprice = tprice * 0.8;
  }

  let colors = [];
  for (let i = 0; i < faker.datatype.number({min: 3, max: 8}); i++) {
    colors.push(colorList[faker.datatype.number({min: 0, max: 15})]);
  }
  colors = [...new Set(colors)];

  return {
    id: id,

    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.image(),

    brand: faker.company.name(),
    popularity: faker.datatype.number({ min: 3, max: 5 }),

    prices: prices,
    
    type: typeList[faker.datatype.number({min: 0, max: 2})],
    feature: featureList[faker.datatype.number({min: 0, max: 2})],

    colors: colors,
    size: sizeList[faker.datatype.number({min: 0, max: 2})],

    outOfStock: faker.datatype.boolean() && faker.datatype.boolean(), // decrease chances
    freeShipping: faker.datatype.boolean(),
  };
};

/**
 * Create a Review Object with fake data
 * @returns Review
 */
exports.createReview = (id) => {
  return {
    id: id,

    userId: faker.datatype.number({ min: 1, max: config.NUMBER_OF_USERS }),
    productId: faker.datatype.number({
      min: 1,
      max: config.NUMBER_OF_PRODUCTS,
    }),

    message: faker.lorem.paragraph(),
    rating: faker.datatype.number({ min: 2, max: 5 }),

    createdAt: faker.date.past(),
  };
};
