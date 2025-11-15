import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BreadcrumbItem } from '@/types';

interface Usuario {
    id: number;
    name: string;
}

interface Movimiento {
    id: number;
    tipo: string;
    descripcion: string;
    monto: number;
    created_at: string;
}

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
    usuario?: Usuario;
    movimientos?: Movimiento[];
}

interface ShowPageProps {
    id: string;
}

const formatMoney = (value: number | string): string => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return numValue.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const getBreadcrumbs = (cajaId: string): BreadcrumbItem[] => [
    {
        title: 'Caja',
        href: '/caja',
    },
    {
        title: `Caja #${cajaId}`,
        href: `/caja/${cajaId}`,
    },
];

export default function CajaShowPage({ id }: ShowPageProps) {
    const [caja, setCaja] = useState<Caja>({
        id: 0,
        usuario_id: 0,
        monto_inicial: 0,
        total_ventas: 0,
        total_devoluciones: 0,
        fecha_apertura: '',
        estado: 'abierta',
        usuario: { id: 0, name: '' },
        movimientos: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaja = async () => {
            try {
                const response = await axios.get(`/api/cajas/${id}`);
                setCaja(response.data);
            } catch (error) {
                console.error('Error al cargar caja:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCaja();
    }, [id]);

    const montoTeórico = caja.monto_inicial + caja.total_ventas - caja.total_devoluciones;
    const breadcrumbs = getBreadcrumbs(id);

    if (loading) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={`Caja #${id}`} />
                <div className="p-6">Cargando...</div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Caja #${caja.id}`} />

            <div className="space-y-6 p-4 bg-background text-foreground min-h-screen">
                <h1 className="text-3xl font-bold text-gray-800">Resumen de Caja #{caja.id}</h1>

                {/* Información General */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            Información de la Caja
                        </h2>
                        <div className="space-y-2 text-sm">
                            <p>
                                <span className="font-semibold text-gray-700">Usuario:</span>{' '}
                                {caja.usuario?.name || 'N/A'}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">Apertura:</span>{' '}
                                {formatDate(caja.fecha_apertura)}
                            </p>
                            {caja.fecha_cierre && (
                                <p>
                                    <span className="font-semibold text-gray-700">Cierre:</span>{' '}
                                    {formatDate(caja.fecha_cierre)}
                                </p>
                            )}
                            <p>
                                <span className="font-semibold text-gray-700">Estado:</span>
                                <span
                                    className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                                        caja.estado === 'cerrada'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                    }`}
                                >
                                    {caja.estado}
                                </span>
                            </p>
                        </div>
                    </Card>

                    <Card className="p-4">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            Movimientos Financieros
                        </h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">Monto Inicial:</span>
                                <span>${formatMoney(caja.monto_inicial)}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span className="font-semibold text-gray-700">Total Ventas:</span>
                                <span>${formatMoney(caja.total_ventas)}</span>
                            </div>
                            <div className="flex justify-between text-red-600">
                                <span className="font-semibold text-gray-700">
                                    Total Devoluciones:
                                </span>
                                <span>${formatMoney(caja.total_devoluciones)}</span>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between">
                                <span className="font-semibold text-gray-700">Saldo Teórico:</span>
                                <span className="font-bold text-blue-600">
                                    ${formatMoney(montoTeórico)}
                                </span>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between">
                                <span className="font-semibold text-gray-700">Monto Final:</span>
                                <span className="font-bold">
                                    {caja.monto_final ? `$${formatMoney(caja.monto_final)}` : '-'}
                                </span>
                            </div>
                            {caja.diferencia !== undefined && (
                                <div
                                    className={`border-t pt-2 mt-2 flex justify-between font-bold ${
                                        caja.diferencia >= 0
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    <span className="text-gray-700">Diferencia:</span>
                                    <span>${formatMoney(caja.diferencia)}</span>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Movimientos */}
                <Card className="p-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Movimientos de Caja</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Fecha/Hora
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Tipo
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                        Descripción
                                    </th>
                                    <th className="px-4 py-2 text-right font-semibold text-gray-700">
                                        Monto
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {caja.movimientos && caja.movimientos.length > 0 ? (
                                    caja.movimientos.map((movimiento) => (
                                        <tr key={movimiento.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2">
                                                {formatDate(movimiento.created_at)}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`px-2 py-1 rounded text-xs font-semibold ${
                                                        [
                                                            'venta',
                                                            'ingreso',
                                                        ].includes(movimiento.tipo)
                                                            ? 'bg-green-100 text-green-800'
                                                            : ['devolucion', 'egreso'].includes(
                                                                  movimiento.tipo
                                                              )
                                                              ? 'bg-red-100 text-red-800'
                                                              : movimiento.tipo === 'ajuste'
                                                                ? 'bg-gray-100 text-gray-800'
                                                                : 'bg-blue-100 text-blue-800'
                                                    }`}
                                                >
                                                    {movimiento.tipo}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {movimiento.descripcion}
                                            </td>
                                            <td
                                                className={`px-4 py-2 text-right font-semibold ${
                                                    [
                                                        'venta',
                                                        'ingreso',
                                                        'apertura',
                                                    ].includes(movimiento.tipo)
                                                        ? 'text-green-600'
                                                        : ['devolucion', 'egreso'].includes(
                                                              movimiento.tipo
                                                          )
                                                          ? 'text-red-600'
                                                          : ''
                                                }`}
                                            >
                                                ${formatMoney(movimiento.monto)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                                            No hay movimientos registrados
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Observaciones */}
                {caja.observaciones && (
                    <Card className="p-4 bg-yellow-50 border-yellow-200">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">Observaciones</h2>
                        <p className="text-gray-700">{caja.observaciones}</p>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
