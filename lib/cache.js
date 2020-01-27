export async function loadDataFromCache(fileName) {
  return import(/* webpackChunkName: "[request]" */ `../__temp__/${fileName}`)
}

export async function loadDataForUrl(url) {
  const name = url.split('/').join('__')

  return loadDataFromCache(`contentful/pages/${name}.json`)
}
