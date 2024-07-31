# Prueba final módulo - Acceso a datos en aplicaciones Node

En esta prueba, se validarán los conocimientos sobre la conexión a una base de datos PostgreSQL con Node.js, la realización de consultas DML y TCL, la construcción de una API RESTful, y el manejo de errores y códigos de estado HTTP.

## Descripción

El Banco Solar ha decidido invertir en un nuevo sistema de transferencias y requiere que desarrolles un servidor con Node.js que utilice PostgreSQL para la gestión y persistencia de datos. El sistema debe permitir:

1. Registrar nuevos usuarios con un balance inicial.
2. Realizar transferencias de saldo entre los usuarios.
3. Consultar y actualizar datos de usuarios y transferencias.

## Vista del Diseño

A continuación, se muestra una imagen de la interfaz cliente preparada para interactuar con el servidor:

![banco](screenshot/banco.png)

## Rutas

Las rutas que deberás implementar en el servidor son las siguientes:

- **`/` GET**
  - Devuelve el archivo HTML de la aplicación cliente.

- **`/usuario` POST**
  - Recibe los datos de un nuevo usuario y los almacena en PostgreSQL.

- **`/usuarios` GET**
  - Devuelve todos los usuarios registrados con sus balances.

- **`/usuario` PUT**
  - Recibe los datos modificados de un usuario registrado y actualiza sus datos.

- **`/usuario` DELETE**
  - Recibe el ID de un usuario registrado y lo elimina.

- **`/transferencia` POST**
  - Recibe los datos para realizar una nueva transferencia utilizando una transacción SQL.

- **`/transferencias` GET**
  - Devuelve todas las transferencias almacenadas en la base de datos.

## Autor

Este proyecto fue desarrollado por **Valeria Torrealba**.
