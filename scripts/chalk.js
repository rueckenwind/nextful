const chalk = require('chalk')

// Forcing chalk to be enabled so we don't have to do it every time we require Chalk
chalk.enabled = true
chalk.level = 1

module.exports = chalk
