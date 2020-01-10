pkill -9 php
php-cgi -b 127.0.0.1:9000 &
nginx -s reload
curl localhost/time.php
