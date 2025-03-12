const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedData = cache.get(key);

    if (cachedData) {
      res.send(cachedData);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.set(key, body, duration);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = cacheMiddleware;
