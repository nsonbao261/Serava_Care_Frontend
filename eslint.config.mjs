import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
   baseDirectory: __dirname
})

const eslintConfig = [
   ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
   {
      rules: {
         // Code quality rules
         'max-len': [
            'error',
            {
               code: 100,
               ignoreUrls: true,
               ignoreStrings: true,
               ignoreTemplateLiterals: true,
               ignoreRegExpLiterals: true,
               ignoreComments: true
            }
         ]
      }
   }
]

export default eslintConfig
