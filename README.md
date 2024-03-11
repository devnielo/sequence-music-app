# Sequence Music App

## Descripción
Sequence Music App es una aplicación web desarrollada en Angular, dedicada a la gestión y visualización de canciones. Incluye funcionalidades como la visualización de canciones, búsqueda, añadir/editar canciones, y manejar artistas y géneros.

## Cómo Empezar

### Requisitos Previos
- Node.js 18.17.0.
- Angular CLI 16.2
- JSON Server (para simular una API REST)

### Instalación y Ejecución
1. Clona el repositorio:
git clone url-del-repositorio

css
Copy code
2. Instala las dependencias del proyecto:
npm install

arduino
Copy code
3. Inicia JSON Server para simular el backend:
json-server --watch db.json

markdown
Copy code
(Asegúrate de que `db.json` esté en la raíz del proyecto y contenga los datos iniciales)

4. Ejecuta la aplicación en modo de desarrollo:
ng serve

markdown
Copy code
5. Abre tu navegador y visita `http://localhost:4200`.

## Características Implementadas
- **Visualización de Canciones:** Muestra una lista de canciones con opciones para ver detalles.
- **Búsqueda de Canciones:** Función de búsqueda que permite encontrar canciones por título.
- **Gestión de Canciones:** Posibilidad de añadir y editar canciones, incluyendo detalles como el título, artistas, género, año, puntuación y enlace a una imagen.
- **Responsive Design:** La aplicación es completamente responsive y se adapta a varios tamaños de pantalla.

## Tecnologías Utilizadas
- Angular
- NgRx para manejo de estado
- Tailwind CSS para el diseño
- JSON Server para el backend simulado

## Por Hacer
- **Tests Unitarios:** Implementar pruebas unitarias para garantizar la robustez del código.
- **Internacionalización:** Añadir soporte para múltiples idiomas.
- **Autenticación de Usuarios:** Implementar un sistema de login para manejar diferentes usuarios.
- **Mejoras en la UX/UI:** Continuar mejorando la interfaz de usuario para una mejor experiencia.

### PD: Gracias por haberme dado la oportunidad, he querido tomarme esto como un proyecto/objetivo personal con todos los requisitos. Espero que os guste (lo que he podido hacer) pero he tenido el tiempo justo con tanto trabajo.
### Un cordial saludo, Daniel.
