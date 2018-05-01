#!/bin/bash
ENV=$1

if $ENV === 'development'
user='dev'
host=104.131.110.212
then
user='nnadi'
host= 159.65.39.38
fi
$ ssh $user@$host << EOF
cd ndeputa
git pull
npm i
pm2 restart all
EOF