import { get, list, put } from '@vercel/blob';

export interface QuizResponse {
  nombre: string;
  respuestas: { pregunta: string; respuesta: string; correcta: boolean }[];
  puntaje: number;
  total: number;
  fecha: string;
}

const BLOB_PREFIX = 'quiz-responses/';

function getBlobOptions() {
  // El SDK obtiene las credenciales OIDC del contexto de la petición en Vercel.
  return {
    storeId: process.env.BLOB_READ_WRITE_TOKEN_STORE_ID?.trim()
      || process.env.BLOB_STORE_ID?.trim(),
  };
}

export async function saveQuizResponse(id: string, data: QuizResponse) {
  await put(`${BLOB_PREFIX}${id}.json`, JSON.stringify(data), {
    ...getBlobOptions(),
    access: 'private',
    contentType: 'application/json',
  });
}

export async function getQuizResponses(): Promise<QuizResponse[]> {
  const options = getBlobOptions();
  const responses: QuizResponse[] = [];
  let cursor: string | undefined;

  do {
    const page = await list({ ...options, prefix: BLOB_PREFIX, cursor });

    for (const blob of page.blobs) {
      const result = await get(blob.url, { ...options, access: 'private' });

      if (result?.statusCode !== 200) {
        throw new Error('No se pudo leer una respuesta guardada en Vercel Blob.');
      }

      const data: QuizResponse = await new Response(result.stream).json();
      responses.push(data);
    }

    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return responses;
}
