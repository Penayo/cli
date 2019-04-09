import _ from 'lodash';
import helpers from './index';

const Sequelize = helpers.generic.getSequelize();

module.exports = {
  getCollectionName (modelName) {
    return Sequelize.Utils.pluralize(modelName).toLowerCase() ;
  },
  getInstanceName (modelName) {
    return modelName.toLowerCase()
  },

  generateRouteCreationFileContent (args) {
    return helpers.template.render('routes/route.js', {
      modelName:  args.name,
      collectionName: this.getCollectionName(args.name),
      instanceName: this.getInstanceName(args.name),
      route: '/' + this.getCollectionName(args.name)
    });
  },

  generateRouteFileName (args) {
    return args.name + 'Routes' ;
  },

  generateRouteCreationFile (args) {
    const routeName = this.generateRouteFileName(args);
    const routePath = helpers.path.getRoutePath(routeName);
    console.log('ROUTE PATH: ' + routePath)

    helpers.asset.write(routePath, this.generateRouteCreationFileContent(args));
  },

  routeFileExists (filePath) {
    return helpers.path.existsSync(filePath);
  }
};
