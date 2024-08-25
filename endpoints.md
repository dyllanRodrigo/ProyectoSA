
## POST
```
http://localhost:3001/api/usuarios
{
    "nombre": "Juan",
    "apellido": "Pérez",
    "nickname": "juanp",
    "correo": "juanp@mail.com",
    "telefono": "12345678",
    "direccion": "Calle 123",
    "region": "Guatemala",
    "rol": "admin"
}


http://localhost:3002/api/desarrolladores
{
    "nombre": "SEGA"
}

http://localhost:3002/api/juegos
{
    "nombre": "GTA 6",
    "clasificacion_edad": "E",
    "fecha_lanzamiento": "2024-08-15",
    "restriccion_region": "Ninguna",
    "precio": 49.99,
    "genero": "Acción",  
    "categorias": [1],
    "desarrolladores": [1]
}

http://localhost:3002/api/categorias
{
    "nombre": "Racing"
}


http://localhost:3002/api/ratings
{
    "Juego_idJuego": 1,  
    "Usuario_idUsuario": 1,
    "valor": "5",
    "comentario": "Muy bueno"
}


```


## GET

```
http://localhost:3001/api/usuarios
http://localhost:3002/api/desarrolladores
http://localhost:3002/api/juegos
http://localhost:3002/api/categorias
```