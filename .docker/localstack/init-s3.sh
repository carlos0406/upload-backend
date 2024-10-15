#!/bin/bash
set -e

# Wait for LocalStack to be ready
echo "Waiting for LocalStack to be ready..."
sleep 10

# Create the bucket "uploader"
if awslocal s3 mb s3://uploader; then
  echo "Bucket 'uploader' created successfully!"
else
  echo "Failed to create bucket 'uploader'. It might already exist."
fi

# List the buckets to confirm
echo "Listing buckets:"
awslocal s3 ls