const config = {
  printWidth: 100,
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  bracketSameLine: true,
  arrowParens: 'avoid',
  trailingComma: 'es5',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^#/env(.*)$',
    '^#/types/(.*)$',
    '^#/lib/(.*)$',
    '^#/hooks/(.*)$',
    '',
    '^#/components/(.*)$',
    '',
    '^#/styles/(.*)$',
    '',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn']
}

export default config