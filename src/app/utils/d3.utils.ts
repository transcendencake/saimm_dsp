import { forOwn } from 'lodash';
import * as d3 from 'd3';

interface ID3Circle {
    cx: number;
    cy: number;
    r: number;
    fill: string;
}

export class D3Utils {
    constructor(private selector: string) {

    }

    drawCircle(d3Circle: ID3Circle): void {
        const circle = d3.select(this.selector)
            .append('circle');
        forOwn(d3Circle, (value, key) => circle.attr(key, value));
    }
}