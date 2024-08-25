drop database soa_p;


SELECT * FROM Juego;
SELECT * FROM Categoria;
SELECT * FROM Desarrollador;
SELECT * FROM Usuario;
SELECT * FROM Rating;

SELECT * FROM JuegoCategoria;
SELECT * FROM JuegoDesarrollador;
SELECT * FROM JuegosUsuario;


SELECT DISTINCT C.nombre AS CategoriasIntereses
FROM Usuario U
JOIN JuegosUsuario JU ON U.idUsuario = JU.Usuario_idUsuario
JOIN Juego J ON JU.Juego_idJuego = J.idJuego
JOIN JuegoCategoria JC ON J.idJuego = JC.idJuego
JOIN Categoria C ON JC.idCategoria = C.idCategoria
WHERE U.idUsuario = 1;