import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format the value as currency with the default symbol ($)', () => {
    const value = 1234.56;
    const result = pipe.transform(value);
    expect(result).toBe('$ 1234.56');
  });

  it('should format the value with a custom currency symbol', () => {
    const value = 1234.56;
    const result = pipe.transform(value, '€');
    expect(result).toBe('€ 1234.56');
  });

  // it('should return an empty string for null value', () => {
  //   const result = pipe.transform(null);
  //   expect(result).toBe('');
  // });

  it('should return a formatted value with two decimal places', () => {
    const value = 1234;
    const result = pipe.transform(value);
    expect(result).toBe('$ 1234.00');  // Even though input is an integer, it should have two decimals
  });
});