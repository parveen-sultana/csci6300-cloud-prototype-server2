import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initalizeDb from '../db';
import user from '../controller/user';
import technology from '../controller/technology';

let router = express();

//connect to db
initalizeDb(db => {

  //internal middleware
  router.use(middleware({ config, db }));

  //api routes v1 (/v1)
  router.use('/user', user());
  router.use('/technology', technology());
});

export default router;
