module.exports = function getBikePages(bikes) {
  return bikes.map(({ slug, ...query }) => ({
    url: `/fahrrad/${slug}/`,
    template: '/pageBike',
    query,
  }));
};
