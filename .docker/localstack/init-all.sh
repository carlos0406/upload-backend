#!/bin/bash

# Executa o script de inicialização do S3
echo "Running init-s3.sh..."
/etc/localstack/init/ready.d/utils/init-s3.sh

# Verifica se o primeiro script foi executado com sucesso
if [ $? -ne 0 ]; then
    echo "init-s3.sh failed!"
    exit 1
fi

# Executa o script de configuração do CORS
echo "Running init-cors.sh..."
/etc/localstack/init/ready.d/utils/init-cors.sh

# Verifica se o segundo script foi executado com sucesso
if [ $? -ne 0 ]; then
    echo "init-cors.sh failed!"
    exit 1
fi

echo "All scripts executed successfully!"
