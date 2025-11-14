import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'POS Test',
        href: '/pos',
    },
];

export default function PosTestPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="POS Test" />
            <div className="p-6">
                <h1 className="text-3xl font-bold">POS - Punto de Venta</h1>
                <p className="mt-4 text-muted-foreground">Esta es la página POS simplificada para test</p>
                <div className="mt-6 p-4 bg-blue-100 rounded">
                    <p>Si ves esto, el layout está funcionando correctamente</p>
                </div>
            </div>
        </AppLayout>
    );
}
