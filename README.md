# Sistema Web de Gestión Operativa y Programación - Radio La Jefa

## Datos del Estudiante y de la Empresa

### Información del Estudiante
* Estudiante: Bryan Fuertes
* Usuario de GitHub: fuertesbryan
* Correo Electrónico: fuertesbryan48@gmail.com
* Asignatura: Desarrollo de Aplicaciones Nativas en la Nube
* Componente: Prácticum 3 / Taller APEB2 (30%)
* Carrera: Ingeniería en Tecnologías de la Información / Desarrollo de Software

### Información de la Empresa
* Nombre de la Empresa: Radio La Jefa
* Sector: Emisora Radial y Medios de Comunicación
* Contexto Operativo:  
  Radio La Jefa es una empresa dedicada a la difusión de contenidos musicales, noticiosos y programas de entretenimiento en frecuencia modulada. Para optimizar el control de su parrilla de programación y la gestión de pautas publicitarias, la emisora requiere digitalizar sus procesos operativos centrales mediante una arquitectura web distribuida.

---

## Mapa de Capacidades (Prácticum 3)

El mapa de capacidades representa las facultades operativas que la empresa Radio La Jefa requiere para llevar a cabo su modelo de negocio.

```
===================================================================================
                       MAPA DE CAPACIDADES - RADIO LA JEFA
===================================================================================
  1. GESTIÓN DE PROGRAMACIÓN   |  2. GESTIÓN DE PAUTAS        |  3. AUDIENCIA Y
     Y PARRILLA RADIAL         |     PUBLICITARIAS            |     INTERACCIÓN
  ---------------------------  |  --------------------------  |  ----------------
  • Planificación de Horarios  |  • Registro de Anunciantes   |  • Transmisión
  • Asignación de Locutores    |  • Control de Cuñas / Pautas |    Streaming
  • Categorización de Shows    |  • Tarifarios y Contratos    |  • Peticiones de
  • Estado de la Emisión (CRUD)|  • Reportes de Emisión       |    Oyentes
===================================================================================
```

### Tabla de Capacidades del Negocio

| Capacidad Nivel 1 | Capacidad Nivel 2 | Descripción de la Capacidad | Aplicación Web Objetivo |
| :--- | :--- | :--- | :--- |
| 1. Gestión de Programación Radial | 1.1 Administración de Shows | Permite registrar, consultar, actualizar y eliminar programas radiales. | Módulo CRUD de Programación (`/api/programas`) |
| | 1.2 Control de Horarios | Gestiona bloques de emisión y locutores asignados a cada espacio. | Visor de Parrilla en Tiempo Real |
| 2. Gestión de Publicidad | 2.1 Emisión de Cuñas | Organiza contratos de pautas publicitarias de anunciantes. | Módulo de Publicidad |
| 3. Transmisión e Interacción | 3.1 Streaming Digital | Emisión de la señal de radio e interacción con los oyentes. | Reproductor de Radio |

---

## Información de la Aplicación Objetivo

El sistema se compone de dos componentes desacoplados:

1. Backend (API REST): Desarrollado en Java con el framework Spring Boot 3. Gestiona los datos persistentes de los programas mediante una base de datos en memoria H2. Expose los servicios REST en la ruta `/api/programas`.
2. Frontend (Cliente Web): Desarrollado con el framework Next.js (React) y TypeScript. Consume los servicios REST expuestos por Spring Boot para la gestión en tiempo real de los datos y la presentación del mapa de capacidades.

---

## Guía de Instalación y Ejecución

### Requisitos Previos
* Java Development Kit (JDK) 17 o superior.
* Node.js v18 o superior y administrador de paquetes npm.

### 1. Ejecución del Backend (Spring Boot API)
1. Abrir la terminal en el directorio del backend:
   ```bash
   cd api
   ```
2. Ejecutar la aplicación Spring Boot mediante el script incluido o Maven:
   * En Windows: ejecutar la orden:
     ```bash
     .\apache-maven-3.9.16\bin\mvn.cmd spring-boot:run
     ```
3. El servicio se iniciará en `http://localhost:8080`.
4. La consola de la base de datos H2 estará disponible en `http://localhost:8080/h2-console`.

### 2. Ejecución del Frontend (Next.js)
1. Abrir la terminal en el directorio del frontend:
   ```bash
   cd radio-la-jefa-web
   ```
2. Instalar dependencias e iniciar el servidor de desarrollo:
   ```bash
   npm install
   npm run dev
   ```
3. La interfaz web estará accesible en `http://localhost:3000`.

---

## Despliegue en Railway

1. Subir el repositorio completo a GitHub.
2. En la plataforma Railway, crear un nuevo proyecto conectado al repositorio.
3. Para el backend, seleccionar la raíz del repositorio y configurar la ruta del proyecto en la carpeta `/api`.
4. Para el frontend, crear un servicio vinculado a la carpeta `/radio-la-jefa-web` y configurar la variable de entorno `NEXT_PUBLIC_API_URL` apuntando al dominio público asignado al servicio backend.
