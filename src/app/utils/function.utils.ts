import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FunctionUtils {
    getFunctionFromVariableOrFunction(vOrFn: any): any {
        return this.isFunction(vOrFn) ? vOrFn : () => vOrFn;
    }

    getValueFromValueOrFunction(vOrFn: any): any {
        return this.isFunction(vOrFn) ? vOrFn() : vOrFn;
    }

    isFunction(vOrFn: any) {
        return typeof vOrFn === 'function';
    }
}
