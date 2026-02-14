#!/bin/bash
# Backup
cp i18n.js i18n.js.temp

# Extract only translations from my good version  
head -275 i18n-biodanza-translations.js | tail -257 > biodanza-translations.txt

# Keep everything from i18n.js EXCEPT translations section (lines 18-850 approx)
# Then inject biodanza translations
head -17 i18n.js > i18n-new.js
cat biodanza-translations.txt >> i18n-new.js
tail -n +850 i18n.js >> i18n-new.js

# Replace
mv i18n-new.js i18n.js
rm biodanza-translations.txt

echo "✅ Traducciones de Biodanza aplicadas"
