import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/productos',
    },
];

export default function ProductosPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="p-6">
                <h1 className="text-3xl font-bold">Productos</h1>
                <p className="mt-4 text-muted-foreground">Gestiona tu catálogo de productos</p>
                
                <div className="mt-6 rounded-lg border p-6">
                    <h2 className="text-xl font-semibold">Lista de Productos</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Carga correcta del layout
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
