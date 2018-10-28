import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FunctionUtils {
    getFunctionFromVariableOrFunction(vOrFn: any) {
        let fn = null;
        if (vOrFn) {
            fn = typeof vOrFn === 'function'
                ? vOrFn
                : () => vOrFn;
        } else {
            fn = () => null;
        }
        return fn;
    }
}