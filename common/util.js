export const dataURLtoFile = (dataUrl = '', filename = '') => {
  let arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = Buffer.from(arr[1], 'base64');
  let n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.at(n);
  }

  return new File([u8arr], filename, {type: mime});
};
