import express from 'express';

const idAndUser = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const id = req.params.id;
  const user = req.user;

  if (!id || !user) {
    res.status(400).send();
    return ;
  }
  next();
}

export {idAndUser}