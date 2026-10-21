const fs = require('fs');
const https = require('https');
const crypto = require('crypto');

const downloadUrl = 'https://sp1.limewire.network/limewire/lmwrntwrk/buckets/ae6a990e-0b0a-42a1-9e57-f2badcec012d/06657448-2604-46e6-9b56-28d73d2c997a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20261013T140520Z&X-Amz-SignedHeaders=host&X-Amz-Credential=3HMkFzXmKJPnacuYeHAg%2F20261013%2Flmwrntwrk%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=2445174d825c03461ddbe0260f71d1d5867b728922effea055d0de49a2c736f6&x-lmwrntwrk-request-id=01M4TSA0XHH74N8CE5EYH6F7CA&x-lmwrntwrk-signature=H5X6Ry24GIzdq6IuBv%252FRbEcZ0x6L0dyevjjAzxoCS0riUoQiiiyIsdqWxLZJgRv1sKA9A374Sz0zlcFeB7JuarA%253D&x-max-request-count=10000';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve, reject);
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('Downloading encrypted buffer...');
  const encryptedBuf = await fetchUrl(downloadUrl);
  console.log('Encrypted buffer length:', encryptedBuf.length);

  // Key base64url decode
  const keyBase64 = 'WgDizFdni5_JplQ6PNfAB4eJdVQqcyRCcVi8ZDz7Uog'.replace(/-/g, '+').replace(/_/g, '/');
  const keyBuf = Buffer.from(keyBase64, 'base64');
  console.log('Key length:', keyBuf.length);

  // Let's test standard LimeWire decryption formats:
  // Usually in WebCrypto AES-GCM or AES-CTR:
  // Case A: AES-GCM with 12-byte IV at start and 16-byte tag at end (or IV + ciphertext + tag)
  // Case B: AES-CTR with 16-byte IV at start
  // Case C: Web Crypto AES-GCM format
  
  // Try AES-GCM: IV is typically the first 12 bytes, tag is last 16 bytes
  try {
    const iv = encryptedBuf.subarray(0, 12);
    const tag = encryptedBuf.subarray(encryptedBuf.length - 16);
    const ciphertext = encryptedBuf.subarray(12, encryptedBuf.length - 16);
    
    const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuf, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    console.log('AES-GCM (12-byte IV + end tag) success! Decrypted size:', decrypted.length);
    fs.mkdirSync('public/assets', { recursive: true });
    fs.writeFileSync('public/assets/tv-channel-logo.jpg', decrypted);
    console.log('Saved to public/assets/tv-channel-logo.jpg');
    return;
  } catch (err) {
    console.log('AES-GCM (12-byte IV + end tag) failed:', err.message);
  }

  // Try AES-GCM: IV is 12 bytes, ciphertext, but tag is next 16 bytes or IV is 16 bytes
  try {
    const iv = encryptedBuf.subarray(0, 16);
    const tag = encryptedBuf.subarray(encryptedBuf.length - 16);
    const ciphertext = encryptedBuf.subarray(16, encryptedBuf.length - 16);
    
    const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuf, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    console.log('AES-GCM (16-byte IV) success! Decrypted size:', decrypted.length);
    fs.mkdirSync('public/assets', { recursive: true });
    fs.writeFileSync('public/assets/tv-channel-logo.jpg', decrypted);
    return;
  } catch (err) {
    console.log('AES-GCM (16-byte IV) failed:', err.message);
  }

  // Try AES-CTR: IV is first 16 bytes
  try {
    const iv = encryptedBuf.subarray(0, 16);
    const ciphertext = encryptedBuf.subarray(16);
    const decipher = crypto.createDecipheriv('aes-256-ctr', keyBuf, iv);
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    console.log('AES-CTR (16-byte IV) success! First 4 bytes:', decrypted.subarray(0, 4));
    if (decrypted[0] === 0xff && decrypted[1] === 0xd8) {
      console.log('Valid JPEG magic number found!');
      fs.mkdirSync('public/assets', { recursive: true });
      fs.writeFileSync('public/assets/tv-channel-logo.jpg', decrypted);
      return;
    }
    if (decrypted[0] === 0x89 && decrypted[1] === 0x50) {
      console.log('Valid PNG magic number found!');
      fs.mkdirSync('public/assets', { recursive: true });
      fs.writeFileSync('public/assets/tv-channel-logo.png', decrypted);
      return;
    }
  } catch (err) {
    console.log('AES-CTR (16-byte IV) failed:', err.message);
  }

  // Try LimeWire's web crypto decryption by inspecting limewire.com client code if needed
  console.log('First 32 bytes of encrypted buf:', encryptedBuf.subarray(0, 32));
}

main().catch(console.error);
