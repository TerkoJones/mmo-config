# mmo-config

## descripción
    Crea un objeto con entradas para la configuración de la aplicación a partir de un archivo JSON denominado mmo.json que ha de encontrarse en el mismo directorio del punto de entrada a la misma. 
## instalación
```
    yarn add terkojones/mmo-config
```
## uso
```javascript
    const config= require('mmo-config');
```
El archivo mmo.json puede tener tantas entradas como se necesiten y con cualquier nombre válido. Las entradas 'env', 'envs' y 'maindir' tienen un tratamiento especial. 

### entrada 'maindir'
Es creada de forma automática y contiene el directorio del punto de entrada a la aplicación. En base a esta entrada se resuelven las rutas relativas que se propocionan en 'mmo.json'.

### entrada 'env'
Determina el entorno de ejecución. Si se omite se toma de la variable de entorno 'NODE_ENV' y si ésta no existe de establece por defecto a 'development'.
Indica los valores de que entrada de 'envs' serán tomados en cuenta para establecer la configuración según en el entorno de ejecución.

### entrada 'envs'
Puede contener, o diversas entradas para cada entorno de ejecución, o una ruta a una carpeta donde se encuentran los diversos archivos '.env.json'('development.env.json', 'production.env.json', ...) con el mismo objetivos.

## ejemplos
### Único archivo
fichero mmo.json, directorio de entrada '/miapp'.
```json
    {
        "templates": {
            "directory": "templates"
        },
        "port": 8000,   
        "envs": {
            "production": {
                "port": 3000,
                "templates" : {
                    "preload": [
                        "index",
                        "login"
                    ]
                }
            }
        }
    }
```
Si NODE_ENV==='production' generará el siguiente objeto con configuracion:
```javascript
    {
        maindir: '/miapp',
        env: 'production',
        templates: {
            directory: 'templates',
            preload: [
                'index',
                'login'
            ]
        },
        port: 3000
    }
```
en cualquier otro caso:
```javascript
    {
        maindir: '/miapp',
        env: 'development',
        templates: {
            directory: 'templates'
        },
        port: 8000
    }
```
### varios archivos

fichero mmo.json, directorio de entrada '/miapp'.
```json
    {
        "templates": {
            "directory": "templates"
        },
        "envs": "config"
    }
```
fichero /miapp/config/production.env.json
```json
    {
        "port": 8000,
        "templates" : {
            "preload": [
                "index",
                "login"
            ]
        }
    }
```
fichero /miapp/config/development.env.json
```json
    {
        "port": 3000,
        "templates" : {
            "preload": "all"
        }
    }
```
Si NODE_ENV==='production' generará el siguiente objeto con configuracion:
```javascript
    {
        maindir: '/miapp',
        env: 'production',
        templates: {
            directory: 'templates',
            preload: [
                'index',
                'login'
            ]
        },
        port: 8000
    }
```
En cualquier otro caso:
```javascript
    {
        maindir: '/miapp',
        env: 'development',
        templates: {
            directory: 'templates',
            preload: 'all'
        },
        port: 3000
    }
```