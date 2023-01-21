#!/bin/bash

tar czf dist-ssr.tar.gz dist-ssr

scp dist-ssr.tar.gz root@79.132.138.106:~/lilyfamily_ssr
rm dist-ssr.tar.gz

ssh root@79.132.138.106 << 'ENDSSH'
cd lilyfamily_ssr
rm -rf dist-ssr
tar xf dist-ssr.tar.gz -C ./
rm dist-ssr.tar.gz
pm2 stop lilyfamily_ssr
pm2 start lilyfamily_ssr
ENDSSH