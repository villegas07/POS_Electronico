import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { showSuccess, showError } from '@/utils/alerts';

interface QuickClienteModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClienteCreated: (cliente: any) => void;
}

export function QuickClienteModal({ open, onOpenChange, onClienteCreated }: QuickClienteModalProps) {
    const [formData, setFormData] = useState({
        nombre: '',
        documento: '',
        email: '',
        telefono: '',
        direccion: '',
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!formData.nombre || !formData.documento) {
            showError('Error', 'El nombre y documento son requeridos');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const cliente = await response.json();
                showSuccess('Cliente registrado', 'El cliente ha sido registrado correctamente');
                onClienteCreated(cliente);
                setFormData({ nombre: '', documento: '', email: '', telefono: '', direccion: '' });
                onOpenChange(false);
            } else {
                const error = await response.json();
                showError('Error', error.message || 'Error al registrar el cliente');
            }
        } catch (err) {
            showError('Error', 'No se pudo conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Registrar Cliente Rápido</DialogTitle>
                    <DialogDescription>
                        Crea un nuevo cliente rápidamente antes de completar la venta
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
                        />
                    </div>

                    <div>
                        <Label htmlFor="documento">Documento (Cédula/NIT) *</Label>
                        <Input
                            id="documento"
                            placeholder="Ej: 1234567890"
                            value={formData.documento}
                            onChange={(e) => handleInputChange('documento', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
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
                                placeholder="Ej: 300 123 4567"
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
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrar Cliente'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
