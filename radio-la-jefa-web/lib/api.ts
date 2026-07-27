export interface Programa {
  id?: number;
  titulo: string;
  locutor: string;
  horario: string;
  categoria: string;
  estado: string;
  audienciaEstimada: number;
  descripcion: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/programas';

// Datos de reserva (fallback) por si la API aún no está iniciada en local
const FALLBACK_PROGRAMAS: Programa[] = [
  {
    id: 1,
    titulo: "El Mañanero de La Jefa",
    locutor: "Carlos 'El Patrón' Mendoza",
    horario: "06:00 - 09:00 AM",
    categoria: "Entretenimiento y Noticias",
    estado: "EN VIVO",
    audienciaEstimada: 15400,
    descripcion: "El programa matutino más escuchado con las mejores noticias, humor y arranque musical del día."
  },
  {
    id: 2,
    titulo: "Las Rancheras Consentidas",
    locutor: "María José Rivas",
    horario: "09:00 - 12:00 PM",
    categoria: "Música Popular",
    estado: "PROGRAMADO",
    audienciaEstimada: 12800,
    descripcion: "Espacio dedicado a los grandes éxitos de la música ranchera y mexicana de todos los tiempos."
  },
  {
    id: 3,
    titulo: "La Jefa Deportes y Pasión",
    locutor: "Roberto 'El Chino' Salazar",
    horario: "12:00 - 02:00 PM",
    categoria: "Deportes",
    estado: "PROGRAMADO",
    audienciaEstimada: 9500,
    descripcion: "Análisis deportivo nacional e internacional, entrevistas exclusivas y debate en vivo."
  },
  {
    id: 4,
    titulo: "Tarde Latina y Cumbia VIP",
    locutor: "Dj Alex 'La Sombra'",
    horario: "02:00 - 06:00 PM",
    categoria: "Música Variada",
    estado: "PROGRAMADO",
    audienciaEstimada: 18200,
    descripcion: "Los ritmos más bailables, peticiones del público en vivo y mezclas exclusivas para alegrar la tarde."
  }
];

export async function fetchProgramas(): Promise<{ data: Programa[]; isMock: boolean }> {
  try {
    const res = await fetch(API_BASE_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('Error al conectar con la API');
    const data = await res.json();
    return { data, isMock: false };
  } catch (error) {
    console.warn('API Spring Boot inaccesible, usando datos de demostración:', error);
    return { data: FALLBACK_PROGRAMAS, isMock: true };
  }
}

export async function createPrograma(programa: Omit<Programa, 'id'>): Promise<Programa> {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(programa),
  });
  if (!res.ok) throw new Error('No se pudo crear el programa');
  return res.json();
}

export async function updatePrograma(id: number, programa: Partial<Programa>): Promise<Programa> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(programa),
  });
  if (!res.ok) throw new Error('No se pudo actualizar el programa');
  return res.json();
}

export async function deletePrograma(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('No se pudo eliminar el programa');
}
