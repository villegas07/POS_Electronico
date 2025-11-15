import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, RefreshCw, Eye, AlertCircle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface Invoice {
    id: number;
    document: {
        code: string;
        name: string;
    };
    number: string;
    reference_code: string | null;
    identification: string;
    graphic_representation_name: string;
    email: string;
    total: string;
    status: number;
    errors: string[];
    send_email: number;
    payment_form: {
        code: string;
        name: string;
    };
    created_at: string;
}

interface ApiResponse {
    status: string;
    message: string;
    data: {
        data: Invoice[];
        pagination: {
            total: number;
            per_page: number;
            current_page: number;
            last_page: number;
        };
    };
}

export default function Facturas() {
    const [facturas, setFacturas] = useState<Invoice[]>([]);
    const [filteredFacturas, setFilteredFacturas] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState('');
    const [selectedFactura, setSelectedFactura] = useState<Invoice | null>(null);

    useEffect(() => {
        loadFacturas();
    }, []);

    const loadFacturas = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/facturas');
            const data: ApiResponse = await response.json();

            if (data.status === 'OK' && data.data?.data) {
                setFacturas(data.data.data);
                setFilteredFacturas(data.data.data);
            } else {
                setFacturas([]);
                setFilteredFacturas([]);
            }
        } catch (error) {
            console.error('Error loading facturas:', error);
            setFacturas([]);
            setFilteredFacturas([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value: string) => {
        setSearching(value);
        const filtered = facturas.filter(
            (factura) =>
                factura.number.toLowerCase().includes(value.toLowerCase()) ||
                factura.graphic_representation_name
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                factura.identification.toLowerCase().includes(value.toLowerCase()) ||
                factura.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredFacturas(filtered);
    };

    const formatPrice = (price: string | number): string => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 2,
        }).format(numPrice);
    };

    const getStatusBadge = (status: number) => {
        switch (status) {
            case 1:
                return <Badge className="bg-green-100 text-green-800">Validada</Badge>;
            case 0:
                return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
            default:
                return <Badge className="bg-gray-100 text-gray-800">Desconocido</Badge>;
        }
    };

    return (
        <AppLayout>
            <Head title="Facturas Electrónicas" />
            <div className="space-y-6 p-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Facturas Electrónicas
                    </h1>
                    <Button
                        onClick={loadFacturas}
                        disabled={loading}
                        variant="outline"
                        className="gap-2"
                    >
                        <RefreshCw
                            className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
                        />
                        Actualizar
                    </Button>
                </div>

                <Card className="dark:border-neutral-700 dark:bg-neutral-900">
                    <CardHeader className="border-b dark:border-neutral-700">
                        <CardTitle className="dark:text-white">
                            Búsqueda y filtros
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Buscar por número, cliente, identificación o correo..."
                                    className="pl-10 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    value={searching}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            Se encontraron <span className="font-semibold">{filteredFacturas.length}</span> factura(s)
                        </div>
                    </CardContent>
                </Card>

                <Card className="dark:border-neutral-700 dark:bg-neutral-900">
                    <CardContent className="pt-6">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 mx-auto mb-4"></div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Cargando facturas...
                                    </p>
                                </div>
                            </div>
                        ) : filteredFacturas.length === 0 ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600 dark:text-gray-400">
                                        No se encontraron facturas
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b dark:border-neutral-700 hover:bg-transparent dark:hover:bg-transparent">
                                            <TableHead className="dark:text-gray-300">
                                                Número
                                            </TableHead>
                                            <TableHead className="dark:text-gray-300">
                                                Cliente
                                            </TableHead>
                                            <TableHead className="dark:text-gray-300">
                                                Identificación
                                            </TableHead>
                                            <TableHead className="dark:text-gray-300">
                                                Correo
                                            </TableHead>
                                            <TableHead className="dark:text-gray-300">
                                                Total
                                            </TableHead>
                                            <TableHead className="dark:text-gray-300">
                                                Estado
                                            </TableHead>
                                            <TableHead className="dark:text-gray-300">
                                                Fecha
                                            </TableHead>
                                            <TableHead className="dark:text-gray-300">
                                                Acciones
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredFacturas.map((factura) => (
                                            <TableRow
                                                key={factura.id}
                                                className="border-b dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
                                            >
                                                <TableCell className="font-mono text-sm dark:text-gray-300">
                                                    {factura.number}
                                                </TableCell>
                                                <TableCell className="dark:text-gray-300">
                                                    {factura.graphic_representation_name}
                                                </TableCell>
                                                <TableCell className="text-sm dark:text-gray-300">
                                                    {factura.identification}
                                                </TableCell>
                                                <TableCell className="text-sm dark:text-gray-300">
                                                    {factura.email || '-'}
                                                </TableCell>
                                                <TableCell className="font-semibold dark:text-gray-300">
                                                    {formatPrice(factura.total)}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(factura.status)}
                                                </TableCell>
                                                <TableCell className="text-sm dark:text-gray-300">
                                                    {new Date(
                                                        factura.created_at
                                                    ).toLocaleDateString('es-CO')}
                                                </TableCell>
                                                <TableCell>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    setSelectedFactura(
                                                                        factura
                                                                    )
                                                                }
                                                                className="gap-2 dark:text-blue-400 dark:hover:bg-neutral-700"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                Ver
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-3xl dark:border-neutral-700 dark:bg-neutral-900">
                                                            <DialogHeader>
                                                                <DialogTitle className="dark:text-white">
                                                                    Detalles de la factura{' '}
                                                                    {selectedFactura?.number}
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            {selectedFactura && (
                                                                <div className="h-auto max-h-96 overflow-y-auto rounded-md border dark:border-neutral-700 p-4">
                                                                    <div className="space-y-4">
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                            <div>
                                                                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                                                    Número
                                                                                </p>
                                                                                <p className="font-mono dark:text-white">
                                                                                    {
                                                                                        selectedFactura.number
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                                                    Referencia
                                                                                </p>
                                                                                <p className="font-mono dark:text-white">
                                                                                    {selectedFactura.reference_code ||
                                                                                        '-'}
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                                                    Cliente
                                                                                </p>
                                                                                <p className="dark:text-white">
                                                                                    {
                                                                                        selectedFactura.graphic_representation_name
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                                                    Identificación
                                                                                </p>
                                                                                <p className="dark:text-white">
                                                                                    {
                                                                                        selectedFactura.identification
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                                                    Correo
                                                                                </p>
                                                                                <p className="dark:text-white">
                                                                                    {selectedFactura.email ||
                                                                                        '-'}
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                                                    Total
                                                                                </p>
                                                                                <p className="font-semibold text-lg dark:text-white">
                                                                                    {formatPrice(
                                                                                        selectedFactura.total
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                                                    Estado
                                                                                </p>
                                                                                <div>
                                                                                    {getStatusBadge(
                                                                                        selectedFactura.status
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                                                    Fecha de creación
                                                                                </p>
                                                                                <p className="dark:text-white">
                                                                                    {new Date(
                                                                                        selectedFactura.created_at
                                                                                    ).toLocaleString(
                                                                                        'es-CO'
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                                                    Formulario de pago
                                                                                </p>
                                                                                <p className="dark:text-white">
                                                                                    {
                                                                                        selectedFactura
                                                                                            .payment_form
                                                                                            .name
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                                                    Email enviado
                                                                                </p>
                                                                                <p className="dark:text-white">
                                                                                    {selectedFactura.send_email ===
                                                                                    1
                                                                                        ? 'Sí'
                                                                                        : 'No'}
                                                                                </p>
                                                                            </div>
                                                                        </div>

                                                                        {selectedFactura.errors &&
                                                                            selectedFactura
                                                                                .errors
                                                                                .length >
                                                                                0 && (
                                                                                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                                                                                    <p className="text-sm font-semibold text-red-900 dark:text-red-200 mb-2">
                                                                                        Errores:
                                                                                    </p>
                                                                                    <ul className="list-inside space-y-1">
                                                                                        {selectedFactura.errors.map(
                                                                                            (
                                                                                                error,
                                                                                                idx
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        idx
                                                                                                    }
                                                                                                    className="text-sm text-red-800 dark:text-red-300"
                                                                                                >
                                                                                                    •{' '}
                                                                                                    {
                                                                                                        error
                                                                                                    }
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ul>
                                                                                </div>
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
