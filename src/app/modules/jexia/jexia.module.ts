import { NgModule, ModuleWithProviders, Optional, SkipSelf, Provider, InjectionToken } from '@angular/core';
import { JexiaClient } from './client.service';
import { IModule } from 'jexia-sdk-js/api/core/module';
import { IAuthOptions } from 'jexia-sdk-js';

export interface SubJexiaModule {
  sdkModule: IModule;
  providers?: Provider;
}

export interface NgJexiaConfig extends IAuthOptions {
  providers?: SubJexiaModule[];
}

export const NgJexiaConfigToken = new InjectionToken<NgJexiaConfig>('NgJexiaConfig');
export const NgJexiaModulesToken = new InjectionToken<Provider>('NgJexiaModules');
export function getSdkModules(m: SubJexiaModule) { return m.sdkModule; }
export function getModuleProviders(p: SubJexiaModule[], m: SubJexiaModule): any[] {
  return m.providers ? [...p, ...(m.providers as any)] : p;
}

@NgModule()
export class NgJexiaModule {

  /**
   * Initialization method of ng-jexia module that receive configuration parameters and jexia modules
   */
  static initialize({ providers = [], ...config }: NgJexiaConfig): ModuleWithProviders {
    return {
      ngModule: NgJexiaModule,
      providers: [
        { provide: NgJexiaConfigToken, useValue: config },
        { provide: NgJexiaModulesToken, useValue: providers.map(getSdkModules) },
        {
          provide: JexiaClient,
          useClass: JexiaClient,
          deps: [
            NgJexiaConfigToken,
            NgJexiaModulesToken,
          ],
        },
      ].concat(providers.reduce(getModuleProviders, [])),
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: NgJexiaModule) {
    if (parentModule) {
      throw new Error('NgJexiaModule is already loaded.');
    }
  }
}
