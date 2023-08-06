/* eslint-disable @nx/enforce-module-boundaries */
import { WriteFileOptions, copyFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import YAML from 'yaml'
import eslintConfig from '../src/__test__/eslintConfigFiles/baseConfig'

const doc = new YAML.Document(eslintConfig)

const eslintTestConfigDir = resolve(
  __dirname,
  '../src/__test__/eslintConfigFiles/',
)

const shellOptions: WriteFileOptions = {
  encoding: 'utf-8',
  flag: 'w',
}

const writeYamlEslintTestFiles = () => {
  writeFileSync(
    resolve(eslintTestConfigDir, '.eslintrc.yaml'),
    doc.toString(),
    shellOptions,
  )

  writeFileSync(
    resolve(eslintTestConfigDir, '.eslintrc.yml'),
    doc.toString(),
    shellOptions,
  )
  console.log(
    `converted json eslintrc.json to (yml|yaml) files in ${eslintTestConfigDir} dir`,
  )
}
const writeEslintJsonFiles = async () => {
  const prettier = await import('prettier')
  const jsonFilesToWrite = ['.eslintrc', '.eslintrc.json']
  const jsFilesToWrite = ['.eslintrc.cjs', '.eslintrc.js']

  jsonFilesToWrite.forEach(async (file) => {
    const eslintConfigFormatted = await prettier.format(
      JSON.stringify(eslintConfig),
      { parser: 'json' },
    )
    writeFileSync(
      resolve(eslintTestConfigDir, file),
      eslintConfigFormatted,
      shellOptions,
    )
  })

  jsFilesToWrite.forEach((file) => {
    copyFileSync(
      resolve(eslintTestConfigDir, './baseConfig.js'),
      resolve(eslintTestConfigDir, file),
    )
  })
}

writeEslintJsonFiles()
writeYamlEslintTestFiles()
