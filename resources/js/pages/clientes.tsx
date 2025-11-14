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
        title: 'Clientes',
        href: '/clientes',
    },
];

type ClienteForm = {
    nombre: string;
    documento: string;
    email?: string;
    telefono?: string;
    direccion?: string;
};

export default function ClientesPage() {
    const [clientes, setClientes] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<ClienteForm>({
        nombre: '',
        documento: '',
        email: '',
        telefono: '',
        direccion: '',
    });
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = () => {
        setLoading(true);
        fetch('/api/clientes')
            .then((r) => r.json())
            .then((data) => setClientes(data || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    const filteredClientes = clientes.filter((c) =>
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.documento && c.documento.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const openCreateModal = () => {
        setEditingId(null);
        setFormData({
            nombre: '',
            documento: '',
            email: '',
            telefono: '',
            direccion: '',
        });
        setIsModalOpen(true);
    };

    const openEditModal = (cliente: any) => {
        setEditingId(cliente.id);
        setFormData({
            nombre: cliente.nombre || '',
            documento: cliente.documento || '',
            email: cliente.email || '',
            telefono: cliente.telefono || '',
            direccion: cliente.direccion || '',
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (field: keyof ClienteForm, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const submitForm = async () => {
        if (!formData.nombre || !formData.documento) {
            showValidationError('Por favor completa los campos requeridos (Nombre, Documento)');
            return;
        }

        setFormLoading(true);
        try {
            const url = editingId ? `/api/clientes/${editingId}` : '/api/clientes';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (editingId) {
                    setClientes(
                        clientes.map((c) => (c.id === editingId ? data : c))
                    );
                } else {
                    setClientes([...clientes, data]);
                }
                
                showSuccess(
                    editingId ? 'Cliente actualizado' : 'Cliente creado',
                    editingId ? 'El cliente ha sido actualizado correctamente' : 'El cliente ha sido creado correctamente'
                );
                
                setIsModalOpen(false);
            } else {
                const errorData = await response.json();
                showError('Error', errorData.message || 'Error al guardar el cliente');
            }
        } catch (err) {
            showConnectionError();
        } finally {
            setFormLoading(false);
        }
    };

    const deleteCliente = async (id: number) => {
        const result = await showConfirm('¿Eliminar cliente?', 'Esta acción no se puede deshacer');
        
        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    setClientes(clientes.filter((c) => c.id !== id));
                    showSuccess('Cliente eliminado', 'El cliente ha sido eliminado correctamente');
                } else {
                    showError('Error', 'No se pudo eliminar el cliente');
                }
            } catch (error) {
                showConnectionError();
            }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Clientes</h1>
                        <p className="text-muted-foreground">Gestiona tu base de clientes</p>
                    </div>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateModal}>
                                <Plus className="h-4 w-4 mr-2" />
                                Nuevo Cliente
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingId ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
                                </DialogTitle>
                                <DialogDescription>
                                    Completa los detalles del cliente
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 py-4">
                                <div>
                                    <Label htmlFor="nombre">Nombre *</Label>
                                    <Input
                                        id="nombre"
                                        placeholder="Ej: Juan Pérez"
                                        value={formData.nombre}
                                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="documento">Documento (Cédula/NIT) *</Label>
                                    <Input
                                        id="documento"
                                        placeholder="Ej: 1234567890"
                                        value={formData.documento}
                                        onChange={(e) => handleInputChange('documento', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="email">Email (Opcional)</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Ej: juan@example.com"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="telefono">Teléfono (Opcional)</Label>
                                        <Input
                                            id="telefono"
                                            placeholder="Ej: +57 300 123 4567"
                                            value={formData.telefono}
                                            onChange={(e) => handleInputChange('telefono', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="direccion">Dirección (Opcional)</Label>
                                    <Input
                                        id="direccion"
                                        placeholder="Ej: Calle 10 #20-30"
                                        value={formData.direccion}
                                        onChange={(e) => handleInputChange('direccion', e.target.value)}
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
                                    {formLoading ? 'Guardando...' : editingId ? 'Actualizar' : 'Registrar'}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card className="p-6">
                    <div className="mb-6">
                        <Input
                            type="text"
                            placeholder="Buscar por nombre o documento..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="rounded-lg border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Documento</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Teléfono</TableHead>
                                    <TableHead>Dirección</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            Cargando...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredClientes.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            No hay clientes
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredClientes.map((cliente) => (
                                        <TableRow key={cliente.id}>
                                            <TableCell className="font-medium">{cliente.nombre}</TableCell>
                                            <TableCell>{cliente.documento || '-'}</TableCell>
                                            <TableCell>{cliente.email || '-'}</TableCell>
                                            <TableCell>{cliente.telefono || '-'}</TableCell>
                                            <TableCell>{cliente.direccion || '-'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => openEditModal(cliente)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => deleteCliente(cliente.id)}
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
