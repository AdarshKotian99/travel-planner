import { TurncateDescriptionPipe } from './turncate-description.pipe';

describe('TurncateDescriptionPipe', () => {
  let pipe: TurncateDescriptionPipe;

  beforeEach(() => {
    pipe = new TurncateDescriptionPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate description upto to the given limit and append "..."', () => {
    const description = 'This is a long description that should be truncatedLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';
    const result = pipe.transform(description, 20);
    expect(result).toBe('This is a long descr ...');  // It should truncate after 20 characters and append "..."
  });

  it('should return the full description if it is shorter than the limit', () => {
    const description = 'Short description';
    const result = pipe.transform(description, 50);
    expect(result).toBe('Short description');  // The description should remain the same
  });

  it('should return an empty string if the description is blank', () => {
    const description = '';
    const result = pipe.transform(description, 20);
    expect(result).toBe('');  // It should return an empty string
  });

  it('should not truncate if the description is exactly at the limit 20', () => {
    const description = 'ExactlyTwentyChars!!';  // Exactly 20 characters
    const result = pipe.transform(description, 20);
    expect(result).toBe(description);  // It should not truncate
  });
});