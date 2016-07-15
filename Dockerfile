FROM nginx
COPY ./app/public /usr/share/nginx/html
EXPOSE 80
