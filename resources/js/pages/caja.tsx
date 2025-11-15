import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Plus, RotateCcw } from 'lucide-react';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Caja',
        href: '/caja',
    },
];

interface Caja {
    id: number;
    usuario_id: number;
    monto_inicial: number;
    monto_final?: number;
    total_ventas: number;
    total_devoluciones: number;
    diferencia?: number;
    fecha_apertura: string;
    fecha_cierre?: string;
    estado: 'abierta' | 'cerrada' | 'suspendida';
    observaciones?: string;
    usuario?: {
        id: number;
        name: string;
    };
}

interface CajaResponse {
    data: Caja[];
}

export default function CajaPage() {
    const [cajaActiva, setCajaActiva] = useState<Caja | null>(null);
    const [cajas, setCajas] = useState<Caja[]>([]);
    const [loading, setLoading] = useState(false);
    const [showCerrarModal, setShowCerrarModal] = useState(false);
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    const [formApertura, setFormApertura] = useState({
        monto_inicial: '',
        observaciones: '',
    });

    const [formCierre, setFormCierre] = useState({
        monto_final: '',
        observaciones: '',
    });

    const formatMoney = (value: number | string): string => {
        try {
            const numValue = typeof value === 'string' ? parseFloat(value) : value;
            if (isNaN(numValue)) return '0.00';
            return numValue.toLocaleString('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        } catch (e) {
            return '0.00';
        }
    };

    const formatDate = (dateString: string): string => {
        try {
            return new Date(dateString).toLocaleString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return dateString;
        }
    };

    const fetchCajaActiva = async () => {
        try {
            const response = await fetch('/api/cajas/activa', {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setCajaActiva(data);
            }
        } catch (error) {
            console.error('Error al obtener caja activa:', error);
        }
    };

    const fetchCajas = async () => {
        try {
            const response = await fetch('/api/cajas', {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setCajas(data.data || []);
            }
        } catch (error) {
            console.error('Error al obtener cajas:', error);
        }
    };

    const fetchResumenCaja = async () => {
        if (cajaActiva) {
            try {
                const response = await fetch(`/api/cajas/${cajaActiva.id}/resumen`, {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setCajaActiva(data.caja);
                }
            } catch (error) {
                console.error('Error al obtener resumen:', error);
            }
        }
    };

    const abrirCaja = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/cajas/abrir', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                    monto_inicial: parseFloat(formApertura.monto_inicial),
                    observaciones: formApertura.observaciones,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setCajaActiva(data);
                setFormApertura({ monto_inicial: '', observaciones: '' });
                showNotification('Caja abierta correctamente', 'success');
                await fetchCajas();
            } else {
                const error = await response.json();
                showNotification(error.message || 'Error al abrir caja', 'error');
            }
        } catch (error: any) {
            showNotification(
                error.message || 'Error al abrir caja',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    const cerrarCaja = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cajaActiva) return;
        
        setLoading(true);

        try {
            const response = await fetch(`/api/cajas/${cajaActiva.id}/cerrar`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                    monto_final: parseFloat(formCierre.monto_final),
                    observaciones: formCierre.observaciones,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setCajaActiva(data);
                setShowCerrarModal(false);
                setFormCierre({ monto_final: '', observaciones: '' });
                showNotification('Caja cerrada correctamente', 'success');
                await fetchCajas();
            } else {
                const error = await response.json();
                showNotification(error.message || 'Error al cerrar caja', 'error');
            }
        } catch (error: any) {
            showNotification(
                error.message || 'Error al cerrar caja',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    useEffect(() => {
        console.log('CajaPage mounted, fetching data...');
        fetchCajaActiva();
        fetchCajas();
    }, []);

    const montoTeórico = cajaActiva
        ? cajaActiva.monto_inicial + cajaActiva.total_ventas - cajaActiva.total_devoluciones
        : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Caja" />

            <div className="space-y-6 p-4 bg-background text-foreground min-h-screen">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
                    <h1 className="text-3xl font-bold">Gestión de Caja</h1>
                    <p className="text-blue-100 mt-2">Control de apertura y cierre de caja diaria</p>
                </div>

                {/* Alerta cuando no hay caja abierta */}
                {!cajaActiva && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <p className="text-yellow-800 font-semibold">
                            No hay caja abierta en este momento
                        </p>
                        <p className="text-yellow-700 text-sm mt-2">
                            Abre una caja para comenzar las operaciones del día
                        </p>
                    </div>
                )}

                {/* Estadísticas cuando hay caja abierta */}
                {cajaActiva && (
                    <div className="space-y-6">
                        {/* Estadísticas */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="border-l-4 border-l-green-500 p-4">
                                <p className="text-gray-600 text-sm font-semibold">
                                    MONTO INICIAL
                                </p>
                                <p className="text-2xl font-bold text-green-600 mt-1">
                                    ${formatMoney(cajaActiva.monto_inicial)}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {formatDate(cajaActiva.fecha_apertura)}
                                </p>
                            </Card>

                            <Card className="border-l-4 border-l-blue-500 p-4">
                                <p className="text-gray-600 text-sm font-semibold">
                                    TOTAL VENTAS
                                </p>
                                <p className="text-2xl font-bold text-blue-600 mt-1">
                                    ${formatMoney(cajaActiva.total_ventas)}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">Del día actual</p>
                            </Card>

                            <Card className="border-l-4 border-l-orange-500 p-4">
                                <p className="text-gray-600 text-sm font-semibold">
                                    SALDO TEÓRICO
                                </p>
                                <p className="text-2xl font-bold text-orange-600 mt-1">
                                    ${formatMoney(montoTeórico)}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">Esperado en caja</p>
                            </Card>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex gap-4">
                            <Button
                                onClick={() => setShowCerrarModal(true)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Cerrar Caja
                            </Button>
                            <Button
                                onClick={fetchCajaActiva}
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Actualizar
                            </Button>
                        </div>
                    </div>
                )}

                {/* Formulario Abrir Caja - Siempre Visible */}
                <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">
                        Abrir Nueva Caja
                    </h2>
                    <form onSubmit={abrirCaja} className="space-y-4">
                        <div>
                            <Label htmlFor="monto_inicial" className="font-semibold">
                                Monto Inicial
                            </Label>
                            <Input
                                id="monto_inicial"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formApertura.monto_inicial === '' ? '' : formApertura.monto_inicial}
                                onChange={(e) =>
                                    setFormApertura({
                                        ...formApertura,
                                        monto_inicial: e.target.value,
                                    })
                                }
                                placeholder="0.00"
                                required
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="observaciones" className="font-semibold">
                                Observaciones
                            </Label>
                            <textarea
                                id="observaciones"
                                value={formApertura.observaciones}
                                onChange={(e) =>
                                    setFormApertura({
                                        ...formApertura,
                                        observaciones: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                                rows={3}
                                placeholder="Notas adicionales..."
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 text-white w-full"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            {loading ? 'Abriendo...' : 'Abrir Caja'}
                        </Button>
                    </form>
                </Card>

                {/* Histórico de Cajas */}
                <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Histórico de Cajas</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Fecha Apertura
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Monto Inicial
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Total Ventas
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Monto Final
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Diferencia
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {cajas.length > 0 ? (
                                    cajas.map((caja) => (
                                        <tr key={caja.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2">
                                                {formatDate(caja.fecha_apertura)}
                                            </td>
                                            <td className="px-4 py-2">
                                                ${formatMoney(caja.monto_inicial)}
                                            </td>
                                            <td className="px-4 py-2">
                                                ${formatMoney(caja.total_ventas)}
                                            </td>
                                            <td className="px-4 py-2">
                                                {caja.monto_final
                                                    ? `$${formatMoney(caja.monto_final)}`
                                                    : '-'}
                                            </td>
                                            <td
                                                className={`px-4 py-2 font-semibold ${
                                                    caja.diferencia !== undefined && caja.diferencia >= 0
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                }`}
                                            >
                                                {caja.diferencia !== undefined
                                                    ? `$${formatMoney(caja.diferencia)}`
                                                    : '-'}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`px-2 py-1 rounded text-xs font-semibold ${
                                                        caja.estado === 'cerrada'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-blue-100 text-blue-800'
                                                    }`}
                                                >
                                                    {caja.estado}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                                            No hay cajas registradas
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Modal Cerrar Caja */}
            {showCerrarModal && cajaActiva && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="max-w-md w-full mx-4 p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Cerrar Caja</h2>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Saldo Teórico:</span>
                                <br />
                                ${formatMoney(montoTeórico)}
                            </p>
                        </div>

                        <form onSubmit={cerrarCaja} className="space-y-4">
                            <div>
                                <Label htmlFor="monto_final" className="font-semibold">
                                    Monto Final en Caja
                                </Label>
                                <Input
                                    id="monto_final"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formCierre.monto_final === '' ? '' : formCierre.monto_final}
                                    onChange={(e) =>
                                        setFormCierre({
                                            ...formCierre,
                                            monto_final: e.target.value,
                                        })
                                    }
                                    placeholder="0.00"
                                    required
                                    className="mt-1"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <Label htmlFor="obs_cierre" className="font-semibold">
                                    Observaciones
                                </Label>
                                <textarea
                                    id="obs_cierre"
                                    value={formCierre.observaciones}
                                    onChange={(e) =>
                                        setFormCierre({
                                            ...formCierre,
                                            observaciones: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mt-1"
                                    rows={2}
                                    placeholder="Notas..."
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    onClick={() => setShowCerrarModal(false)}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                >
                                    {loading ? 'Cerrando...' : 'Cerrar Caja'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}

            {/* Notificación */}
            {notification && (
                <div
                    className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-md border-l-4 ${
                        notification.type === 'success'
                            ? 'bg-green-50 border-l-green-500 text-green-700'
                            : 'bg-red-50 border-l-red-500 text-red-700'
                    }`}
                >
                    {notification.message}
                </div>
            )}
        </AppLayout>
    );
}
