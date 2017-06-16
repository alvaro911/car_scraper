exports.DATABASE_URL = 'mongodb://alvaro:password@ds125262.mlab.com:25262/co_used_cars'
exports.DEV_DATABASE_URL = 'mongodb://localhost/test_car_finder_app_dev'
exports.TEST_DATABASE_URL = (
  process.env.TEST_DATABASE_URL ||
  'mongodb://localhost/test_car_finder_app_test')
exports.PORT = process.env.PORT || 3030
