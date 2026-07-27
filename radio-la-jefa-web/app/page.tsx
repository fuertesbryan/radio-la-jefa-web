'use client';

import React from 'react';
import { RadioHeader } from '@/components/RadioHeader';
import { CapabilityMap } from '@/components/CapabilityMap';
import { ProgramaCrud } from '@/components/ProgramaCrud';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col font-sans">
      <RadioHeader />

      <main className="max-w-6xl mx-auto px-6 py-6 space-y-6 flex-1 w-full">
        {/* Banner Informativo Académico */}
        <div className="bg-white border border-gray-300 p-5 rounded-md shadow-sm">
          <h2 className="text-base font-bold text-gray-800">
            Aplicación Web de Gestión Operativa — Radio La Jefa
          </h2>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Proyecto desarrollado para el componente <strong>Prácticum 3 (APEB2)</strong> por el estudiante <strong>Bryan Fuertes</strong>. Esta aplicación web refleja el Mapa de Capacidades de la empresa <strong>Radio La Jefa</strong>, conectando el frontend desarrollado en Next.js (React) con el backend en Java (Spring Boot API REST).
          </p>
        </div>

        {/* Sección 1: Mapa de Capacidades */}
        <CapabilityMap />

        {/* Sección 2: Módulo CRUD Operativo */}
        <ProgramaCrud />
      </main>

      <footer className="bg-white border-t border-gray-300 py-4 text-center text-xs text-gray-600">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Universidad Técnica Particular de Loja (UTPL)</span>
          <span>Desarrollado por Bryan Fuertes — Prácticum 3</span>
        </div>
      </footer>
    </div>
  );
}
