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
    tick(): void;
    getStateDescriptor(): IStateDescriptor;
    getPossibleStates(): string[];
    setState(state: string);
    getCopy(): ISmo;
}

interface ISmoDrawer {
    drawSmoGraph(graph: ISmoGraph): void;
    setActiveState(state: string): void;
    removeActiveState(state: string): void;
}

interface IStateDescriptor {
    state: string;
    prevState: string;
    explanation: string;
    amountInSystem: number;
    createdId: number;
    destroyedIds: number[];
}

interface IPossible<TValue> {
    possibility: number;
    value: TValue;
}

interface INextSmoState {
    description: string;
    state: string;
}

interface ISmoNode {
    value: number;
    prevValue: number;
    requestId: number;
    prevRequestId: number;
    destroyedId: number;
    getPossibleNextValues(): number[];
    getNextValue(): number;
    getExplanation(): string;
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
    color: string;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
}

interface IHtmlElementAttributes {
    class?: string;
}

interface ID3SvgCircle extends IHtmlElementAttributes {
    cx: number;
    cy: number;
    r: number;
    fill?: string;
}

interface ID3SvgLine extends IHtmlElementAttributes {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke?: string;
    strokeWidth?: string;
}

interface ID3SvgRectangle extends IHtmlElementAttributes {
    x: number;
    y: number;
    width: number;
    height: number;
    stroke?: string;
    strokeWidth?: string;
    fill?: string;
}

interface ID3SvgText extends IHtmlElementAttributes {
    x: number;
    y: number;
    textAnchor: string;
}

interface ID3SvgElement<T> {
    selector: string;
    element: string;
    attributes?: T;
    text?: string;
    title?: string;
}

interface ID3DrawerDefaults {
    stroke?: string | (() => string);
    strokeWidth?: number | (() => number);
    fill?: string | (() => string);
}

interface ISmoRequest {
    id: number;
    lifeTime: number;
    isHandled: boolean;
}
