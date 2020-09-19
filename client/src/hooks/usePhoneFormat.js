export default (mask, value) => {
  console.log('Inside hook: mask', mask, 'value', value);
  const phoneValue = `${value.substring(0, 1)}${mask.substring(1)}`;

  return [phoneValue];
};
