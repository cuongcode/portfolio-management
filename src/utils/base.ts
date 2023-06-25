export const sumOfNumberArray = (array: number[]) => {
  return array.reduce((sum, i) => sum + i, 0);
};

// should re name for more clear
export const zip = (
  array1: any[],
  array2: any[],
  func: (a: any, b: any) => any
) => {
  return array1.map((item, index) => {
    return func(item, array2[index]);
  });
};
