module.exports = function enhancePage(
  p,
  { contentTypesCleaned, defaultSidebar },
) {
  let additionalProps = {
    sidebar: p.sidebar || defaultSidebar,
  }

  switch (p.template) {
    case '/pageHome':
      additionalProps = {
        ...additionalProps,
        currentNews: contentTypesCleaned.news[0],
        latestBikes: contentTypesCleaned.bike.slice(0, 3),
      }
      break

    case '/pageBikes':
      additionalProps = {
        ...additionalProps,
        bikes: contentTypesCleaned.bike,
        bikeFilter: {
          bikeCategories: contentTypesCleaned.bikeCategory,
          bikeFrameShapes: contentTypesCleaned.bikeFrameShape,
        },
      }
      break

    case '/pageNews':
      additionalProps = {
        ...additionalProps,
        news: contentTypesCleaned.news,
      }
      break

    default:
      break
  }

  return {
    ...p,
    ...additionalProps,
  }
}
