import { D3Utils } from 'src/app/utils/d3.utils';
import { D3Drawer } from 'src/app/classes/d3drawer.class';
import { SaimmConstants } from '../saimm.constants';
import { ColorsProvider } from 'src/app/classes/colors-provider.class';

export class SmoDrawer implements ISmoDrawer {
    private maxConnections = 14;
    private connectionBorderWidth = 3;
    private drawnStates: { [key: string]: IDrawnState } = {};
    private drawnConnections: IConnectionState[] = [];
    private connectionColorsProvider = new ColorsProvider();
    private d3Drawer: D3Drawer;

    constructor(private d3Utils: D3Utils) {
        this.d3Drawer = new D3Drawer({
            selector: SaimmConstants.DEFAULT_D3_SELECTOR,
            d3Utils: d3Utils,
            defaults: {
                fill: () => this.connectionColorsProvider.getColorAndSetNext(),
                stroke: () => this.connectionColorsProvider.getColorAndSetNext(),
                strokeWidth: this.connectionBorderWidth
            }
        });
    }

    private get connectionXSpace(): number {
        return 10 + this.connectionBorderWidth;
    }

    private get connectionYSpace(): number {
        return 9 + this.connectionBorderWidth;
    }

    private get stateBlockHeight(): number {
        return this.connectionYSpace * this.maxConnections;
    }

    private get stateBlockMargin(): number {
        return 20;
    }

    private get stateBlockWidth(): number {
        return 200;
    }

    public drawSmoGraph(smoGraph: ISmoGraph): void {
        this.drawnStates = {};
        this.drawnConnections = [];
        smoGraph.states.forEach(this.drawState.bind(this));
        this.drawConnections(smoGraph.tree);
    }

    public removeActiveState(state: string): void {
        const svgElementClass = this.getStateSvgClass(state);
        const el = this.d3Utils.selectElement('.' + svgElementClass);
        this.d3Utils.setAttributes(el, {
            fill: SaimmConstants.NOT_ACTIVE_STATE_FILL
        });
    }

    public setActiveState(state: string): void {
        const svgElementClass = this.getStateSvgClass(state);
        const el = this.d3Utils.selectElement('.' + svgElementClass);
        this.d3Utils.setAttributes(el, {
            fill: SaimmConstants.ACTIVE_STATE_FILL
        });
    }

    private getStateSvgClass(state: string) {
        return 'state' + state;
    }

    private drawState(state: string, drawOrder: number) {
        const itemDrawn = this.drawnStates[state] != null;
        if (!itemDrawn) {
            const x = 0;
            const y = drawOrder * (this.stateBlockHeight + this.stateBlockMargin);
            this.d3Drawer.drawRectangle({
                x,
                y,
                width: this.stateBlockWidth,
                height: this.stateBlockHeight,
                fill: SaimmConstants.NOT_ACTIVE_STATE_FILL,
                stroke: 'black',
                class: this.getStateSvgClass(state)
            });
            this.d3Drawer.drawText({
                textAnchor: 'middle',
                x: x + this.stateBlockWidth / 2,
                y: y + this.stateBlockHeight / 2,
            }, state);
            this.drawnStates[state] = {
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
        const existingConnectionReversed = this.drawnConnections.find(connection =>
            connection.to === stateFrom && connection.from === stateTo);
        const connectionExists = existingConnection != null || existingConnectionReversed != null;

        const connectionColor = this.connectionColorsProvider.getColorAndSetNext();
        if (!connectionExists) {
            const fromState = this.drawnStates[stateFrom];
            const toState = this.drawnStates[stateTo];
            const xStartOut = fromState.x + this.stateBlockWidth;
            const yStartOut = fromState.y + (fromState.freeConnectionIndex * this.connectionYSpace);
            const xEndOut = fromState.x + this.stateBlockWidth
                + ((this.drawnConnections.length + 1) * this.connectionXSpace);
            const yEndOut = fromState.y === toState.y
                ? fromState.y + ((fromState.freeConnectionIndex + 1) * this.connectionYSpace)
                : yStartOut;
            const xStartIn = toState.x + this.stateBlockWidth;
            const yStartIn = toState.y + (toState.freeConnectionIndex * this.connectionYSpace);
            const xEndIn = xEndOut;
            const yEndIn = yStartIn;

            const title = `from ${stateFrom} to ${stateTo}`;
            this.d3Drawer.drawLine({
                x1: xStartOut,
                y1: yStartOut,
                x2: xEndOut,
                y2: yEndOut,
                stroke: connectionColor,
                class: 'connection'
            }, title);

            this.d3Drawer.drawLine({
                x1: xEndOut,
                y1: yEndOut,
                x2: xEndIn,
                y2: yEndIn,
                stroke: connectionColor,
                class: 'connection'
            }, title);

            this.d3Drawer.drawLine({
                x1: xEndIn,
                y1: yEndIn,
                x2: xStartIn,
                y2: yStartIn,
                stroke: connectionColor,
                class: 'connection'
            }, title);

            this.d3Drawer.drawCircle({
                cx: xStartOut,
                cy: yStartOut,
                r: 3,
                fill: connectionColor
            });

            this.drawnConnections.push({
                from: stateFrom,
                to: stateTo,
                fromX: xStartOut,
                fromY: yStartOut,
                toX: xStartIn,
                toY: yStartIn,
                color: connectionColor
            });

            toState.freeConnectionIndex += 1;
            fromState.freeConnectionIndex += 1;
        } else if (existingConnectionReversed != null) {
            const cx = existingConnectionReversed.toX;
            const cy = existingConnectionReversed.toY;
            const r = 3;
            const color = existingConnectionReversed.color;
            this.d3Drawer.drawCircle({
                cx: cx,
                cy: cy,
                r: r,
                fill: color
            });
        }
    }
}