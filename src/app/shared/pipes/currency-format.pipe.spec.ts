import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('it should format the value as currency with the default symbol $', () => {
    const value = 1234.56;
    const result = pipe.transform(value);
    expect(result).toBe('$ 1234.56');
  });

  it('should format the value with a custom currency symbol ₹', () => {
    const value = 1234;
    const result = pipe.transform(value, '₹');
    expect(result).toBe('₹ 1234.00');
  });

  it('should handle values with no decimal places correctly', () => {
    const value = 1500;
    const result = pipe.transform(value);
    expect(result).toBe('$ 1500.00');
  });

  it('should handle values with more than two decimal places correctly', () => {
    const value = 1234.56789;
    const result = pipe.transform(value, '€');
    expect(result).toBe('€ 1234.57');
  });

});