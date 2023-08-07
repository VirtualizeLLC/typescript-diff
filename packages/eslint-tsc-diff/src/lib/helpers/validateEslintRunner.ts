import { EslintScriptRunnerOptions } from '../types/EslintTscDiffConfig'

export const validateEslintScriptRunner = (selectedRunner: string) => {
  let isValid = false
  switch (selectedRunner) {
    case EslintScriptRunnerOptions.NPX:
    case EslintScriptRunnerOptions.PNPX:
    case EslintScriptRunnerOptions.YARN:
      isValid = true
      break
    default:
      isValid = false
  }
  if (!isValid) {
    throw new Error(
      `Unsafe runner detected, runner: ${selectedRunner},\n  - Either disable the runner and install eslint globally or use the supported runners in enum of config.eslintScriptRunner \n\n  - If this runner needs to be supported please file an issue at "https://github.com/VirtualizeLLC/typescript-diff/issues"`,
    )
  }
}
