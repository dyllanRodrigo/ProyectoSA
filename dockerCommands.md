
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


kubectl logs -n ingress-nginx ingress-nginx-controller-66f986c956-dnsr2


kubectl logs mysql-f4d864cb9-xkp8t
kubectl delete pvc mysql-data
kubectl delete pod mysql-596d6c6f8b-cgdfx 
kubectl delete pod mysql-856d87446-xb8ql


kubectl exec -it mysql-89dc6d4d9-rqwgb -- ls /var/lib/mysql

kubectl delete deployment mysql
kubectl delete service mysql
kubectl delete pvc mysql-container
kubectl delete pv pvc-60486bf4-a49d-4519-be8e-b69424ea46dd



kubectl get pv


kubectl exec -it mysql-78798969bc-6gx9s -- bash