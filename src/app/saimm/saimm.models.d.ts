interface IDistributionSettingsBase {
    start: number;
    end: number;
    amount: number;
}

interface IGistogramData {
    amount: number;
    start: number;
    end: number;
    step: number;
}

interface IGaussingDistributionSettings {
    amount: number;
    m: number;
    d: number;
    randAmount: number;
}

interface IExponentialDistributionSettings {
    lambda: number;
    amount: number;
}

interface IGammaDistributionSettings {
    lambda: number;
    n: number;
    amount: number;
}

interface ITriangleDistributionSettings extends IDistributionSettingsBase {
    mode: number;
}

interface ISmo {
    getState(): string;
    getPossibleStates(): string[];
    setState(state: string);
    getCopy(): ISmo;
}

interface ISmoDrawer {
    drawSmoGraph(graph: ISmoGraph): void;
}

interface IPossible<TValue> {
    possibility: number;
    value: TValue;
}

interface ISmoNode {
    value: number;
    getPossibleNextValues(): number[];
    getNextValue(): number;
}

interface ISmoAnalyseModel {
    state: string;
    possibleStates: ISmoAnalyseModel[];
}

interface ISmoBuildAnalyseModelParams {
    smo: ISmo;
    visit(state: string): void;
    isVisited(state: string): boolean;
}

interface ISmoGraph {
    tree: ISmoAnalyseModel;
    states: string[];
}

interface IDrawnState {
    x: number;
    y: number;
    freeConnectionIndex: 0;
}

interface IConnectionState {
    from: string;
    to: string;
}