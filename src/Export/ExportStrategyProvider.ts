import JPGExportStrategy from './Strategies/JPGExportStrategy'
import PNGExportStrategy from './Strategies/PNGExportStrategy'
import BMPExportStrategy from './Strategies/BMPExportStrategy'
import ExportTypes from './types'
import IExportStrategy from './IExportStrategy'

class RenderStrategyProvider {

    static get(type: ExportTypes): IExportStrategy {
        switch (type) {
            case ExportTypes.JPG:
                return new JPGExportStrategy()
            case ExportTypes.PNG:
                return new PNGExportStrategy()
            case ExportTypes.BMP:
                return new BMPExportStrategy()
        }
    }
}

export default RenderStrategyProvider