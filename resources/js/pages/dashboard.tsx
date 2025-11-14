import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { type BreadcrumbItem } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, Users, TrendingUp } from 'lucide-react';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type Stat = {
    label: string;
    value: string | number;
    change?: string;
    icon: React.ComponentType<{ className?: string }>;
    color: 'blue' | 'green' | 'purple' | 'orange';
};

// Helper function to safely format price
const formatPrice = (price: any): string => {
    try {
        const numPrice = typeof price === 'number' ? price : parseFloat(price || 0);
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    } catch {
        return '0.00';
    }
};

export default function Dashboard() {
    const [stats, setStats] = useState<Stat[]>([
        { label: 'Ventas Hoy', value: 0, icon: ShoppingCart, color: 'blue' },
        { label: 'Ingresos', value: '$0.00', icon: TrendingUp, color: 'green' },
        { label: 'Productos', value: 0, icon: Package, color: 'purple' },
        { label: 'Proveedores', value: 0, icon: Users, color: 'orange' },
    ]);
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch stats
        setIsLoading(true);
        Promise.all([
            fetch('/api/productos').then((r) => r.json()).catch(() => []),
            fetch('/api/proveedores').then((r) => r.json()).catch(() => []),
        ])
            .then(([productos, proveedores]) => {
                const newStats: Stat[] = [
                    {
                        label: 'Ventas Hoy',
                        value: 0,
                        icon: ShoppingCart,
                        color: 'blue',
                    },
                    {
                        label: 'Ingresos',
                        value: '$0.00',
                        icon: TrendingUp,
                        color: 'green',
                    },
                    {
                        label: 'Productos',
                        value: (productos || []).length,
                        icon: Package,
                        color: 'purple',
                    },
                    {
                        label: 'Proveedores',
                        value: (proveedores || []).length,
                        icon: Users,
                        color: 'orange',
                    },
                ];
                setStats(newStats);
                setTopProducts((productos || []).slice(0, 5));
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Error loading dashboard data:', err);
                setError('Error al cargar los datos');
                setIsLoading(false);
            });
    }, []);

    const colorMap: Record<string, string> = {
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        purple: 'bg-purple-100 text-purple-800',
        orange: 'bg-orange-100 text-orange-800',
    };

    const iconColorMap: Record<string, string> = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        purple: 'text-purple-600',
        orange: 'text-orange-600',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6 p-4 bg-background text-foreground min-h-screen">
                {/* Error message */}
                {error && (
                    <div className="rounded-lg bg-red-50 p-4 text-red-800 border border-red-200">
                        <p className="font-semibold">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                
                {/* Stat Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    {stats.map((stat, i) => (
                        <Card key={i} className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                                    {stat.change && (
                                        <p className="mt-1 text-xs text-green-600">{stat.change}</p>
                                    )}
                                </div>
                                <div className={`rounded-lg p-3 ${colorMap[stat.color]}`}>
                                    <stat.icon className={`h-6 w-6 ${iconColorMap[stat.color]}`} />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Top Products */}
                <Card className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Productos en Stock</h3>
                        <Badge variant="outline">Top 5</Badge>
                    </div>
                    <div className="space-y-3">
                        {topProducts.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Sin productos</p>
                        ) : (
                            topProducts.map((p: any, i: number) => (
                                <div key={p.id} className="flex items-center justify-between border-b py-2 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                            <span className="text-sm font-semibold text-gray-600">{i + 1}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">{p.nombre}</p>
                                            <p className="text-xs text-muted-foreground">SKU: {p.sku || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">${formatPrice(p.precio_venta)}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                    <h3 className="mb-4 text-lg font-semibold">Acciones Rápidas</h3>
                    <div className="grid gap-3 md:grid-cols-3">
                        <Button variant="outline" asChild>
                            <a href="/pos">→ Ir al POS</a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="/productos">→ Ver Productos</a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="/proveedores">→ Ver Proveedores</a>
                        </Button>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
