import { eslintTscStaged } from './eslint-tsc-diff'

describe('eslintTscStaged', () => {
  it('should work', () => {
    expect(eslintTscStaged()).toEqual('eslint-tsc-diff')
  })
})
