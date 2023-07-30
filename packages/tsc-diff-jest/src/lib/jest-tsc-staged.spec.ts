import { jestTscStaged } from './jest-tsc-diff'

describe('jestTscStaged', () => {
  it('should work', () => {
    expect(jestTscStaged()).toEqual('jest-tsc-diff')
  })
})
