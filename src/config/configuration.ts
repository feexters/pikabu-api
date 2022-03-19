import Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().port().required(),
  SELF_API_URL: Joi.string().required(),
  DB_HOST: Joi.string().hostname().required(),
  DB_PORT: Joi.number().port().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  // jwt
  JWT_SECRET: Joi.string().required(),
  JWT_SECRET_EXPIRES_IN: Joi.string().required(),
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const configuration = () => ({
  selfApiUrl: process.env.SELF_API_URL,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_SECRET_EXPIRES_IN as string, 10),
  },
});

export const validationOptions = {
  abortEarly: true,
};
