import proveedores from './proveedores'
import clientes from './clientes'
import productos from './productos'
import facturas from './facturas'
import cajas from './cajas'

const api = {
    proveedores: Object.assign(proveedores, proveedores),
    clientes: Object.assign(clientes, clientes),
    productos: Object.assign(productos, productos),
    facturas: Object.assign(facturas, facturas),
    cajas: Object.assign(cajas, cajas),
}

export default api