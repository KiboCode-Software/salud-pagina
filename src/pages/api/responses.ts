import type { APIRoute } from 'astro';
import { getQuizResponses, saveQuizResponse, type QuizResponse } from '../../lib/quiz-storage';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body: QuizResponse = await request.json();

  if (!body.nombre || !body.respuestas) {
    return new Response(JSON.stringify({ error: 'Nombre y respuestas son requeridos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await saveQuizResponse(id, body);

  return new Response(JSON.stringify({ ok: true, id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET: APIRoute = async () => {
  const responses = await getQuizResponses();

  return new Response(JSON.stringify(responses), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
