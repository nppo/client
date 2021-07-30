export const rules = {
  alpha: 'alpha',
  alpha_dash: 'alpha_dash',
  alpha_num: 'alpha_num',
  alpha_spaces: 'alpha_spaces',
  between: (min: number, max: number) => `between:${min},${max}`,
  confirmed: (field: string) => `confirmed:${field}`,
  digits: (length: number) => `digits:${length}`,
  dimensions: (width: number, height: number) =>
    `dimensions:${width},${height}`,
  email: 'email',
  excluded: (...args: Array<string | number>) => 'excluded:' + args.join(','),
  ext: (...args: Array<string>) => 'ext:' + args.join(','),
  image: 'image',
  oneOf: (...args: Array<string | number>) => 'oneOf:' + args.join(','),
  integer: 'integer',
  is: (value: string | number) => `is:${value}`,
  isNot: (value: string | number) => `is_not:${value}`,
  length: (length: number) => `length:${length}`,
  max: (max: number) => `max:${max}`,
  mimes: (...args: Array<string>) => 'mimes:' + args.join(','),
  min: (min: number) => `min:${min}`,
  numeric: 'numeric',
  regex: 'regex',
  required: 'required',
  size: (size: number) => `size:${size}`,
}

export default rules
