import { createHmac } from 'crypto';

export const getHashedPassword = (password: string): string => {
  return createHmac('sha256', password).digest('hex');
};
