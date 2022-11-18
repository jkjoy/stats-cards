const getBilibiliInfo = require('../crawer/bilibili');
const renderBilibiliCard = require('../render/bilibili');
const { cacheTime, cache } = require('../common/cache');

module.exports = async (req, res) => {
  const { id, theme } = req.query;
  let key = 'b' + id;
  let data = cache.get(key);
  if (!data) {
    data = await getBilibiliInfo(id);
    cache.set(key, data);
  }
  data.theme = theme;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', `public, max-age=${cacheTime}`);
  return res.send(renderBilibiliCard(data));
};
