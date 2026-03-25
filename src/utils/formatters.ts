export const formatExpiryInput = (value: string) => {
  let val = value.replace(/\D/g, '');
  if (val.length > 0) {
    let month = val.slice(0, 2);
    if (parseInt(month, 10) > 12) month = '12';
    val = month + val.slice(2, 4);
  }
  if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
  return val.slice(0, 5);
};
