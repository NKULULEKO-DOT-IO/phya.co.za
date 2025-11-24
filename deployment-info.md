# PHYA Website AWS Deployment Information

## Deployment Date
November 25, 2025

## AWS Resources

### S3 Bucket
- **Bucket Name**: phya-co-za
- **Region**: af-south-1
- **S3 Website URL**: http://phya-co-za.s3-website.af-south-1.amazonaws.com
- **Configuration**:
  - Static website hosting enabled
  - Index document: index.html
  - Error document: index.html (for SPA routing)
  - Public read access enabled

### CloudFront Distribution
- **Distribution ID**: E3AWOY3ASC2MO4
- **CloudFront URL**: https://d1xnudxsoyppv6.cloudfront.net
- **Status**: InProgress (takes 15-20 minutes to fully deploy)
- **Configuration**:
  - Origin: S3 static website endpoint
  - HTTPS redirect enabled
  - Compression enabled
  - Custom error responses for SPA routing (404/403 -> index.html)
  - Default root object: index.html

## Deployment Commands

### Build the project
```bash
npm run build
```

### Create S3 bucket
```bash
aws s3api create-bucket --bucket phya-co-za --region af-south-1 --create-bucket-configuration LocationConstraint=af-south-1
```

### Enable static website hosting
```bash
aws s3 website s3://phya-co-za/ --index-document index.html --error-document index.html --region af-south-1
```

### Disable block public access
```bash
aws s3api put-public-access-block --bucket phya-co-za --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" --region af-south-1
```

### Apply bucket policy for public access
```bash
cat > /tmp/bucket-policy.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::phya-co-za/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket phya-co-za --policy file:///tmp/bucket-policy.json --region af-south-1
```

### Upload files to S3
```bash
# Upload static assets with long cache
aws s3 sync dist/ s3://phya-co-za/ --region af-south-1 --delete --cache-control "public, max-age=31536000" --exclude "*.html"

# Upload HTML files with no cache
aws s3 cp dist/index.html s3://phya-co-za/index.html --region af-south-1 --cache-control "no-cache" --content-type "text/html"
```

### Create CloudFront distribution
```bash
# The distribution was created with a configuration file
# Distribution config includes SPA routing support and HTTPS redirect
```

## Update Deployment

To update the website after making changes:

```bash
# Build the project
npm run build

# Sync files to S3
aws s3 sync dist/ s3://phya-co-za/ --region af-south-1 --delete

# Invalidate CloudFront cache (if needed for immediate updates)
aws cloudfront create-invalidation --distribution-id E3AWOY3ASC2MO4 --paths "/*"
```

## Check CloudFront Distribution Status

```bash
aws cloudfront get-distribution --id E3AWOY3ASC2MO4 --query 'Distribution.Status' --output text
```

When status shows "Deployed", the CloudFront distribution is ready.

## Important Notes

1. The CloudFront distribution takes 15-20 minutes to fully deploy globally
2. The S3 website URL works immediately but is not HTTPS
3. Always use the CloudFront URL for production to benefit from HTTPS and CDN caching
4. The configuration includes custom error responses to support SPA routing
5. Static assets are cached for 1 year, HTML files are not cached