import { jestTscStaged } from './jest-tsc-staged';

describe('jestTscStaged', () => {
  it('should work', () => {
    expect(jestTscStaged()).toEqual('jest-tsc-staged');
  });
});
