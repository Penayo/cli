'use strict';

var _yargs = require('../core/yargs');

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _cliColor = require('cli-color');

var _cliColor2 = _interopRequireDefault(_cliColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.builder = yargs => (0, _yargs._underscoreOption)((0, _yargs._baseOptions)(yargs).option('name', {
  describe: 'Defines the name of the new route',
  type: 'string',
  demandOption: true
}).option('force', {
  describe: 'Forcefully re-creates route with the same name',
  type: 'string',
  demandOption: false
})).help().argv;

exports.handler = function (args) {
  ensureRoutesFolder();
  checkRouteFileExistence(args);

  try {
    _helpers2.default.route.generateRouteCreationFile(args);
  } catch (err) {
    _helpers2.default.view.error(err.message);
  }

  _helpers2.default.view.log('New model was created at', _cliColor2.default.blueBright(_helpers2.default.path.getModelPath(args.name)), '.');
  _helpers2.default.view.log('New migration was created at', _cliColor2.default.blueBright(_helpers2.default.path.getMigrationPath(args.name)), '.');

  process.exit(0);
};

function ensureRoutesFolder() {
  if (!_helpers2.default.path.existsSync(_helpers2.default.path.getRoutesPath())) {
    _helpers2.default.view.error('Unable to find routes path (' + _helpers2.default.path.getRoutesPath() + '). Did you run ' + _cliColor2.default.blueBright('sequelize init') + '?');
  }
}

function checkRouteFileExistence(args) {
  const modelPath = _helpers2.default.path.getRoutePath(args.name + 'Route');

  if (args.force === undefined && _helpers2.default.route.modelFileExists(modelPath)) {
    _helpers2.default.view.notifyAboutExistingFile(modelPath);
    process.exit(1);
  }
}