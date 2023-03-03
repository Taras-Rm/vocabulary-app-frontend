#!/bin/bash

# change it according to your environment
AWS_PROFILE="taras-home"
BUCKET_NAME="vocabulary-app-frontend"
CLOUDFRONT_DISTRIBUTION_ID="ER05MSOTYYBLZ"

./node_modules/.bin/cross-env \
    REACT_APP_API_URL= \

    npm run build

aws s3 sync build/ s3://${BUCKET_NAME} \
    --profile ${AWS_PROFILE}

aws cloudfront create-invalidation \
    --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} \
    --paths '/*' \
    --profile ${AWS_PROFILE}
    