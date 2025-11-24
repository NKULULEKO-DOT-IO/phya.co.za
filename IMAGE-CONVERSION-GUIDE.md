# Image Conversion Guide for Claude Code

## Quick Start

Convert all images in `assets/` to JPEG format:

```bash
./convert-images.sh
```

This creates JPEG copies in `assets/converted/` without modifying originals.

## Usage Options

### Basic Usage
```bash
# Convert with default settings (90% quality, output to assets/converted/)
./convert-images.sh

# Custom input directory
./convert-images.sh --input path/to/images

# Custom output directory
./convert-images.sh --output path/to/output

# Custom quality (1-100, higher = better quality, larger file)
./convert-images.sh --quality 95
```

### Advanced Usage
```bash
# Replace original files (USE WITH CAUTION)
./convert-images.sh --overwrite

# Combine options
./convert-images.sh --input screenshots --output jpg-screenshots --quality 85

# Show help
./convert-images.sh --help
```

## Why Convert?

Claude Code works best with JPEG images. PNGs sometimes cause API errors due to:
- Incorrect metadata
- Unsupported color profiles
- Compression issues

## Manual Conversion (Single File)

If you need to convert a single file manually:

```bash
# Convert single PNG to JPEG
ffmpeg -i input.png -q:v 2 output.jpg

# Convert with specific quality (lower -q:v = better quality, range 1-31)
ffmpeg -i input.png -q:v 1 output.jpg
```

## Supported Input Formats

- PNG
- JPEG/JPG
- WebP
- GIF
- BMP
- TIFF

All are converted to JPEG for maximum compatibility.

## Current Images

Your `assets/` directory contains:
- IMG_0164.png
- IMG_0166.png
- IMG_0167.png
- IMG_0169.png
- IMG_0171.png
- IMG_0173.png
- Screenshot 2025-11-18 at 20.59.50.png
- Screenshot 2025-11-18 at 21.00.07.png
- Screenshot 2025-11-18 at 21.00.22.png
- Screenshot 2025-11-18 at 21.00.32.png

Run `./convert-images.sh` to convert them all.
