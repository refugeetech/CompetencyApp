FROM nginx

ADD ./www/index.html /usr/share/nginx/html/index.html
ADD ./www/css /usr/share/nginx/html/css
ADD ./www/js /usr/share/nginx/html/js
ADD ./www/lib /usr/share/nginx/html/lib
ADD ./www/templates /usr/share/nginx/html/templates
