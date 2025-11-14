import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'POS',
        href: '/pos',
    },
];

export default function PosPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="POS" />
            <div className="p-6">
                <h1 className="text-3xl font-bold">POS - Punto de Venta</h1>
                <p className="mt-4 text-muted-foreground">Sistema de punto de venta</p>
                
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-6">
                        <h2 className="text-xl font-semibold">Productos</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Carga correcta del layout
                        </p>
                    </div>
                    
                    <div className="rounded-lg border p-6">
                        <h2 className="text-xl font-semibold">Carrito</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Vacío
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
