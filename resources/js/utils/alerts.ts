import Swal from 'sweetalert2';

// Alerta de éxito
export const showSuccess = (title: string, message?: string) => {
    return Swal.fire({
        icon: 'success',
        title,
        text: message,
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: '#10b981',
    });
};

// Alerta de error
export const showError = (title: string, message?: string) => {
    return Swal.fire({
        icon: 'error',
        title,
        text: message,
        confirmButtonColor: '#ef4444',
    });
};

// Alerta de advertencia
export const showWarning = (title: string, message?: string) => {
    return Swal.fire({
        icon: 'warning',
        title,
        text: message,
        confirmButtonColor: '#f59e0b',
    });
};

// Alerta de confirmación
export const showConfirm = (title: string, message?: string) => {
    return Swal.fire({
        title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    });
};

// Alerta de información
export const showInfo = (title: string, message?: string) => {
    return Swal.fire({
        icon: 'info',
        title,
        text: message,
        confirmButtonColor: '#3b82f6',
    });
};

// Alerta de validación/campos incompletos
export const showValidationError = (message: string) => {
    return Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: message,
        confirmButtonColor: '#ef4444',
    });
};

// Alerta de error de conexión
export const showConnectionError = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor',
        confirmButtonColor: '#ef4444',
    });
};

// Alerta de carga
export const showLoading = (title: string = 'Procesando...') => {
    Swal.fire({
        title,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: (modal) => {
            Swal.showLoading();
        },
    });
};

// Cerrar alerta de carga
export const hideLoading = () => {
    Swal.close();
};
