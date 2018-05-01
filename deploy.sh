#!/bin/bash
ENV=$1
 function sshtmp
 {
     ssh -o "ConnectTimeout 3" \
         -o "StrictHostKeyChecking no" \
         -o "UserKnownHostsFile /dev/null" \
              "$@"
 }

if $ENV === 'development'
user='dev'
host=104.131.110.212
then
user='nnadi'
host= 159.65.39.38
fi
sshtmp $user@$host << EOF
cd ndeputa
git pull
npm install --production
pm2 restart all
EOF