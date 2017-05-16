import setupApp from './src/app'

const port = 5000

setupApp()
  .then(app => app.listen(port, () => console.log(`api running on port ${port}`)))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
