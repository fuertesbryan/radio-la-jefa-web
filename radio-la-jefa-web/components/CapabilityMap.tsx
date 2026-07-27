'use client';

import React from 'react';

export function CapabilityMap() {
  const capabilities = [
    {
      title: '1. Gestión de Programación Radial',
      items: [
        '1.1 Módulo CRUD de Shows y Parrilla',
        '1.2 Asignación de Locutores y Horarios',
        '1.3 Categorización de Géneros y Contenidos',
        '1.4 Control de Estado de Emisión'
      ]
    },
    {
      title: '2. Gestión de Pautas Publicitarias',
      items: [
        '2.1 Registro de Clientes y Anunciantes',
        '2.2 Programación de Cuñas Publicitarias',
        '2.3 Control de Tarifarios y Tiempos de Aire',
        '2.4 Reportes de Emisión Comercial'
      ]
    },
    {
      title: '3. Transmisión e Interacción Digital',
      items: [
        '3.1 Streaming de Señal Digital en Vivo',
        '3.2 Recepción de Peticiones de Oyentes',
        '3.3 Publicación de Eventos y Noticias',
        '3.4 Estadísticas de Audiencia Estimada'
      ]
    }
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-md p-6 shadow-sm">
      <div className="border-b border-gray-200 pb-3 mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          Mapa de Capacidades del Negocio — Radio La Jefa
        </h2>
        <p className="text-xs text-gray-600">
          Estructura de capacidades identificadas en el Prácticum 3 para el desarrollo del sistema web.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {capabilities.map((cap, idx) => (
          <div key={idx} className="bg-gray-50 border border-gray-200 rounded p-4">
            <h3 className="text-sm font-bold text-blue-900 border-b border-gray-200 pb-2 mb-3">
              {cap.title}
            </h3>
            <ul className="space-y-1.5">
              {cap.items.map((item, itemIdx) => (
                <li key={itemIdx} className="text-xs text-gray-700 flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
