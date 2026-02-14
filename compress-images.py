#!/usr/bin/env python3
import os
from PIL import Image
from pathlib import Path

# Configuración
INPUT_DIR = r"C:\Users\Gonza\Pictures\entrepalmerasylavandas\FotosFotografo"
OUTPUT_DIR = r"c:\Users\Gonza\entre-lavandas-palmeras\img-compressed"
MAX_SIZE = (1920, 1920)  # Max width/height
QUALITY = 85  # JPEG quality (85 es buen balance)

# Crear directorio de salida
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Procesar todas las imágenes
input_path = Path(INPUT_DIR)
total = 0
success = 0

for img_file in input_path.glob("*.jpg"):
    total += 1
    try:
        # Abrir imagen
        with Image.open(img_file) as img:
            # Convertir a RGB si es necesario
            if img.mode != 'RGB':
                img = img.convert('RGB')

            # Resize manteniendo aspect ratio
            img.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)

            # Guardar comprimida
            output_file = os.path.join(OUTPUT_DIR, img_file.name)
            img.save(output_file, 'JPEG', quality=QUALITY, optimize=True, progressive=True)

            # Mostrar progreso
            input_size = os.path.getsize(img_file) / (1024 * 1024)
            output_size = os.path.getsize(output_file) / (1024 * 1024)
            compression_ratio = (1 - output_size / input_size) * 100

            print(f"OK {img_file.name}: {input_size:.1f}MB -> {output_size:.1f}MB ({compression_ratio:.0f}% reduccion)")
            success += 1

    except Exception as e:
        print(f"ERROR procesando {img_file.name}: {e}")

print(f"\nCompletado: {success}/{total} imagenes comprimidas")
