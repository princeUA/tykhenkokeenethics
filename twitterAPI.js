import express from 'express';
import axios from 'axios';
import {getAuthorization} from './twitterAuth';

const router = express.Router();

router.get('/:user', (req, res) => {

  const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
  const params = {'screen_name': req.params.user};

  axios.get(url,
    {params: params,
    headers: {
      'Authorization': getAuthorization('GET', url, params)
    }}).then(response => {
      res.send(response.data);
    }).catch(error => {
      console.log(error)
    }
  );
});

export default router;
