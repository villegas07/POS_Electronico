import proveedores from './proveedores'
import productos from './productos'

const api = {
    proveedores: Object.assign(proveedores, proveedores),
    productos: Object.assign(productos, productos),
}

export default api