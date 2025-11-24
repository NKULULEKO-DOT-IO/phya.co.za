#!/bin/bash

# Image Converter Script for Claude Code Compatibility
# Converts PNG images to JPEG format using ffmpeg

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Default settings
INPUT_DIR="assets"
OUTPUT_DIR="assets/converted"
QUALITY=90 # JPEG quality (1-100, higher is better)
OVERWRITE=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -i|--input)
            INPUT_DIR="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        -q|--quality)
            QUALITY="$2"
            shift 2
            ;;
        --overwrite)
            OVERWRITE=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  -i, --input DIR      Input directory (default: assets)"
            echo "  -o, --output DIR     Output directory (default: assets/converted)"
            echo "  -q, --quality NUM    JPEG quality 1-100 (default: 90)"
            echo "      --overwrite      Replace original files instead of creating converted copies"
            echo "  -h, --help           Show this help message"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}Error: ffmpeg is not installed${NC}"
    echo "Install it with: brew install ffmpeg"
    exit 1
fi

# Check if input directory exists
if [ ! -d "$INPUT_DIR" ]; then
    echo -e "${RED}Error: Input directory '$INPUT_DIR' does not exist${NC}"
    exit 1
fi

# Create output directory if it doesn't exist and we're not overwriting
if [ "$OVERWRITE" = false ]; then
    mkdir -p "$OUTPUT_DIR"
    echo -e "${GREEN}Output directory: $OUTPUT_DIR${NC}"
else
    OUTPUT_DIR="$INPUT_DIR"
    echo -e "${YELLOW}Warning: Overwrite mode enabled. Original files will be replaced.${NC}"
fi

# Counter for converted files
converted_count=0
skipped_count=0
error_count=0

# Find and convert all image files
echo -e "${GREEN}Converting images...${NC}\n"

shopt -s nullglob
for img in "$INPUT_DIR"/*.png "$INPUT_DIR"/*.PNG "$INPUT_DIR"/*.jpg "$INPUT_DIR"/*.JPG "$INPUT_DIR"/*.jpeg "$INPUT_DIR"/*.JPEG "$INPUT_DIR"/*.webp "$INPUT_DIR"/*.WEBP "$INPUT_DIR"/*.gif "$INPUT_DIR"/*.GIF "$INPUT_DIR"/*.bmp "$INPUT_DIR"/*.BMP "$INPUT_DIR"/*.tiff "$INPUT_DIR"/*.TIFF; do
    # Skip if no files match
    [ -e "$img" ] || continue

    # Get filename without extension
    filename=$(basename "$img")
    name="${filename%.*}"
    extension="${filename##*.}"

    # Determine output path
    if [ "$OVERWRITE" = true ]; then
        output="$OUTPUT_DIR/${name}.jpg"
        temp_output="$OUTPUT_DIR/${name}_temp.jpg"
    else
        output="$OUTPUT_DIR/${name}.jpg"
        temp_output="$output"
    fi

    # Skip if already converted (unless overwriting)
    if [ "$OVERWRITE" = false ] && [ -f "$output" ]; then
        echo -e "${YELLOW}⊘ Skipped (already exists): $filename${NC}"
        ((skipped_count++))
        continue
    fi

    # Convert image
    echo -e "Converting: $filename"

    # Calculate quality value for ffmpeg
    quality_val=$(echo "scale=0; (100 - $QUALITY) / 10" | bc)
    if [ "$quality_val" -lt 1 ]; then
        quality_val=1
    fi

    if [ "$OVERWRITE" = true ]; then
        # Convert to temp file first
        if ffmpeg -i "$img" -q:v "$quality_val" "$temp_output" -y &>/dev/null; then
            # Replace original with converted
            mv "$temp_output" "$output"
            # Remove original if it was not already .jpg
            if [[ ! "$extension" =~ ^(jpg|JPG|jpeg|JPEG)$ ]]; then
                rm "$img"
            fi
            echo -e "${GREEN}✓ Converted and replaced: $filename → ${name}.jpg${NC}\n"
            ((converted_count++))
        else
            echo -e "${RED}✗ Failed: $filename${NC}\n"
            rm -f "$temp_output"
            ((error_count++))
        fi
    else
        # Convert to output directory
        if ffmpeg -i "$img" -q:v "$quality_val" "$output" -y &>/dev/null; then
            echo -e "${GREEN}✓ Converted: $filename → ${name}.jpg${NC}\n"
            ((converted_count++))
        else
            echo -e "${RED}✗ Failed: $filename${NC}\n"
            ((error_count++))
        fi
    fi
done

# Summary
echo -e "\n${GREEN}=== Conversion Summary ===${NC}"
echo -e "Converted: ${GREEN}$converted_count${NC}"
if [ $skipped_count -gt 0 ]; then
    echo -e "Skipped: ${YELLOW}$skipped_count${NC}"
fi
if [ $error_count -gt 0 ]; then
    echo -e "Errors: ${RED}$error_count${NC}"
fi

if [ $converted_count -eq 0 ] && [ $error_count -eq 0 ] && [ $skipped_count -eq 0 ]; then
    echo -e "${YELLOW}No image files found in $INPUT_DIR${NC}"
fi
