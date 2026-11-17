import type { APIRoute } from 'astro';
import { put, list, del } from '@vercel/blob';

export const prerender = false;

interface QuizResponse {
  nombre: string;
  respuestas: { pregunta: string; respuesta: string; correcta: boolean }[];
  puntaje: number;
  total: number;
  fecha: string;
}

const BLOB_PREFIX = 'quiz-responses/';

export const POST: APIRoute = async ({ request }) => {
  const body: QuizResponse = await request.json();

  if (!body.nombre || !body.respuestas) {
    return new Response(JSON.stringify({ error: 'Nombre y respuestas son requeridos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const filename = `${BLOB_PREFIX}${id}.json`;

  await put(filename, JSON.stringify(body), {
    access: 'public',
    contentType: 'application/json',
  });

  return new Response(JSON.stringify({ ok: true, id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET: APIRoute = async () => {
  const { blobs } = await list({ prefix: BLOB_PREFIX });

  const responses: QuizResponse[] = [];
  for (const blob of blobs) {
    const res = await fetch(blob.url);
    const data = await res.json();
    responses.push(data);
  }

  return new Response(JSON.stringify(responses), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
