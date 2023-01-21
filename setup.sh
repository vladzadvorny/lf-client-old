#!/bin/bash

tar czvf package.tar.gz package.json

scp package.tar.gz root@79.132.138.106:~/.
rm package.tar.gz

ssh root@79.132.138.106 << 'ENDSSH'
# pm2 stop lilyfamily_ssr
# pm2 delete lilyfamily_ssr
rm -rf lilyfamily_ssr
mkdir lilyfamily_ssr
tar xf package.tar.gz -C ./lilyfamily_ssr
rm package.tar.gz
cd lilyfamily_ssr
yarn
ENDSSH

tar czf dist-ssr.tar.gz dist-ssr

scp dist-ssr.tar.gz root@79.132.138.106:~/lilyfamily_ssr
rm dist-ssr.tar.gz

ssh root@79.132.138.106 << 'ENDSSH'
cd lilyfamily_ssr
rm -rf dist-ssr
tar xf dist-ssr.tar.gz -C ./
rm dist-ssr.tar.gz
pm2 start dist-ssr/server.js --name "lilyfamily_ssr"
ENDSSH