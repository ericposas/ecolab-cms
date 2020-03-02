"use strict";

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _multer = _interopRequireDefault(require("multer"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _uuid = _interopRequireDefault(require("uuid"));

var _loginHandlers = require("./express-routes/controllers/loginHandlers");

var _userRoutes = _interopRequireDefault(require("./express-routes/routes/userRoutes"));

var _adminRoutes = _interopRequireDefault(require("./express-routes/routes/adminRoutes"));

var _passwordResetRoutes = _interopRequireDefault(require("./express-routes/routes/passwordResetRoutes"));

var _webModuleRoutes = _interopRequireDefault(require("./express-routes/routes/ApplicationSpecific/webModuleRoutes"));

var _companyRoutes = _interopRequireDefault(require("./express-routes/routes/ApplicationSpecific/companyRoutes"));

var _divisionRoutes = _interopRequireDefault(require("./express-routes/routes/ApplicationSpecific/divisionRoutes"));

var _industryRoutes = _interopRequireDefault(require("./express-routes/routes/ApplicationSpecific/industryRoutes"));

var _segmentRoutes = _interopRequireDefault(require("./express-routes/routes/ApplicationSpecific/segmentRoutes"));

var _tourModuleRoutes = _interopRequireDefault(require("./express-routes/routes/ApplicationSpecific/tourModuleRoutes"));

var _customModuleRoutes = _interopRequireDefault(require("./express-routes/routes/ApplicationSpecific/customModuleRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Eco lab specific
var storage = _multer["default"].diskStorage({
  destination: "".concat(__dirname, "/uploads"),
  filename: function filename(req, file, cb) {
    cb(null, "".concat(file.originalname.split('.').slice(0, -1).join('.'), "-").concat(Date.now()).concat(_path["default"].extname(file.originalname)));
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});

_dotenv["default"].config();

var _process$env = process.env,
    ENV = _process$env.ENV,
    NODE_ENV = _process$env.NODE_ENV,
    MONGO_USER = _process$env.MONGO_USER,
    MONGO_PASSWORD = _process$env.MONGO_PASSWORD,
    DATABASE = _process$env.DATABASE;
var app = (0, _express["default"])();
var port = process.env.PORT || 3000;

_mongoose["default"].connection.on('connected', function () {
  console.log('connected!');
});

var mongoConnectionString = ENV == 'local' ? "mongodb+srv://".concat(MONGO_USER, ":").concat(MONGO_PASSWORD, "@cluster0-taijg.mongodb.net/ecolab?retryWrites=true&w=majority") : "mongodb://".concat(MONGO_USER, ":").concat(MONGO_PASSWORD, "@127.0.0.1:27017/ecolab?authSource=admin&retryWrites=true&w=majority");

_mongoose["default"].connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.set('trust proxy', 1);
app.use((0, _expressSession["default"])({
  genid: function genid(req) {
    return (0, _uuid["default"])();
  },
  secret: 'mysecret',
  resave: true,
  rolling: true,
  saveUninitialized: true,
  cookie: NODE_ENV == 'development' ? {
    httpOnly: false
  } : {
    secure: true
  }
}));
app.use(_express["default"]["static"](__dirname + '/public'));
app.use('/uploads', _express["default"]["static"](__dirname + '/uploads')); // Password Reset Routes

app.use('/password', _passwordResetRoutes["default"]); // Login -- at base URL

app.post('/authCheck', _loginHandlers.authCheck);
app.post('/login', _loginHandlers.login);
app.post('/logout', _loginHandlers.logout);
app.use('/users', _userRoutes["default"]);
app.use('/admins', _adminRoutes["default"]); // Eco Lab Application specific

app.use('/webmodules', _webModuleRoutes["default"]);
app.use('/companies', _companyRoutes["default"]);
app.use('/tourmodules', _tourModuleRoutes["default"]);
app.use('/custommodules', _customModuleRoutes["default"]); // Divisions, Industries, Segments

app.use('/divisions', _divisionRoutes["default"]);
app.use('/industries', _industryRoutes["default"]);
app.use('/segments', _segmentRoutes["default"]); // File upload

app.post('/upload', upload.single('file'), function (req, res) {
  console.log(req.session);
  res.send({
    success: true,
    path: "/uploads/".concat(req.file.filename)
  });
});
app.listen(port, function (err) {
  if (err) throw err;else console.log('server started in ES6!');
});
