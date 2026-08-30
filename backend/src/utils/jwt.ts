import jwt, { SignOptions } from "jsonwebtoken";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface AuthTokenPayload {
  userId: string;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  return secret;
};

/**
 * Sign a JWT for the given user, used as the auth session token that is
 * stored in an HTTP-only cookie.
 */
export const signToken = (payload: AuthTokenPayload): string => {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };
  return jwt.sign(payload, getJwtSecret(), options);
};

/**
 * Verify and decode an auth JWT, throwing if it is missing, invalid, or
 * expired.
 */
export const verifyToken = (token: string): AuthTokenPayload => {
  return jwt.verify(token, getJwtSecret()) as AuthTokenPayload;
};
