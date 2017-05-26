exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      'mongodb://localhost/car_finder_app'
exports.TEST_DATABASE_URL = (
  process.env.TEST_DATABASE_URL ||
  'mongodb://localhost/test_car_finder_app)')
exports.PORT = process.env.PORT || 3030
