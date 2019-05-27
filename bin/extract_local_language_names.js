const { readdirSync, writeFileSync } = require('fs')
const { join } = require('path')

const localeDir = join(__dirname, '..', '_locales')

// English Lang as fallback
const englishLang = require(join(localeDir, 'en.json'))

function getAvailableLanguages () {
  return readdirSync(localeDir)
    .filter(l => {
      return !l.startsWith('_') && l.endsWith('.json')
    })
    .map(l => {
      const locale = l.split('.json')[0]
      const content = require(join(localeDir, l))
      const localLangName = content[`language_${locale}`] || englishLang[`language_${locale}`]
      if (!localLangName) console.error(`'language_${locale}' key is missing in both the native lang and the fallback lang (en)`)
      return {
        locale,
        name: localLangName && localLangName.message
      }
    }).filter(item => item.name !== undefined)
}

writeFileSync(join(localeDir, '_languages.json'), JSON.stringify(getAvailableLanguages(), null, 2))
