import { Employee } from './employee.Model';

describe('Employee', () => {
  it('should create an instance', () => {
    expect(new Employee()).toBeTruthy();
  });
});
