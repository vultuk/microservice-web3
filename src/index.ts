import { NextFunction, Request, Response } from 'express';

import web3 from 'web3';

import {Settings, Web3Interface} from './Types';

export * from './Types';

declare global {
  namespace Express {
    interface Request {
      web3: Web3Interface;
    }
  }
}

export default (additionalSettings: Settings) => (req: Request, res: Response, next: NextFunction) => {
  const settings: Required<Settings> = {
    blockchainUrl: `https://localhost:8545/`,
    ...additionalSettings
  }

  req.web3 = new web3(settings.blockchainUrl);

  next();
};
