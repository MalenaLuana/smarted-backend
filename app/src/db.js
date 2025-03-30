import 'dotenv/config';

import fs from 'fs';
import path from 'path';

import { Sequelize } from 'sequelize';
import language from './language/index.js';
import modelRelations from './relations/index.js';

const { DB_USER, DB_PASSWORD, DB } = process.env;

const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
  logging: false,
});

const currentFileURL = import.meta.url;
const currentDir = path.dirname(new URL(currentFileURL).pathname);
const modelsDir = `${currentDir.slice(1)}/models`;

const loadModels = async () => {
  const filenames = fs.readdirSync(modelsDir);
  await Promise.all(
    filenames.map(async (file) => {
      const modelModule = await import(`./models/${file}`);
      const model = modelModule.default(sequelize);
      sequelize.models[model.name] = model;
    }),
  );
};

const connectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(language.db.success);

    await loadModels();
    modelRelations(sequelize.models);
    await sequelize.sync({ force: false }); //quitar cuando termine
  } catch (error) {
    console.error(language.db.error, error.message);
  }
};

export { connectionDB, sequelize };
