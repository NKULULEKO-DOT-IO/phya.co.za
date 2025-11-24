#!/bin/bash

# PHYA Website Deployment Script
# This script builds and deploys the website to AWS S3 and CloudFront

set -e

echo "Starting PHYA website deployment..."

# Build the project
echo "Building project with Vite..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "Error: dist folder not found. Build may have failed."
    exit 1
fi

# Set variables
BUCKET_NAME="phya-co-za"
REGION="af-south-1"
DISTRIBUTION_ID="E3AWOY3ASC2MO4"

# Sync files to S3
echo "Uploading files to S3..."

# Upload static assets with long cache
aws s3 sync dist/ s3://$BUCKET_NAME/ \
    --region $REGION \
    --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html"

# Upload HTML files with no cache
aws s3 cp dist/index.html s3://$BUCKET_NAME/index.html \
    --region $REGION \
    --cache-control "no-cache" \
    --content-type "text/html"

echo "Files uploaded to S3 successfully!"

# Ask if CloudFront invalidation is needed
read -p "Do you want to invalidate CloudFront cache for immediate updates? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Creating CloudFront invalidation..."
    aws cloudfront create-invalidation \
        --distribution-id $DISTRIBUTION_ID \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text
    echo "CloudFront invalidation created. Changes will be visible in a few minutes."
else
    echo "Skipping CloudFront invalidation. Changes will be visible after cache expiry."
fi

echo ""
echo "Deployment complete!"
echo "S3 Website URL: http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"
echo "CloudFront URL: https://d1xnudxsoyppv6.cloudfront.net"
echo ""