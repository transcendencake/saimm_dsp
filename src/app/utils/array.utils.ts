import { Injectable } from "@angular/core";
import { FunctionUtils } from "./function.utils";

@Injectable({
    providedIn: 'root'
})
export class ArrayUtils {
    constructor(private functionUtils: FunctionUtils) {

    }

    public create<T>(amount: number, filler?: () => T): T[] {
        const fillerFn = this.functionUtils.getFunctionFromVariableOrFunction(filler);
        return new Array(amount).fill(null).map(el => fillerFn());
    }

}