import { NextFunction, Request, Response } from 'express';

import Web3 from 'web3';

import { Settings } from './Types';

export * from './Types';

declare global {
  namespace Express {
    interface Request {
      web3: Web3;
    }
  }
}

export default (additionalSettings?: Settings) => (req: Request, res: Response, next: NextFunction) => {
  const settings: Required<Settings> = {
    blockchainUrl: `https://localhost:8545/`,
    ...(additionalSettings || {}),
  };

  req.web3 = new Web3(settings.blockchainUrl);

  next();
};
