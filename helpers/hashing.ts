let webCrypto: Crypto | undefined;

/**
 * Get the web crypto instance, either from the browser or Node.js.
 * @returns {Promise<Crypto>} The web crypto instance.
 */
async function getWebCrypto(): Promise<Crypto> {
  if (!webCrypto) {
    if (typeof window !== 'undefined' && window.crypto) {
      webCrypto = window.crypto;
    } else if (typeof global !== 'undefined' && global.crypto) {
      webCrypto = global.crypto;
    } else {
      const { webcrypto: crypto } = await import('crypto');
      webCrypto = crypto as Crypto;
    }
  }
  return webCrypto;
}

/**
 * Hash a password with a randomly generated salt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} The hashed password with the salt prepended.
 */
export async function hashPassword(password: string): Promise<string> {
  const crypto = await getWebCrypto();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const data = encoder.encode(password + bufferToHex(salt));
  const hash = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(salt) + bufferToHex(hash);
}

/**
 * Verify a password against a stored hash.
 * @param {string} inputPassword - The input password to verify.
 * @param {string} storedHash - The stored hash to verify against.
 * @returns {Promise<boolean>} Whether the password is valid.
 */
export async function verifyPassword(inputPassword: string, storedHash: string): Promise<boolean> {
  const salt = storedHash.slice(0, 32);
  const hash = storedHash.slice(32);
  const inputHash = await hashPasswordWithSalt(inputPassword, salt);
  return inputHash === hash;
}

/**
 * Hash a password with a provided salt.
 * @param {string} password - The password to hash.
 * @param {string} salt - The salt to use in hashing.
 * @returns {Promise<string>} The hashed password.
 */
async function hashPasswordWithSalt(password: string, salt: string): Promise<string> {
  const crypto = await getWebCrypto();
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hash);
}

/**
 * Convert an ArrayBuffer to a hexadecimal string.
 * @param {ArrayBuffer} buffer - The buffer to convert.
 * @returns {string} The hexadecimal string representation of the buffer.
 */
function bufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  const hexCodes = Array.from(byteArray).map((value) => value.toString(16).padStart(2, '0'));
  return hexCodes.join('');
}
