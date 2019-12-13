import { SubJexiaModule } from './jexia.module';
import { DataOperations, sdkDataOperationsModule } from './dataOperations.service';

/**
 * Data Operation Module contain the sdk module and the providers
 */
export const DataOperationsModule: SubJexiaModule = {
  get sdkModule() { return sdkDataOperationsModule; },
  providers: [
    DataOperations,
  ],
};
