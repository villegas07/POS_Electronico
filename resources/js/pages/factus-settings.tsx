import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    AlertCircle,
    CheckCircle,
    RefreshCw,
    Lock,
    Clock,
} from 'lucide-react';

interface TokenStatus {
    is_expired: boolean;
    is_about_to_expire: boolean;
    expires_at: string;
    created_at: string;
    refreshed_at: string | null;
}

interface TokenResponse {
    status: string;
    message: string;
    data: TokenStatus | null;
}

export default function FactusSettings() {
    const [loading, setLoading] = useState(false);
    const [authenticating, setAuthenticating] = useState(false);
    const [tokenStatus, setTokenStatus] = useState<TokenStatus | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        loadTokenStatus();
    }, []);

    const loadTokenStatus = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/factus/auth/status');
            const data: TokenResponse = await response.json();

            if (data.status === 'success' && data.data) {
                setTokenStatus(data.data);
                setErrorMessage('');
            } else {
                setTokenStatus(null);
                setErrorMessage(data.message || 'No hay token disponible');
            }
        } catch (error) {
            console.error('Error loading token status:', error);
            setTokenStatus(null);
            setErrorMessage('Error al cargar el estado del token');
        } finally {
            setLoading(false);
        }
    };

    const handleAuthenticate = async () => {
        setAuthenticating(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('/api/factus/auth/authenticate', {
                method: 'POST',
            });
            const data = await response.json();

            if (data.status === 'success') {
                setSuccessMessage('Autenticación exitosa con Factus');
                await loadTokenStatus();
            } else {
                setErrorMessage(
                    data.message ||
                        'Error al autenticar. Verifique las credenciales.'
                );
            }
        } catch (error) {
            console.error('Error authenticating:', error);
            setErrorMessage('Error al conectar con Factus');
        } finally {
            setAuthenticating(false);
        }
    };

    const handleRefreshToken = async () => {
        setAuthenticating(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('/api/factus/auth/refresh', {
                method: 'POST',
            });
            const data = await response.json();

            if (data.status === 'success') {
                setSuccessMessage('Token refrescado exitosamente');
                await loadTokenStatus();
            } else {
                setErrorMessage(data.message || 'Error al refrescar el token');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            setErrorMessage('Error al refrescar el token');
        } finally {
            setAuthenticating(false);
        }
    };

    return (
        <AppLayout>
            <Head title="Configuración de Factus" />
            <div className="space-y-6 p-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Configuración de Factus
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Gestiona la autenticación y las credenciales de acceso a la API de
                        Factus
                    </p>
                </div>

                {/* Error Alert */}
                {errorMessage && (
                    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-red-900 dark:text-red-200">
                                Error
                            </p>
                            <p className="text-sm text-red-800 dark:text-red-300">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                )}

                {/* Success Alert */}
                {successMessage && (
                    <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-green-900 dark:text-green-200">
                                Éxito
                            </p>
                            <p className="text-sm text-green-800 dark:text-green-300">
                                {successMessage}
                            </p>
                        </div>
                    </div>
                )}

                {/* Token Status Card */}
                <Card className="dark:border-neutral-700 dark:bg-neutral-900">
                    <CardHeader>
                        <CardTitle className="dark:text-white">
                            Estado del Token
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {tokenStatus ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            Estado
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            {tokenStatus.is_expired ? (
                                                <>
                                                    <Badge className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200">
                                                        Expirado
                                                    </Badge>
                                                </>
                                            ) : tokenStatus.is_about_to_expire ? (
                                                <>
                                                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
                                                        Por expirar
                                                    </Badge>
                                                </>
                                            ) : (
                                                <>
                                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                                                        Activo
                                                    </Badge>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            Expira en
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            <p className="text-sm dark:text-gray-300">
                                                {new Date(
                                                    tokenStatus.expires_at
                                                ).toLocaleString('es-CO')}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            Creado
                                        </p>
                                        <p className="mt-2 text-sm dark:text-gray-300">
                                            {new Date(
                                                tokenStatus.created_at
                                            ).toLocaleString('es-CO')}
                                        </p>
                                    </div>
                                </div>

                                {tokenStatus.refreshed_at && (
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            Último refresco
                                        </p>
                                        <p className="mt-2 text-sm dark:text-gray-300">
                                            {new Date(
                                                tokenStatus.refreshed_at
                                            ).toLocaleString('es-CO')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 dark:text-gray-400">
                                    No hay token disponible
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                                    Debe autenticarse para acceder a la API de Factus
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Actions Card */}
                <Card className="dark:border-neutral-700 dark:bg-neutral-900">
                    <CardHeader>
                        <CardTitle className="dark:text-white">
                            Acciones
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                Para utilizar la integración con Factus, primero debe
                                autenticarse. Las credenciales se obtienen del administrador
                                de la API.
                            </p>
                            <Button
                                onClick={handleAuthenticate}
                                disabled={authenticating}
                                className="w-full gap-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                {authenticating ? (
                                    <>
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                        Autenticando...
                                    </>
                                ) : (
                                    'Autenticar con Factus'
                                )}
                            </Button>
                        </div>

                        {tokenStatus && !tokenStatus.is_expired && (
                            <div>
                                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                    Si el token está por expirar o desea refrescarlo
                                    manualmente, use el botón de abajo.
                                </p>
                                <Button
                                    onClick={handleRefreshToken}
                                    disabled={authenticating}
                                    variant="outline"
                                    className="w-full gap-2 dark:border-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-800"
                                >
                                    {authenticating ? (
                                        <>
                                            <RefreshCw className="h-4 w-4 animate-spin" />
                                            Refrescando...
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw className="h-4 w-4" />
                                            Refrescar Token
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}

                        <Button
                            onClick={loadTokenStatus}
                            disabled={loading}
                            variant="outline"
                            className="w-full gap-2 dark:border-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-800"
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                    Cargando...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="h-4 w-4" />
                                    Recargar Estado
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Information Card */}
                <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
                    <CardHeader>
                        <CardTitle className="text-blue-900 dark:text-blue-200">
                            Información
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                        <p>
                            • El token de acceso expira cada <strong>1 hora</strong> después
                            de la autenticación
                        </p>
                        <p>
                            • El sistema refrescará automáticamente el token cuando sea
                            necesario
                        </p>
                        <p>
                            • Si el token expira, el sistema intentará refrescarlo
                            automáticamente
                        </p>
                        <p>
                            • Las credenciales de acceso deben ser solicitadas al
                            administrador de la API
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
