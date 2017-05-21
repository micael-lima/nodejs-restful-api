import setupApp from './src/app';

const port = 5000;

setupApp()
  .then(app => app.listen(port, () => process.stdout.write(`api running on port ${port}`)))
  .catch((err) => {
    process.stderr.write(`${err}\n`);
    process.exit(1);
  });
