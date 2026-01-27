import jwt, { JwtPayload, type SignOptions } from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
export type Payload = {
  id: string;
  email: string;
};

export const signJwt = (payload: JwtPayload, expiresIn?: string) => {
  const secrete: Secret = process.env.JWT_SECRETE as unknown as Secret;
  let options: SignOptions;
  const expiration = expiresIn;
  if (expiration) {
    options = {
      expiresIn: expiration as unknown as NonNullable<SignOptions["expiresIn"]>,
    };
  }
  return jwt.sign(payload, secrete, options);
};

export const verifyJwt = (token: string) => {
  const secret: Secret = process.env.JWT_SECRETE as unknown as Secret;
  return jwt.verify(token, secret) as JwtPayload;
};
