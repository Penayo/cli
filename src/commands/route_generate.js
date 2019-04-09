import { _baseOptions, _underscoreOption } from '../core/yargs';

import helpers from '../helpers';
import clc from 'cli-color';

exports.builder =
  yargs =>
    _underscoreOption(
      _baseOptions(yargs)
        .option('name', {
          describe: 'Defines the name of the new route',
          type: 'string',
          demandOption: true
        })
        .option('force', {
          describe: 'Forcefully re-creates route with the same name',
          type: 'string',
          demandOption: false
        })
    )
      .help()
      .argv;

exports.handler = function (args) {
  ensureRoutesFolder();
  checkRouteFileExistence(args);


  try {
    helpers.route.generateRouteCreationFile(args);
  } catch (err) {
    helpers.view.error(err.message);
  }

  helpers.view.log(
    'New model was created at',
    clc.blueBright(helpers.path.getModelPath(args.name)),
    '.'
  );
  helpers.view.log(
    'New migration was created at',
    clc.blueBright(helpers.path.getMigrationPath(args.name)),
    '.'
  );

  process.exit(0);
};

function ensureRoutesFolder () {
  if (!helpers.path.existsSync(helpers.path.getRoutesPath())) {
    helpers.view.error(
      'Unable to find routes path (' +
      helpers.path.getRoutesPath() +
      '). Did you run ' + clc.blueBright('sequelize init') + '?'
    );
  }
}

function checkRouteFileExistence (args) {
  const modelPath = helpers.path.getRoutePath(args.name + 'Route');

  if (args.force === undefined && helpers.route.modelFileExists(modelPath)) {
    helpers.view.notifyAboutExistingFile(modelPath);
    process.exit(1);
  }
}
