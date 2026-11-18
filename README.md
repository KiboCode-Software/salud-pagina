# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Respuestas del cuestionario en Vercel Blob

Las respuestas se guardan en un almacén **privado**, bajo `quiz-responses/`.
El guardado, la consulta y la descarga de Excel comparten la configuración de
`src/lib/quiz-storage.ts`.

En Vercel, conecta el almacén al proyecto y habilita autenticación OIDC para
Production y Preview. El código usa `BLOB_READ_WRITE_TOKEN_STORE_ID`, como en la
configuración actual del proyecto, y admite `BLOB_STORE_ID` como alternativa.
El SDK obtiene las credenciales OIDC de cada petición; también permite usar
`BLOB_READ_WRITE_TOKEN` si se configura autenticación mediante token.

Después de desplegar estos cambios, completa el cuestionario y comprueba
`/api/responses` y `/api/download` para verificar la integración en Vercel.
No es necesario copiar las variables de producción al repositorio.

Referencia: [autenticación de Vercel Blob](https://vercel.com/docs/vercel-blob/using-blob-sdk#authentication).
