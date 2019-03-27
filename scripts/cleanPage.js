module.exports = (page) => {
  return {
    id: page.sys.id,
    ...page.fields,
  };
}