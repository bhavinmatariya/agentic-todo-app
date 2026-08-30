import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

/**
 * Hash a plain-text password using bcrypt before persisting it.
 * The resulting hash is safe to store in the database.
 */
export const hashPassword = async (plainPassword: string): Promise<string> => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

/**
 * Compare a plain-text password against a stored bcrypt hash.
 * Returns true when they match.
 */
export const verifyPassword = async (
  plainPassword: string,
  passwordHash: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, passwordHash);
};
