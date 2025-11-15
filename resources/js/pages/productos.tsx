import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { type BreadcrumbItem } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Download } from 'lucide-react';
import { showSuccess, showError, showValidationError, showConnectionError, showConfirm } from '@/utils/alerts';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Productos', href: '/productos' }];

type ProductForm = {
    nombre: string;
    sku: string;
    precio_venta: number;
    precio_costo: number;
    iva_porcentaje: number;
    cantidad_stock: number;
    aplicar_iva: boolean;
};

export default function ProductosPage() {
    const [productos, setProductos] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [stockTemp, setStockTemp] = useState<number>(0);
    const [motvoTemp, setMotivoTemp] = useState<string>('Compra inicial');
    const [stockLoading, setStockLoading] = useState(false);
    const [formData, setFormData] = useState<ProductForm>({
        nombre: '',
        sku: '',
        precio_venta: 0,
        precio_costo: 0,
        iva_porcentaje: 19,
        cantidad_stock: 0,
        aplicar_iva: true,
    });

    useEffect(() => {
        loadProductos();
    }, []);

    const loadProductos = async () => {
        try {
            const response = await fetch('/api/productos');
            const data = await response.json();
            setProductos(Array.isArray(data) ? data : []);
        } catch (error) {
            setProductos([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredProductos = productos.filter((p) => {
        if (!p || !p.nombre || !p.sku) return false;
        const search = searchTerm.toLowerCase();
        return p.nombre.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search);
    });

    const openCreateModal = () => {
        setEditingId(null);
        setIsNewProduct(false);
        setFormData({ nombre: '', sku: '', precio_venta: 0, precio_costo: 0, iva_porcentaje: 19, cantidad_stock: 0, aplicar_iva: true });
        setStockTemp(0);
        setMotivoTemp('Compra inicial');
        setIsModalOpen(true);
    };

    const openEditModal = (producto: any) => {
        setEditingId(producto.id);
        setIsNewProduct(false);
        setFormData({
            nombre: producto.nombre,
            sku: producto.sku,
            precio_venta: producto.precio_venta,
            precio_costo: producto.precio_costo,
            iva_porcentaje: producto.iva_porcentaje || 19,
            cantidad_stock: producto.stock?.cantidad || 0,
            aplicar_iva: (producto.iva_porcentaje || 0) > 0,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.nombre || !formData.sku || formData.precio_costo <= 0 || formData.precio_venta <= 0 || formData.cantidad_stock < 0) {
            showValidationError('Por favor completa todos los campos requeridos correctamente');
            return;
        }

        try {
            const url = editingId ? `/api/productos/${editingId}` : '/api/productos';
            const method = editingId ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    sku: formData.sku,
                    precio_venta: formData.precio_venta,
                    precio_costo: formData.precio_costo,
                    iva_porcentaje: formData.aplicar_iva ? formData.iva_porcentaje : 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                
                // Si es creación y hay stock, agregar el stock
                if (!editingId && formData.cantidad_stock > 0) {
                    try {
                        await fetch('/api/stock/movimientos', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                producto_id: data.id,
                                tipo: 'in',
                                cantidad: parseInt(formData.cantidad_stock.toString()),
                                motivo: 'Compra inicial',
                            }),
                        });
                    } catch (error) {
                        console.error('Error agregando stock:', error);
                    }
                }
                
                showSuccess(
                    editingId ? 'Producto actualizado' : 'Producto creado',
                    editingId ? 'El producto ha sido actualizado correctamente' : 'El producto ha sido creado correctamente'
                );
                
                setIsModalOpen(false);
                loadProductos();
            } else {
                showError('Error al guardar', 'Hubo un problema al guardar el producto');
            }
        } catch (error) {
            showConnectionError();
        }
    };

    const deleteProducto = async (id: number) => {
        const result = await showConfirm('¿Eliminar producto?', 'Esta acción no se puede deshacer');
        
        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    showSuccess('Producto eliminado', 'El producto ha sido eliminado correctamente');
                    loadProductos();
                } else {
                    showError('Error', 'No se pudo eliminar el producto');
                }
            } catch (error) {
                showConnectionError();
            }
        }
    };

    const exportarProductos = () => {
        if (productos.length === 0) return;
        const csv = [
            ['Nombre', 'SKU', 'Precio Costo', 'Precio Venta', 'IVA %'].join(','),
            ...productos.map(p => [p.nombre, p.sku, p.precio_costo, p.precio_venta, p.iva_porcentaje].join(','))
        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `productos-${Date.now()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Productos" />
                <div className="flex items-center justify-center p-12">
                    <p className="text-muted-foreground">Cargando...</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Productos</h1>
                        <p className="text-muted-foreground">Gestiona tu catálogo</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={exportarProductos}>
                            <Download className="h-4 w-4 mr-2" />
                            Exportar
                        </Button>
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={openCreateModal}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nuevo
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
                                    <DialogDescription>
                                        {editingId ? 'Actualiza los detalles del producto' : 'Crea un nuevo producto con todos sus detalles'}
                                    </DialogDescription>
                                </DialogHeader>
                                
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="nombre">Nombre *</Label>
                                        <Input 
                                            id="nombre" 
                                            value={formData.nombre} 
                                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="sku">SKU *</Label>
                                        <Input 
                                            id="sku" 
                                            value={formData.sku} 
                                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })} 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="cantidad_stock">Stock *</Label>
                                        <Input 
                                            id="cantidad_stock" 
                                            type="number" 
                                            min="0"
                                            step="1"
                                            value={formData.cantidad_stock === 0 ? '' : formData.cantidad_stock} 
                                            onChange={(e) => setFormData({ ...formData, cantidad_stock: parseInt(e.target.value) || 0 })} 
                                            required 
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="precio_costo">Precio Costo *</Label>
                                            <Input 
                                                id="precio_costo" 
                                                type="number" 
                                                step="0.01"
                                                min="0"
                                                value={formData.precio_costo === 0 ? '' : formData.precio_costo} 
                                                onChange={(e) => setFormData({ ...formData, precio_costo: parseFloat(e.target.value) || 0 })} 
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="precio_venta">Precio Venta *</Label>
                                            <Input 
                                                id="precio_venta" 
                                                type="number" 
                                                step="0.01"
                                                min="0"
                                                value={formData.precio_venta === 0 ? '' : formData.precio_venta} 
                                                onChange={(e) => setFormData({ ...formData, precio_venta: parseFloat(e.target.value) || 0 })} 
                                                required 
                                            />
                                        </div>
                                    </div>

                                    {/* Margen de Ganancia */}
                                    {formData.precio_venta > 0 && formData.precio_costo > 0 && (
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                                            <p className="text-xs text-gray-600 mb-1">Margen de Ganancia</p>
                                            <p className="text-3xl font-bold text-green-600">
                                                {(((formData.precio_venta - formData.precio_costo) / formData.precio_costo) * 100).toFixed(2)}%
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Ganancia por unidad: ${(formData.precio_venta - formData.precio_costo).toFixed(2)}
                                            </p>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <input 
                                                type="checkbox" 
                                                id="aplicar_iva" 
                                                checked={formData.aplicar_iva}
                                                onChange={(e) => setFormData({ ...formData, aplicar_iva: e.target.checked })}
                                                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                            />
                                            <Label htmlFor="aplicar_iva" className="cursor-pointer">Aplicar IVA</Label>
                                        </div>
                                        
                                        {formData.aplicar_iva && (
                                            <div>
                                                <Label htmlFor="iva">Porcentaje IVA *</Label>
                                                <Input 
                                                    id="iva" 
                                                    type="number" 
                                                    step="0.01"
                                                    min="0"
                                                    value={formData.iva_porcentaje === 0 ? '' : formData.iva_porcentaje} 
                                                    onChange={(e) => setFormData({ ...formData, iva_porcentaje: parseFloat(e.target.value) || 0 })} 
                                                    required={formData.aplicar_iva}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2 pt-4 border-t">
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            className="flex-1" 
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                setEditingId(null);
                                                setIsNewProduct(false);
                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button type="submit" className="flex-1">
                                            {editingId ? 'Guardar cambios' : 'Crear Producto'}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <Card>
                    <div className="p-4">
                        <Input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead className="text-right">Precio Costo</TableHead>
                                    <TableHead className="text-right">Precio Venta</TableHead>
                                    <TableHead className="text-right">Margen</TableHead>
                                    <TableHead className="text-right">IVA</TableHead>
                                    <TableHead className="text-center">Stock</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProductos.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No hay productos</TableCell>
                                    </TableRow>
                                ) : (
                                    filteredProductos.map((producto) => {
                                        const margenGanancia = producto.precio_venta > 0 && producto.precio_costo > 0
                                            ? (((producto.precio_venta - producto.precio_costo) / producto.precio_costo) * 100).toFixed(2)
                                            : '0';
                                        return (
                                            <TableRow key={producto.id}>
                                                <TableCell className="font-medium">{producto.nombre}</TableCell>
                                                <TableCell>{producto.sku}</TableCell>
                                                <TableCell className="text-right">${Number(producto.precio_costo || 0).toFixed(2)}</TableCell>
                                                <TableCell className="text-right">${Number(producto.precio_venta || 0).toFixed(2)}</TableCell>
                                                <TableCell className="text-right">
                                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                                        parseFloat(margenGanancia) > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {margenGanancia}%
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">{producto.iva_porcentaje || 0}%</TableCell>
                                                <TableCell className="text-center">
                                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                                        {producto.stock?.cantidad || 0}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => openEditModal(producto)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => deleteProducto(producto.id)}>
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
