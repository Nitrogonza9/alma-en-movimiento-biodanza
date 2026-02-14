#!/bin/bash
# Reemplazar textos principales del glamping por Biodanza en i18n.js

sed -i '
# Meta descriptions y títulos principales
s/Design Units in Colonia, Uruguay/Biodanza System in Mendoza, Argentina/g
s/Unidades de diseño en Colonia, Uruguay/Sistema de Biodanza en Mendoza, Argentina/g

# Hero subtitle - muy importante
s/Un glamping de diseño entre palmeras centenarias y lavandas en Colonia del Sacramento, Uruguay. Tres unidades independientes donde la naturaleza y el confort se encuentran./Sistema de integración humana en Mendoza, Argentina. Biodanza Sistema Rolando Toro: vitalidad, creatividad, afectividad, sexualidad y trascendencia a través del movimiento, la música y el encuentro./g

# About section
s/Donde la naturaleza <em>abraza<\/em>/Un sistema de <em>integración humana<\/em>/g
s/Entre Palmeras y Lavandas nació del amor por la naturaleza y el deseo de crear un espacio único/Biodanza es un sistema creado por Rolando Toro que integra música, movimiento y encuentro en grupo/g

# Stats
s/Años de experiencia/Años de experiencia/g
s/Huéspedes felices/Alumnos transformados/g

# Cualquier referencia restante
s/glamping/biodanza/gi
s/hospedaje/vivencia/gi
s/huéspedes/participantes/gi

' i18n.js

echo "✅ Traducciones actualizadas"
