import { SmoDrawer } from "./smo-drawer.class";
import { SmoClass } from "./smo.class";
import { SmoAnalyser } from "./smo-analyser.class";
import { Injectable } from "@angular/core";
import { D3Utils } from "src/app/utils/d3.utils";

@Injectable()
export class SmoService {
    private _drawer = new SmoDrawer(this.d3Utils);
    private _smo = new SmoClass();
    private _analyser = new SmoAnalyser();
    private _smoGraph = this._analyser.analyse(this._smo);

    constructor(private d3Utils: D3Utils) {

    }

    get drawer(): ISmoDrawer {
        return this._drawer;
    }

    get graph(): ISmoGraph {
        return this._smoGraph;
    }

    get smo(): ISmo {
        return this._smo;
    }
}