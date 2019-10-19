const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32encode(str) {
  //const bins = [...str].map((el) => el.charCodeAt(0).toString(2).padStart(8, '0')).join('');
  let out = '';
  for (let i = 0; i < bins.length; i += 5) {
    let temp = bins.slice(i, i + 5);
    if (temp.length % 5 !== 0) temp = temp.padEnd(5, '0');
    out += charset[parseInt(temp, 2)];
  }
  // add padding
  out += '='.repeat(str.length % 8);
  return out;
}

function base32hex(str) {
  // clear padding
  const base32 = str.replace(new RegExp(`[^${charset.split('')}']`, 'g'), '');
  const bindata = [...base32].map((el) => charset.indexOf(el).toString(2).padStart(5, '0')).join('');
  let out = '';
  for (let i = 0; i < bindata.length; i += 8) {
    let temp = bindata.slice(i, i + 8);
    if (temp.length < 8) temp = temp.padStart(8, '0');
    out += parseInt(temp, 2).toString(16).padStart(2, '0');
  }
  // Don't care about trailing zeroes
  if (out.substr(out.length - 2, 2) === '00') return out.substr(0, out.length - 2);
  return out;
}

module.exports = {
  base32encode,
  base32hex,
};
