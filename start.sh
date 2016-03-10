#!/bin/sh

sed -i -- ""s/http/$API_PROTOCOL/g"" /usr/share/nginx/html/js/services/api.js
sed -i -- ""s/localhost\:1337/$API_HOST/g"" /usr/share/nginx/html/js/services/api.js

nginx -g "daemon off;"
