'use client';

import React, { useState, useEffect } from 'react';
import { 
  fetchProgramas, 
  createPrograma, 
  updatePrograma, 
  deletePrograma, 
  Programa 
} from '../lib/api';

export function ProgramaCrud() {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODAS');

  // Estados de paginación (5, 10, 20 por página)
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Programa, 'id'>>({
    titulo: '',
    locutor: '',
    horario: '08:00 - 10:00 AM',
    categoria: 'Música Variada',
    estado: 'PROGRAMADO',
    audienciaEstimada: 10000,
    descripcion: ''
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadData = async () => {
    setLoading(true);
    const { data, isMock: mockStatus } = await fetchProgramas();
    setProgramas(data);
    setIsMock(mockStatus);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Reiniciar a la primera página cuando cambie la búsqueda, categoría o tamaño de página
  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter, selectedCategory, pageSize]);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      titulo: '',
      locutor: '',
      horario: '08:00 - 10:00 AM',
      categoria: 'Música Variada',
      estado: 'PROGRAMADO',
      audienciaEstimada: 10000,
      descripcion: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prog: Programa) => {
    if (!prog.id) return;
    setEditingId(prog.id);
    setFormData({
      titulo: prog.titulo,
      locutor: prog.locutor,
      horario: prog.horario,
      categoria: prog.categoria,
      estado: prog.estado,
      audienciaEstimada: prog.audienciaEstimada,
      descripcion: prog.descripcion
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (editingId) {
        if (!isMock) {
          await updatePrograma(editingId, formData);
        }
        setProgramas(prev => prev.map(p => p.id === editingId ? { ...p, ...formData } : p));
        setMessage({ type: 'success', text: 'Programa actualizado correctamente.' });
      } else {
        if (!isMock) {
          const nuevo = await createPrograma(formData);
          setProgramas(prev => [...prev, nuevo]);
        } else {
          const nuevoMock: Programa = { ...formData, id: Date.now() };
          setProgramas(prev => [...prev, nuevoMock]);
        }
        setMessage({ type: 'success', text: 'Programa guardado en la base de datos.' });
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error al conectar con la API en Spring Boot.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este programa?')) return;
    try {
      if (!isMock) {
        await deletePrograma(id);
      }
      setProgramas(prev => prev.filter(p => p.id !== id));
      setMessage({ type: 'success', text: 'Programa eliminado correctamente.' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'No se pudo eliminar el registro.' });
    }
  };

  const filteredProgramas = programas.filter(prog => {
    const matchesSearch = prog.titulo.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          prog.locutor.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory = selectedCategory === 'TODAS' || prog.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Cálculo de paginación
  const totalPages = Math.ceil(filteredProgramas.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProgramas = filteredProgramas.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-white border border-gray-300 rounded-md p-6 shadow-sm space-y-4">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Administración de Programas Radiales (CRUD)
          </h2>
          <p className="text-xs text-gray-600">
            Módulo conectado al Backend en Java Spring Boot (Puerto 8080).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded border border-gray-300"
          >
            Actualizar
          </button>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3 py-1.5 rounded"
          >
            + Agregar Programa
          </button>
        </div>
      </div>

      {/* Alertas */}
      {isMock && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded">
          <strong>Aviso:</strong> El servidor Java Spring Boot no está corriendo en localhost:8080. Se muestran datos de prueba.
        </div>
      )}

      {message && (
        <div className={`p-3 rounded text-xs border ${
          message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Controles de Búsqueda y Selección de Paginación */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-1 gap-2 w-full">
          <input
            type="text"
            placeholder="Buscar programa o locutor..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="flex-1 bg-white border border-gray-300 text-gray-800 text-xs px-3 py-1.5 rounded focus:outline-none focus:border-blue-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-gray-300 text-gray-800 text-xs px-3 py-1.5 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="TODAS">Todas las Categorías</option>
            <option value="Entretenimiento y Noticias">Entretenimiento y Noticias</option>
            <option value="Música Popular">Música Popular</option>
            <option value="Deportes">Deportes</option>
            <option value="Música Variada">Música Variada</option>
            <option value="Romántico y Baladas">Romántico y Baladas</option>
          </select>
        </div>

        {/* Selector de tamaño de página (5, 10, 20) */}
        <div className="flex items-center gap-2 text-xs text-gray-700 w-full sm:w-auto justify-end">
          <span>Mostrar:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-white border border-gray-300 text-gray-800 text-xs px-2 py-1 rounded focus:outline-none focus:border-blue-500 font-semibold"
          >
            <option value={5}>5 por pág.</option>
            <option value={10}>10 por pág.</option>
            <option value={20}>20 por pág.</option>
          </select>
        </div>
      </div>

      {/* Tabla estándar HTML */}
      {loading ? (
        <div className="py-8 text-center text-xs text-gray-500">Cargando datos...</div>
      ) : filteredProgramas.length === 0 ? (
        <div className="py-8 text-center text-xs text-gray-500">No se encontraron registros en el sistema.</div>
      ) : (
        <div className="space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300 text-gray-700 font-semibold">
                  <th className="p-2.5 border-r border-gray-300">ID</th>
                  <th className="p-2.5 border-r border-gray-300">Título</th>
                  <th className="p-2.5 border-r border-gray-300">Locutor</th>
                  <th className="p-2.5 border-r border-gray-300">Horario</th>
                  <th className="p-2.5 border-r border-gray-300">Categoría</th>
                  <th className="p-2.5 border-r border-gray-300">Estado</th>
                  <th className="p-2.5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProgramas.map((prog) => (
                  <tr key={prog.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-2.5 border-r border-gray-200 text-gray-500">{prog.id}</td>
                    <td className="p-2.5 border-r border-gray-200 font-semibold text-gray-900">
                      {prog.titulo}
                      <div className="text-[11px] font-normal text-gray-500">{prog.descripcion}</div>
                    </td>
                    <td className="p-2.5 border-r border-gray-200">{prog.locutor}</td>
                    <td className="p-2.5 border-r border-gray-200">{prog.horario}</td>
                    <td className="p-2.5 border-r border-gray-200">{prog.categoria}</td>
                    <td className="p-2.5 border-r border-gray-200">
                      <span className={`px-2 py-0.5 text-[10px] rounded font-medium ${
                        prog.estado === 'EN VIVO' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {prog.estado}
                      </span>
                    </td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => openEditModal(prog)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => prog.id && handleDelete(prog.id)}
                        className="text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Barra de Controles de Paginación */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 text-xs text-gray-600">
            <div>
              Mostrando {startIndex + 1} a {Math.min(startIndex + pageSize, filteredProgramas.length)} de {filteredProgramas.length} registros
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              <span className="px-3 py-1 font-semibold text-gray-800">
                Página {currentPage} de {totalPages}
              </span>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Formulario */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-gray-400 rounded-md w-full max-w-md p-5 shadow-lg space-y-3">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <h3 className="text-sm font-bold text-gray-800">
                {editingId ? 'Editar Programa' : 'Nuevo Programa'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 font-bold">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Título del Programa</label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2.5 py-1 text-gray-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Locutor</label>
                  <input
                    type="text"
                    required
                    value={formData.locutor}
                    onChange={(e) => setFormData({ ...formData, locutor: e.target.value })}
                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-gray-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Horario</label>
                  <input
                    type="text"
                    required
                    value={formData.horario}
                    onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-gray-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Categoría</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-gray-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Entretenimiento y Noticias">Entretenimiento y Noticias</option>
                    <option value="Música Popular">Música Popular</option>
                    <option value="Deportes">Deportes</option>
                    <option value="Música Variada">Música Variada</option>
                    <option value="Romántico y Baladas">Romántico y Baladas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Estado</label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-gray-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="PROGRAMADO">PROGRAMADO</option>
                    <option value="EN VIVO">EN VIVO</option>
                    <option value="GRABADO">GRABADO</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Audiencia Estimada</label>
                <input
                  type="number"
                  required
                  value={formData.audienciaEstimada}
                  onChange={(e) => setFormData({ ...formData, audienciaEstimada: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded px-2.5 py-1 text-gray-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Descripción</label>
                <textarea
                  rows={2}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2.5 py-1 text-gray-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded"
                >
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
