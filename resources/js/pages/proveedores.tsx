import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { type BreadcrumbItem } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { showSuccess, showError, showValidationError, showConnectionError, showConfirm } from '@/utils/alerts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Proveedores',
        href: '/proveedores',
    },
];

type ProveedorForm = {
    nit: string;
    nombre: string;
    nombre_contacto?: string;
    email: string;
    telefono: string;
    direccion: string;
    nota?: string;
};

export default function ProveedoresPage() {
    const [proveedores, setProveedores] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<ProveedorForm>({
        nit: '',
        nombre: '',
        nombre_contacto: '',
        email: '',
        telefono: '',
        direccion: '',
        nota: '',
    });
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        fetchProveedores();
    }, []);

    const fetchProveedores = () => {
        setLoading(true);
        fetch('/api/proveedores')
            .then((r) => r.json())
            .then((data) => setProveedores(data || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    const filteredProveedores = proveedores.filter((p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.nit && p.nit.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const openCreateModal = () => {
        setEditingId(null);
        setFormData({
            nit: '',
            nombre: '',
            nombre_contacto: '',
            email: '',
            telefono: '',
            direccion: '',
            nota: '',
        });
        setIsModalOpen(true);
    };

    const openEditModal = (proveedor: any) => {
        setEditingId(proveedor.id);
        setFormData({
            nit: proveedor.nit || '',
            nombre: proveedor.nombre,
            nombre_contacto: proveedor.nombre_contacto || '',
            email: proveedor.email || '',
            telefono: proveedor.telefono || '',
            direccion: proveedor.direccion || '',
            nota: proveedor.nota || '',
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (field: keyof ProveedorForm, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const submitForm = async () => {
        if (!formData.nit || !formData.nombre || !formData.email || !formData.telefono || !formData.direccion) {
            showValidationError('Por favor completa todos los campos requeridos (NIT, Nombre, Email, Teléfono, Dirección)');
            return;
        }

        setFormLoading(true);
        try {
            const url = editingId ? `/api/proveedores/${editingId}` : '/api/proveedores';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (editingId) {
                    setProveedores(
                        proveedores.map((p) => (p.id === editingId ? data : p))
                    );
                } else {
                    setProveedores([...proveedores, data]);
                }
                
                showSuccess(
                    editingId ? 'Proveedor actualizado' : 'Proveedor creado',
                    editingId ? 'El proveedor ha sido actualizado correctamente' : 'El proveedor ha sido creado correctamente'
                );
                
                setIsModalOpen(false);
            } else {
                const errorData = await response.json();
                showError('Error', errorData.message || 'Error al guardar el proveedor');
            }
        } catch (err) {
            showConnectionError();
        } finally {
            setFormLoading(false);
        }
    };

    const deleteProveedor = async (id: number) => {
        const result = await showConfirm('¿Eliminar proveedor?', 'Esta acción no se puede deshacer');
        
        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/proveedores/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    setProveedores(proveedores.filter((p) => p.id !== id));
                    showSuccess('Proveedor eliminado', 'El proveedor ha sido eliminado correctamente');
                } else {
                    showError('Error', 'No se pudo eliminar el proveedor');
                }
            } catch (error) {
                showConnectionError();
            }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Proveedores" />
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Proveedores</h1>
                        <p className="text-muted-foreground">Gestiona tu red de proveedores</p>
                    </div>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateModal}>
                                <Plus className="h-4 w-4 mr-2" />
                                Nuevo Proveedor
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingId ? 'Editar Proveedor' : 'Crear Nuevo Proveedor'}
                                </DialogTitle>
                                <DialogDescription>
                                    Completa los detalles del proveedor
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 py-4">
                                <div>
                                    <Label htmlFor="nit">NIT *</Label>
                                    <Input
                                        id="nit"
                                        placeholder="Ej: 123456789-0"
                                        value={formData.nit}
                                        onChange={(e) => handleInputChange('nit', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="nombre">Nombre de la Empresa *</Label>
                                    <Input
                                        id="nombre"
                                        placeholder="Ej: ABC Distribuidora"
                                        value={formData.nombre}
                                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="nombre_contacto">Persona de Contacto (Opcional)</Label>
                                    <Input
                                        id="nombre_contacto"
                                        placeholder="Ej: Juan Pérez"
                                        value={formData.nombre_contacto}
                                        onChange={(e) => handleInputChange('nombre_contacto', e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Ej: contacto@abc.com"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="telefono">Teléfono *</Label>
                                        <Input
                                            id="telefono"
                                            placeholder="Ej: +57 300 123 4567"
                                            value={formData.telefono}
                                            onChange={(e) => handleInputChange('telefono', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="direccion">Dirección *</Label>
                                    <Input
                                        id="direccion"
                                        placeholder="Ej: Calle 10 #20-30"
                                        value={formData.direccion}
                                        onChange={(e) => handleInputChange('direccion', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="nota">Nota (Opcional)</Label>
                                    <Input
                                        id="nota"
                                        placeholder="Ej: Proveedor preferido"
                                        value={formData.nota}
                                        onChange={(e) => handleInputChange('nota', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button onClick={submitForm} disabled={formLoading}>
                                    {formLoading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card className="p-6">
                    <div className="mb-6">
                        <Input
                            type="text"
                            placeholder="Buscar por nombre o NIT..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="rounded-lg border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>NIT</TableHead>
                                    <TableHead>Empresa</TableHead>
                                    <TableHead>Contacto</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Teléfono</TableHead>
                                    <TableHead>Dirección</TableHead>
                                    <TableHead>Nota</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                            Cargando...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredProveedores.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                            No hay proveedores
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredProveedores.map((proveedor) => (
                                        <TableRow key={proveedor.id}>
                                            <TableCell className="font-medium">{proveedor.nit || '-'}</TableCell>
                                            <TableCell>{proveedor.nombre}</TableCell>
                                            <TableCell>{proveedor.nombre_contacto || '-'}</TableCell>
                                            <TableCell>{proveedor.email || '-'}</TableCell>
                                            <TableCell>{proveedor.telefono || '-'}</TableCell>
                                            <TableCell>{proveedor.direccion || '-'}</TableCell>
                                            <TableCell>{proveedor.nota || '-'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => openEditModal(proveedor)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => deleteProveedor(proveedor.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
