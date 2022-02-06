const TABLES = {
    people: `${process.env.DYNAMODB_TABLE_PEOPLE}`,
    planet: `${process.env.DYNAMODB_TABLE_PLANET}`,
  };

module.exports = {
  TABLES
}