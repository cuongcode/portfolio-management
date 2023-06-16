export const _sum = (array: []) => {
  return array.reduce((sum, i) => sum + i, 0);
};

export const _zip = (array1: [], array2: [], func: (a: any, b: any) => any) => {
  return array1.map((item, index) => {
    return func(item, array2[index]);
  });
};
