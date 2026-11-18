import type { APIRoute } from 'astro';
import { getQuizResponses } from '../../lib/quiz-storage';
import * as XLSX from 'xlsx';

export const prerender = false;

export const GET: APIRoute = async () => {
  const responses = await getQuizResponses();

  const rows: Record<string, string | number | boolean>[] = [];

  for (const data of responses) {
    const row: Record<string, string | number | boolean> = {
      Nombre: data.nombre,
      Fecha: data.fecha,
      Puntaje: `${data.puntaje}/${data.total}`,
    };

    data.respuestas.forEach((r: { pregunta: string; respuesta: string; correcta: boolean }, i: number) => {
      row[`Pregunta ${i + 1}`] = r.pregunta;
      row[`Respuesta ${i + 1}`] = r.respuesta;
      row[`Correcta ${i + 1}`] = r.correcta ? 'Sí' : 'No';
    });

    rows.push(row);
  }

  if (rows.length === 0) {
    rows.push({ Nombre: '(sin respuestas aún)', Fecha: '', Puntaje: '' });
  }

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Respuestas');

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

  return new Response(buf, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="respuestas-quiz.xlsx"',
    },
  });
};
