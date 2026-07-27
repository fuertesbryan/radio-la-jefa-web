'use client';

import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

export function RadioHeader() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <header className="bg-blue-900 text-white shadow-md">
      {/* Barra superior de información académica */}
      <div className="bg-blue-950 text-blue-200 text-xs py-1.5 px-6 border-b border-blue-800 flex flex-wrap justify-between items-center">
        <span>UTPL — Prácticum 3 (Desarrollo de Aplicaciones Nativas en la Nube)</span>
        <div className="space-x-4">
          <span>Estudiante: <strong>Bryan Fuertes</strong></span>
          <span>Empresa: <strong>Radio La Jefa</strong></span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Título de la Radio */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Radio La Jefa <span className="text-xs bg-amber-500 text-blue-950 font-bold px-2 py-0.5 rounded ml-2">98.5 FM</span>
          </h1>
          <p className="text-xs text-blue-200 mt-0.5">Sistema de Gestión de Programación y Mapa de Capacidades</p>
        </div>

        {/* Reproductor sencillo */}
        <div className="bg-blue-800 border border-blue-700 px-4 py-2 rounded-md flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-amber-500 hover:bg-amber-400 text-blue-950 p-1.5 rounded-full font-bold transition-colors"
            title={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <div className="text-xs">
            <span className="font-semibold block text-white">{isPlaying ? 'Transmitiendo en vivo' : 'Señal Radio La Jefa'}</span>
            <span className="text-blue-200 text-[11px]">Frecuencia 98.5 FM</span>
          </div>
        </div>
      </div>
    </header>
  );
}
