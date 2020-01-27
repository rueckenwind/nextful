const path = require('path')
const fs = require('fs-extra')
const chalk = require('./chalk')

const cachePath = '../__temp__'

/**
 * Retrieves the cached data
 */
const readCache = fileName => {
  const filePath = path.resolve(__dirname, `${cachePath}/${fileName}`)
  try {
    return fs.readJsonSync(filePath)
  } catch (err) {
    console.error(err)
    process.exit(1)
    return false
  }
}

/**
 * Writes the data from Contentful into a json file for later use.
 * The idea is to limit requests to CF and make sure that only one instance of data is
 * used during build and validation so that changed data in CF does not cause errors during
 * long running builds.
 * @param {*} pathMap
 */
const writeCache = async (data, fileName) => {
  const filePath = path.resolve(__dirname, `${cachePath}/${fileName}`)
  console.log(`Writing cache file "${fileName}" ...`) // eslint-disable-line no-console

  try {
    await fs.outputJson(filePath, data)
    console.log(chalk.green(`The file "${fileName}" has been generated!`)) // eslint-disable-line no-console
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = {
  cachePath,
  readCache,
  writeCache,
}
