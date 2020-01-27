/**
 * Checks if the given entry is a Contentful resource.
 *
 * @param {*} entry
 */
function isContentfulEntry(entry) {
  return (
    entry && typeof entry.sys === 'object' && typeof entry.fields === 'object'
  )
}

/**
 * Takes any entry as parameter and checks recursively if that entry and its children are a Contentful resources.
 * If it is case, it strips the `sys` property, which is an object containing system managed metadata and is not
 * useful for our application and returns only the `fields` property.
 *
 * __This reduces dramatically the size of the props passed from SSR to the client for hydration.__
 *
 * @param {*} entry
 */
function stripSys(entry) {
  // For the case we pass an array of entries (e.g. items from `getEntries` result)
  if (Array.isArray(entry)) {
    return entry.map(item => stripSys(item))
  }

  // For the case the object itself is a contentful entry
  if (isContentfulEntry(entry)) {
    return stripSys(entry.fields)
  }

  if (typeof entry !== 'object') {
    return entry
  }

  return Object.keys(entry).reduce((result, key) => {
    let value

    if (isContentfulEntry(entry[key])) {
      value = stripSys(entry[key].fields)
    } else if (Array.isArray(entry[key])) {
      value = stripSys(entry[key])
    } else {
      value = entry[key]
    }

    return {
      ...result,
      [key]: value,
    }
  }, {})
}

module.exports = stripSys
