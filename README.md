# TEST HTML - SASS

A continuación presentamos un pequeño ejemplo de HTML aplicando SASS para generar un diseño web responsive.

**Pasos para compilar el código de SASS en CSS**
1. Tener preinstalado en nuestro sistema NodeJS
2. Instalar el compilador de SASS utilizando la consola o terminal del equipo ejecutando el siguiente comando:
    ``` 
        npm install -g node-sass 
    ```
3. Ejecutar con la consola o terminal del equipo ubicados en el directorio del proyecto la función de _node-sass_ para compilar nuestro codigo, en la misma linea hay que especificar la carpeta de origen que contiene nuestro codigo _sass_ seguido por el flag _-o (output)_ y el nombre de la carpeta de desino donde se van a compilar nuestros estilos _css_. El flag _-w (watch)_ es una función que una vez ejecutada la linea de comandos, permite ver en consola los cambios que se van produciendo, ayuda para un mejor DEBUG.
    ```
        node-sass -w sass -o css
    ```