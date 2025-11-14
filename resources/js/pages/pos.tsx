import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { type BreadcrumbItem } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { showSuccess, showError, showValidationError } from '@/utils/alerts';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'POS', href: '/pos' }];

type CartItem = {
    id: number;
    nombre: string;
    precio_venta: number;
    precio_venta_con_iva: number;
    iva_porcentaje: number;
    quantity: number;
};

type PaymentDetail = {
    metodo: string;
    monto: number;
};

export default function PosPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('efectivo');
    const [processingPayment, setProcessingPayment] = useState(false);
    
    // Descuento
    const [applyDiscount, setApplyDiscount] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    
    // Pagos combinados
    const [useCombinedPayments, setUseCombinedPayments] = useState(false);
    const [combinedPayments, setCombinedPayments] = useState<PaymentDetail[]>([]);
    
    // Efectivo - monto recibido y cambio
    const [amountReceived, setAmountReceived] = useState<number>(0);

    useEffect(() => {
        fetch('/api/productos')
            .then((r) => r.json())
            .then((data) => {
                setProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setProducts([]);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter((p) => {
        if (!p || !p.nombre) return false;
        const search = searchTerm.toLowerCase();
        return p.nombre.toLowerCase().includes(search) || (p.sku && p.sku.toLowerCase().includes(search));
    });

    const addToCart = (product: any) => {
        const precioVenta = typeof product.precio_venta === 'string' 
            ? parseFloat(product.precio_venta) 
            : product.precio_venta || 0;
        const ivaPercent = typeof product.iva_porcentaje === 'string'
            ? parseFloat(product.iva_porcentaje)
            : product.iva_porcentaje || 0;
        
        // Calcular precio con IVA incluido
        const precioVentaConIva = precioVenta * (1 + ivaPercent / 100);
            
        const existing = cart.find((item) => item.id === product.id);
        if (existing) {
            setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, {
                id: product.id,
                nombre: product.nombre,
                precio_venta: precioVenta,
                precio_venta_con_iva: precioVentaConIva,
                iva_porcentaje: ivaPercent,
                quantity: 1,
            }]);
        }
    };

    const removeFromCart = (id: number) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            setCart(cart.map((item) => item.id === id ? { ...item, quantity } : item));
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const totals = cart.reduce((acc, item) => {
        const subtotal = item.precio_venta * item.quantity;
        const tax = subtotal * (item.iva_porcentaje / 100);
        return {
            subtotal: acc.subtotal + subtotal,
            tax: acc.tax + tax,
            total: acc.total + subtotal + tax,
        };
    }, { subtotal: 0, tax: 0, total: 0 });

    // Calcular total con descuento
    const discountAmount = applyDiscount ? (totals.total * (discountPercentage / 100)) : 0;
    const finalTotal = totals.total - discountAmount;

    const addCombinedPayment = () => {
        setCombinedPayments([...combinedPayments, { metodo: 'cash', monto: 0 }]);
    };

    const updateCombinedPayment = (index: number, field: string, value: any) => {
        const updated = [...combinedPayments];
        updated[index] = { ...updated[index], [field]: value };
        setCombinedPayments(updated);
    };

    const removeCombinedPayment = (index: number) => {
        setCombinedPayments(combinedPayments.filter((_, i) => i !== index));
    };

    const handlePayment = async () => {
        if (cart.length === 0) {
            showValidationError('El carrito está vacío');
            return;
        }

        try {
            setProcessingPayment(true);
            const items = cart.map(item => ({
                producto_id: item.id,
                cantidad: item.quantity,
                precio_unitario: item.precio_venta,
                descuento_porcentaje: applyDiscount ? discountPercentage : 0
            }));

            let payments: PaymentDetail[] = [];

            if (useCombinedPayments) {
                const totalPagado = combinedPayments.reduce((sum, p) => sum + p.monto, 0);
                if (Math.abs(totalPagado - finalTotal) > 0.01) {
                    showValidationError(`Los pagos suman ${totalPagado.toFixed(2)}, pero el total es ${finalTotal.toFixed(2)}`);
                    setProcessingPayment(false);
                    return;
                }
                payments = combinedPayments;
            } else {
                // Validar efectivo
                if (paymentMethod === 'efectivo' && amountReceived < finalTotal) {
                    showValidationError(`Dinero insuficiente. Total: $${finalTotal.toFixed(2)}, Recibido: $${amountReceived.toFixed(2)}`);
                    setProcessingPayment(false);
                    return;
                }
                const metodoMap: Record<string, string> = {
                    'efectivo': 'cash',
                    'tarjeta': 'card',
                    'transferencia': 'transfer'
                };
                payments = [{
                    metodo: metodoMap[paymentMethod] || 'cash',
                    monto: finalTotal
                }];
            }

            const response = await fetch('/api/pos/ventas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: items,
                    payments: payments,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                showSuccess('Venta Procesada', `Venta #${data.id} procesada exitosamente`);
                setCart([]);
                setApplyDiscount(false);
                setDiscountPercentage(0);
                setUseCombinedPayments(false);
                setCombinedPayments([]);
                setAmountReceived(0);
                setPaymentMethod('efectivo');
            } else {
                const error = await response.json();
                showError('Error', error.message || 'Error al procesar venta');
            }
        } catch (error) {
            showError('Error', 'Error de conexión al procesar la venta');
        } finally {
            setProcessingPayment(false);
        }
    };

    if (loading) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="POS" />
                <div className="flex items-center justify-center p-12">
                    <p className="text-muted-foreground">Cargando...</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="POS" />
            <div className="grid gap-4 p-4 md:grid-cols-3 h-screen">
                {/* Productos */}
                <div className="md:col-span-2 space-y-4 flex flex-col">
                    <Input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-auto flex-1">
                        {filteredProducts.length === 0 ? (
                            <div className="col-span-3 lg:col-span-4 p-6 text-center text-muted-foreground">No hay productos</div>
                        ) : (
                            filteredProducts.map((product) => (
                                <Card key={product.id} className="p-4 cursor-pointer hover:shadow-lg transition-shadow h-fit"
                                    onClick={() => addToCart(product)}>
                                    <div className="flex flex-col items-start justify-between h-full">
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{product.nombre}</h4>
                                            <p className="text-sm text-muted-foreground">SKU: {product.sku || 'N/A'}</p>
                                        </div>
                                        <div className="w-full flex items-end justify-between mt-2">
                                            <p className="text-lg font-bold">${(Number(product.precio_venta || 0) * (1 + Number(product.iva_porcentaje || 0) / 100)).toFixed(2)}</p>
                                            <Button size="sm">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                {/* Carrito y Pago */}
                <div className="overflow-y-auto flex flex-col gap-4">
                    {/* Carrito */}
                    <Card className="p-4 flex-1 overflow-y-auto">
                        <div className="flex items-center gap-2 mb-4">
                            <ShoppingCart className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">Carrito</h3>
                        </div>
                        <div className="space-y-2">
                            {cart.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">Carrito vacío</p>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex flex-col gap-2 border-b pb-2">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{item.nombre}</p>
                                                <p className="text-xs text-muted-foreground">${item.precio_venta_con_iva.toFixed(2)}</p>
                                            </div>
                                            <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</Button>
                                            <Input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)} className="h-8 w-12 text-center" />
                                            <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>

                    {/* Sección de Pago */}
                    {cart.length > 0 && (
                        <Card className="p-4 space-y-3">
                            {/* Totales */}
                            <div className="space-y-2 border-b pb-3">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal:</span>
                                    <span>${totals.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Impuesto:</span>
                                    <span>${totals.tax.toFixed(2)}</span>
                                </div>
                                {applyDiscount && (
                                    <div className="flex justify-between text-sm text-red-600">
                                        <span>Descuento ({discountPercentage}%):</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total:</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Descuento */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        id="apply-discount"
                                        checked={applyDiscount}
                                        onCheckedChange={(checked) => {
                                            setApplyDiscount(checked as boolean);
                                            if (!checked) setDiscountPercentage(0);
                                        }}
                                    />
                                    <Label htmlFor="apply-discount" className="cursor-pointer text-sm">
                                        Aplicar descuento
                                    </Label>
                                </div>
                                {applyDiscount && (
                                    <Input 
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        value={discountPercentage}
                                        onChange={(e) => setDiscountPercentage(parseFloat(e.target.value) || 0)}
                                        placeholder="% Descuento"
                                        className="h-8 text-sm"
                                    />
                                )}
                            </div>

                            {/* Método de Pago */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        id="combined-payments"
                                        checked={useCombinedPayments}
                                        onCheckedChange={(checked) => {
                                            setUseCombinedPayments(checked as boolean);
                                            if (!checked) setCombinedPayments([]);
                                        }}
                                    />
                                    <Label htmlFor="combined-payments" className="cursor-pointer text-sm">
                                        Pagos combinados
                                    </Label>
                                </div>

                                {!useCombinedPayments ? (
                                    <div className="space-y-2">
                                        <Select value={paymentMethod} onValueChange={(value) => {
                                            setPaymentMethod(value);
                                            if (value !== 'efectivo') setAmountReceived(0);
                                        }}>
                                            <SelectTrigger className="h-8 text-sm">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="efectivo">Efectivo</SelectItem>
                                                <SelectItem value="tarjeta">Tarjeta</SelectItem>
                                                <SelectItem value="transferencia">Transferencia</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {paymentMethod === 'efectivo' && (
                                            <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded-lg space-y-2">
                                                <Input 
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={amountReceived}
                                                    onChange={(e) => setAmountReceived(parseFloat(e.target.value) || 0)}
                                                    placeholder="Monto recibido"
                                                    className="h-8 text-sm"
                                                />
                                                <div className="bg-white dark:bg-neutral-800 p-2 rounded border border-blue-200 dark:border-blue-800">
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">Cambio:</p>
                                                    <p className={`text-xl font-bold ${amountReceived >= finalTotal ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                        ${(amountReceived - finalTotal).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {combinedPayments.map((payment, index) => (
                                            <div key={index} className="flex gap-2 items-end">
                                                <Select 
                                                    value={payment.metodo} 
                                                    onValueChange={(value) => updateCombinedPayment(index, 'metodo', value)}
                                                >
                                                    <SelectTrigger className="h-8 text-sm flex-1">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="cash">Efectivo</SelectItem>
                                                        <SelectItem value="card">Tarjeta</SelectItem>
                                                        <SelectItem value="transfer">Transferencia</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Input 
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={payment.monto}
                                                    onChange={(e) => updateCombinedPayment(index, 'monto', parseFloat(e.target.value) || 0)}
                                                    placeholder="Monto"
                                                    className="h-8 text-sm flex-1"
                                                />
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={() => removeCombinedPayment(index)}
                                                    className="h-8"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={addCombinedPayment}
                                            className="w-full h-8 text-sm"
                                        >
                                            <Plus className="h-3 w-3 mr-1" />
                                            Agregar pago
                                        </Button>
                                        <div className="text-xs p-2 bg-blue-50 dark:bg-blue-950 rounded">
                                            <p>Total pagado: <strong>${combinedPayments.reduce((s, p) => s + p.monto, 0).toFixed(2)}</strong></p>
                                            <p>Falta: <strong>${(finalTotal - combinedPayments.reduce((s, p) => s + p.monto, 0)).toFixed(2)}</strong></p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Botones de Acción */}
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 h-8 text-sm" onClick={clearCart}>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Limpiar
                                </Button>
                                <Button 
                                    className="flex-1 h-8 text-sm" 
                                    onClick={handlePayment}
                                    disabled={processingPayment || (paymentMethod === 'efectivo' && amountReceived < finalTotal)}
                                >
                                    {processingPayment ? 'Procesando...' : 'Pagar'}
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
