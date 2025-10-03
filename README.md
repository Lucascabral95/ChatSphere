<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="ChatSphere Logo" width="120"/>
  <h1 align="center">ChatSphere</h1>
  <p align="center">Chat en tiempo real con autenticación segura y mensajería instantánea</p>
</p>

## 🚀 Características Principales

- **Chat en Tiempo Real**: Mensajería instantánea con actualizaciones en vivo
- **Autenticación Segura**: Inicio de sesión con Google y credenciales propias
- **Gestión de Contactos**: Busca y agrega amigos fácilmente
- **Notificaciones en Tiempo Real**: Recibe alertas instantáneas de nuevos mensajes
- **Diseño Responsivo**: Funciona perfectamente en móviles y escritorios
- **Persistencia de Datos**: Todos los mensajes se guardan de forma segura

## 🛠️ Tecnologías Utilizadas

### Frontend

- Next.js 14 con App Router
- React 18
- TypeScript
- Tailwind CSS
- Zustand para gestión de estado
- React Hook Form para formularios

### Backend

- Next.js API Routes
- MongoDB con Mongoose
- NextAuth.js y Google OAuth para autenticación
- Pusher para WebSockets
- Nodemailer para envío de correos

### Despliegue

- Vercel (Frontend)
- MongoDB Atlas (Base de datos)
- Pusher (WebSockets)

## 📦 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Lucascabral95/ChatSphere.git
   cd ChatSphere
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configuración**
   Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

   ```env
   MONGODB_URI=tu_cadena_de_conexion_mongodb
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=tu_secreto_seguro
   GOOGLE_CLIENT_ID=tu_google_client_id
   GOOGLE_CLIENT_SECRET=tu_google_client_secret
   PUSHER_APP_ID=tu_pusher_app_id
   PUSHER_KEY=tu_pusher_key
   PUSHER_SECRET=tu_pusher_secret
   PUSHER_CLUSTER=tu_pusher_cluster
   NODEMAILER_EMAIL=tu_email_para_envios
   NODEMAILER_PASSWORD=tu_contraseña_de_aplicacion
   ```

4. **Ejecutar en desarrollo**

   ```bash
   npm run dev
   # o
   yarn dev
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # Rutas de la aplicación (App Router)
│   ├── api/               # Endpoints de la API
│   ├── auth/              # Autenticación
│   └── application/       # Aplicación principal
├── components/            # Componentes reutilizables
├── infraestructure/       # Configuración y servicios
│   ├── config/
│   ├── constants/
│   ├── interfaces/
│   ├── models/
│   └── services/
└── presentation/          # Componentes, hooks y utils
    ├── components/
    ├── hooks/
    └── utils/
```

## 🔒 Autenticación

ChatSphere ofrece múltiples métodos de autenticación:

- **Credenciales propias** (email/contraseña)
- **Google OAuth**
- Persistencia de sesión segura
- Protección de rutas privadas

## 🌐 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno en la configuración del proyecto
3. ¡Despliega con un clic!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLucascabral95%2FChatSphere)

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, lee la [guía de contribuciones](CONTRIBUTING.md) para más detalles.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📬 Contacto

- **Autor**: Lucas Cabral
- **Email**: lucassimple@hotmail.com
- **GitHub**: [@Lucascabral95](https://github.com/Lucascabral95)
- **LinkedIn**: [Lucas Gastón Cabral](https://www.linkedin.com/in/lucas-gastón-cabral/)

---

<p align="center">
  Desarrollado con ❤️ por Lucas Cabral
</p>
