export const _sum = (array: any[]) => {
  return array.reduce((sum, i) => sum + i, 0);
};

export const _zip = (
  array1: any[],
  array2: any[],
  func: (a: any, b: any) => any
) => {
  return array1.map((item, index) => {
    return func(item, array2[index]);
  });
};
