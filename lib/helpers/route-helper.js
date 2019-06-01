'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Sequelize = _index2.default.generic.getSequelize();

module.exports = {
  getCollectionName(modelName) {
    return Sequelize.Utils.pluralize(modelName).toLowerCase();
  },
  getInstanceName(modelName) {
    return modelName.toLowerCase();
  },

  generateRouteCreationFileContent(args) {
    return _index2.default.template.render('routes/route.js', {
      modelName: args.name,
      collectionName: this.getCollectionName(args.name),
      instanceName: this.getInstanceName(args.name),
      route: '/' + this.getCollectionName(args.name)
    });
  },

  generateRouteFileName(args) {
    return args.name + 'Routes';
  },

  generateRouteCreationFile(args) {
    const routeName = this.generateRouteFileName(args);
    const routePath = _index2.default.path.getRoutePath(routeName);
    console.log('ROUTE PATH: ' + routePath);

    _index2.default.asset.write(routePath, this.generateRouteCreationFileContent(args));
  },

  routeFileExists(filePath) {
    return _index2.default.path.existsSync(filePath);
  }
};