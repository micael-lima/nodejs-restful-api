import setupApp from './src/app';

setupApp()
  .then(app => app.listen(app.get('port'), () => {
    process.stdout.write(`api running on port ${app.get('port')}`);
  }))
  .catch((err) => {
    process.stderr.write(`${err}\n`);
    process.exit(1);
  });
