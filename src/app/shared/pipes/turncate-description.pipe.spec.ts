import { TurncateDescriptionPipe } from './turncate-description.pipe';

describe('TurncateDescriptionPipe', () => {
  let pipe: TurncateDescriptionPipe;

  beforeEach(() => {
    pipe = new TurncateDescriptionPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate the description to the given limit and append "..."', () => {
    const description = 'This is a long description that should be truncated';
    const result = pipe.transform(description, 20);
    expect(result).toBe('This is a long de...');  // It should truncate after 20 characters and append "..."
  });

  it('should return the full description if it is shorter than the limit', () => {
    const description = 'Short description';
    const result = pipe.transform(description, 50);
    expect(result).toBe('Short description');  // The description should remain the same since it's shorter than the limit
  });

  it('should return an empty string if the description is empty', () => {
    const description = '';
    const result = pipe.transform(description, 20);
    expect(result).toBe('');  // It should return an empty string
  });

  it('should handle limit as 0 by returning only the first character', () => {
    const description = 'Test description';
    const result = pipe.transform(description, 0);
    expect(result).toBe('T ...');  // With a limit of 0, it should only show the first character and append "..."
  });

  it('should not truncate if the description is exactly at the limit', () => {
    const description = 'ExactlyTwentyChars!!';  // Exactly 20 characters
    const result = pipe.transform(description, 20);
    expect(result).toBe(description);  // It should not truncate, since the length is exactly at the limit
  });
});