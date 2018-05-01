#!/bin/bash
ENV=$1

if $ENV === 'development'
user='dev'
host=104.131.110.212
then
user='nnadi'
host= 159.65.39.38
fi
ssh -o "StrictHostKeyChecking=accept-new" $user@$host << EOF
cd ndeputa
git pull
npm install --production
pm2 restart all
EOF