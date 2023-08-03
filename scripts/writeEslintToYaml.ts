import fs from 'fs'
import { resolve } from 'path'
import YAML from 'yaml'
import eslintConfig from '../.eslintrc'

const doc = new YAML.Document(eslintConfig)

const writeYamlEslintTestFiles = () => {
  fs.writeFileSync(
    resolve(
      __dirname,
      '../packages/eslint-tsc-diff/src/__test__/eslintConfigFiles/.eslintrc.yaml',
    ),
    doc.toString(),
    { encoding: 'utf-8', flag: 'w' },
  )

  fs.writeFileSync(
    resolve(
      __dirname,
      '../packages/eslint-tsc-diff/src/__test__/eslintConfigFiles/.eslintrc.yml',
    ),
    doc.toString(),
    { encoding: 'utf-8', flag: 'w' },
  )
}
writeYamlEslintTestFiles()
