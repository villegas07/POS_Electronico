import ProveedorController from './ProveedorController'
import ClienteController from './ClienteController'
import ProductoController from './ProductoController'
import StockMovimientoController from './StockMovimientoController'
import StockController from './StockController'
import PosController from './PosController'
import DevolucionController from './DevolucionController'
import FactusController from './FactusController'

const Api = {
    ProveedorController: Object.assign(ProveedorController, ProveedorController),
    ClienteController: Object.assign(ClienteController, ClienteController),
    ProductoController: Object.assign(ProductoController, ProductoController),
    StockMovimientoController: Object.assign(StockMovimientoController, StockMovimientoController),
    StockController: Object.assign(StockController, StockController),
    PosController: Object.assign(PosController, PosController),
    DevolucionController: Object.assign(DevolucionController, DevolucionController),
    FactusController: Object.assign(FactusController, FactusController),
}

export default Api