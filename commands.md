



- Contruir imagenes en dockerhub
```
docker build -t dyllgold/usuarios-service:v1 .
docker build -t dyllgold/juegos-service:v1 .


docker run -d -p 3006:3001 --name usuarios-service dyllgold/usuarios-service:v1
docker run -d -p 3007:3002 --name --network my-network juegos-service dyllgold/juegos-service:v1
```

- Logs
```
docker logs juegos-service

docker network create my-network
docker run -d --name mysql-container --network my-network -e MYSQL_ROOT_PASSWORD=12345678 -e MYSQL_DATABASE=soa_p mysql:5.7

d


GRANT ALL PRIVILEGES ON soa_p.* TO 'root'@'%';
FLUSH PRIVILEGES;
```

- Mysql container
```
docker exec -it mysql-container bash
mysql -u root -p
```