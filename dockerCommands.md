
```
docker login
```

```
docker build -t dyllgold/login-service ./login-service
docker build -t dyllgold/juegos-service ./juegos-service
docker build -t dyllgold/usuarios-service ./usuarios-service
```


```
docker tag dyllgold/login-service dyllgold/login-service:latest
docker tag dyllgold/juegos-service dyllgold/juegos-service:latest
docker tag dyllgold/usuarios-service dyllgold/usuarios-service:latest
```


```
docker push dyllgold/login-service:latest
docker push dyllgold/juegos-service:latest
docker push dyllgold/usuarios-service:latest

```