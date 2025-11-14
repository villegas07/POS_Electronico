import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function TestPage() {
    return (
        <AppLayout>
            <Head title="Test" />
            <div className="p-6">
                <h2 className="text-xl font-bold">✅ Página de Test Funcionando</h2>
                <p className="mt-4">Esta es una página de prueba simple.</p>
                <p className="mt-2">Si ves esto, significa que Inertia puede cargar componentes de la carpeta pages/</p>
            </div>
        </AppLayout>
    );
}
