#!/bin/bash

# Nome do bucket que deseja configurar
BUCKET_NAME="uploader"

# Aguarda o LocalStack iniciar o serviço S3
awslocal s3 mb s3://$BUCKET_NAME

# Aplica a configuração de CORS ao bucket
awslocal s3api put-bucket-cors --bucket $BUCKET_NAME --cors-configuration file:///etc/localstack/init/ready.d/utils/cors-config.json
