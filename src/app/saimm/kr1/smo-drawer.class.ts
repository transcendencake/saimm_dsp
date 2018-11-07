import * as d3 from 'd3';
import { D3Utils } from 'src/app/utils/d3.utils';
export class SmoDrawer implements ISmoDrawer {
    private connectionYSpace = 3;
    private maxConnections = 10;
    private connectionXSpace = 3;
    private connectionBorderWidth = 3;
    private drawnItems: { [key: string]: IDrawnState } = {};
    private drawnConnections: IConnectionState[] = [];
    private connectionColors = [];

    private get stateFontSize(): number {
        return this.stateBlockHeight;
    }

    private get stateBlockHeight(): number {
        return this.connectionYSpace * this.maxConnections;
    }

    public drawSmoGraph(smoGraph: ISmoGraph): void {
        const d3utils = new D3Utils('#smoSvg');
        d3utils.drawCircle({
            cx: 30,
            cy: 30,
            fill: 'red',
            r: 15
        });
        // this.drawnItems = {};
        // this.drawnConnections = [];
        // smoGraph.states.forEach(this.drawState.bind(this));
        // this.drawConnections(smoGraph.tree);
    }

    private drawState(state: string) {
        const itemDrawn = this.drawnItems[state] != null;
        const x = 0;
        const y = 0;
        if (!itemDrawn) {
            this.drawnItems[state] = {
                freeConnectionIndex: 0,
                x,
                y
            }
        }
    }

    private drawConnections(smoTree: ISmoAnalyseModel): void {
        if (smoTree.possibleStates != null) {
            smoTree.possibleStates.forEach(treeNode => {
                this.drawConnection(smoTree.state, treeNode.state);
                this.drawConnections(treeNode);
            });
        }
    }

    private drawConnection(stateFrom: string, stateTo: string) {
        const existingConnection = this.drawnConnections.find(connection =>
            connection.from === stateFrom && connection.to === stateTo);
        const connectionExists = existingConnection != null;
        if (connectionExists) {
            const fromState = this.drawnItems[stateFrom];
            const toState = this.drawnItems[stateTo];
        }
        this.drawnConnections.push({
            from: stateFrom,
            to: stateTo
        });
    }
}