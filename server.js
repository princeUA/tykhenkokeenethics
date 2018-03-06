import path from 'path';
import express from 'express';
import config from './config';
import twitterRouter from './twitterAPI';

const server = express();

server.use('/twitter', twitterRouter);

server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
