import { SmoDrawer } from "./smo-drawer.class";
import { SmoClass } from "./smo.class";
import { SmoAnalyser } from "./smo-analyser.class";

export class SmoService {
    private _drawer = new SmoDrawer();
    private _smo = new SmoClass();
    private _analyser = new SmoAnalyser();
    private _smoGraph = this._analyser.analyse(this._smo);

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