import 'dotenv/config';
import app from './app.js';
import { connectionDB } from './db.js';
import language from './language/index.js';

const { PORT } = process.env;
connectionDB();

app.app.listen(PORT, () => {
  console.log(`${language.app.running} ${PORT}`);
});
