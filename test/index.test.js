const assert = require('assert');
const crypto = require('crypto');
const c = require('ansi-colors');
const b32 = require('../index');
/* eslint-disable */
describe('Base32 module', () => {
  describe('Encode and decode', () => {
    it('every encoded and later decoded input should match itself', () => {
      for (let i = 0; i < 5; i++) {
        const input = crypto.randomBytes(32);
        console.log(c.gray(`\t Input:   ${input.toString('hex')}`));
        const base32 = b32.base32encode(input.toString('binary'));
        console.log('\t Encoded:', c.bold.underline(base32));
        const decoded = b32.base32hex(base32);
        console.log('\t Decoded:', decoded)
        assert.equal(decoded, input.toString('hex'));
        console.log(c.green('\t [+] OK ---------------'));
      }
    });
  });
  
  describe('Alphabet test', () => {
    it('Alphabet test should return decoded alphabet', () => {
        const input = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
        console.log(`\t Input: ${input.substr(0,10)}...` );
        const base32 = b32.base32encode(input);
        console.log(`\t Encoded: ${base32.substr(0,10)}...`);
        const decoded = b32.base32hex(base32);
        console.log(`\t Decoded: ${decoded.substr(0,10)}...`);
        assert.equal(Buffer.from(decoded, 'hex').toString(), input);
    });
  });

  describe('All nulls', () => {
    it('Should correctly decode all null string', () => {
        const input = '\0\0\0\0\0\0\0\0\0\0\0\0'
        console.log(`\t Input: ${input.substr(0,10)}...` );
        const base32 = b32.base32encode(input);
        console.log(`\t Encoded: ${base32}`);
        const decoded = b32.base32hex(base32);
        console.log(`\t Decoded: ${decoded.substr(0,10)}...`);
        assert.equal(Buffer.from(decoded, 'hex').toString(), input);
    });
  });
});
