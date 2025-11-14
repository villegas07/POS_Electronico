import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Plus } from 'lucide-react';
import { showSuccess, showError, showConnectionError } from '@/utils/alerts';

interface StockAddCardProps {
    productoId: number;
    productoNombre: string;
    currentStock?: number;
    precioCompra: number;
    precioVenta: number;
    onStockAdded?: () => void;
    onClose?: () => void;
}

export default function StockAddCard({
    productoId,
    productoNombre,
    currentStock = 0,
    precioCompra,
    precioVenta,
    onStockAdded,
    onClose,
}: StockAddCardProps) {
    const [cantidad, setCantidad] = useState<number>(0);
    const [motivo, setMotivo] = useState('Compra inicial');
    const [isLoading, setIsLoading] = useState(false);

    // Calcular margen de ganancia
    const margenGanancia = precioVenta > 0 && precioCompra > 0
        ? (((precioVenta - precioCompra) / precioCompra) * 100).toFixed(2)
        : '0';

    const handleAddStock = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cantidad <= 0) {
            showError('Error', 'La cantidad debe ser mayor a 0');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/stock/movimientos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    producto_id: productoId,
                    tipo: 'in',
                    cantidad: parseInt(cantidad.toString()),
                    motivo: motivo || 'Entrada de stock',
                }),
            });

            if (response.ok) {
                showSuccess('Stock agregado', 'Stock agregado exitosamente');
                setCantidad(0);
                setMotivo('Compra inicial');
                onStockAdded?.();
            } else {
                const error = await response.json();
                showError('Error', error.message || 'Error al agregar stock');
            }
        } catch (error) {
            showConnectionError();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Agregar Stock</h3>
                    <p className="text-sm text-gray-600">{productoNombre}</p>
                </div>

                <form onSubmit={handleAddStock} className="space-y-4">
                    <div>
                        <Label htmlFor="current-stock" className="text-sm font-medium">
                            Stock Actual
                        </Label>
                        <div className="mt-1 p-3 bg-white rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-blue-600">{currentStock} unidades</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label htmlFor="precio-compra" className="text-xs font-medium text-gray-600">
                                Precio Compra
                            </Label>
                            <div className="mt-1 p-2 bg-white rounded-lg border border-gray-200 text-sm font-semibold">
                                ${Number(precioCompra || 0).toFixed(2)}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="precio-venta" className="text-xs font-medium text-gray-600">
                                Precio Venta
                            </Label>
                            <div className="mt-1 p-2 bg-white rounded-lg border border-gray-200 text-sm font-semibold">
                                ${Number(precioVenta || 0).toFixed(2)}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-green-200 p-4">
                        <p className="text-xs text-gray-600 mb-1">Margen de Ganancia</p>
                        <p className="text-3xl font-bold text-green-600">{margenGanancia}%</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Ganancia por unidad: ${(precioVenta - precioCompra).toFixed(2)}
                        </p>
                    </div>

                    <div>
                        <Label htmlFor="cantidad" className="text-sm font-medium">
                            Cantidad a Agregar *
                        </Label>
                        <Input
                            id="cantidad"
                            type="number"
                            min="1"
                            step="1"
                            value={cantidad}
                            onChange={(e) => setCantidad(parseInt(e.target.value) || 0)}
                            placeholder="0"
                            required
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="motivo" className="text-sm font-medium">
                            Motivo
                        </Label>
                        <Input
                            id="motivo"
                            type="text"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                            placeholder="Compra inicial, Reposición, etc."
                            className="mt-1"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || cantidad <= 0}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        {isLoading ? 'Agregando...' : 'Agregar Stock'}
                    </Button>
                </form>
            </div>
        </Card>
    );
}
