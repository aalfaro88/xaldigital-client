# XalDigital Server - Documentación

Este README proporciona una descripción general de lo que se ha implementado durante el test para XALDIGITAL

## Descripción

La aplicación proporciona acceso a datos de vuelos y de la comunidad de Stack Overflow a través de API. Este servidor se ha desarrollado utilizando Node.js y SQLite como base de datos.

Las herramientas utilizadas fueron ReactJs con configuración inicial de Vite, y para el servidor se ha utilizado Node.js. 

## Funcionalidades Principales

### Datos de Vuelos

El servidor gestiona datos de vuelos, incluyendo aerolíneas, aeropuertos, movimientos y vuelos. Aquí están las funcionalidades principales relacionadas con los datos de vuelos:

- Creación de tablas para aerolíneas, aeropuertos, movimientos y vuelos en la base de datos SQLite.
- Inserción de datos de ejemplo en las tablas.
- Ofrece rutas API para obtener información sobre vuelos, aeropuertos y aerolíneas.
- Proporciona consultas para responder preguntas específicas sobre los datos de vuelos, como el aeropuerto con más movimientos o la aerolínea con más vuelos.

### Comunicación con Stack Overflow

El servidor también se comunica con la API de Stack Overflow para obtener información de la comunidad. Aquí están las funcionalidades relacionadas con Stack Overflow que nos permite extraer de manera ordenada la información que se encuentra en la API con el siguiente vinculo: 

https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow


## Autores

- Alberto Alfaro

