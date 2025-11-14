import proveedores from './proveedores'
import clientes from './clientes'
import productos from './productos'

const api = {
    proveedores: Object.assign(proveedores, proveedores),
    clientes: Object.assign(clientes, clientes),
    productos: Object.assign(productos, productos),
}

export default api