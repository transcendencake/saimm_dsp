import { D3Utils } from "../utils/d3.utils";
import { D3SvgElements, D3DefaultAttributes } from "../app.constants";

import { assign } from 'lodash';

interface ID3DrawerDrawArgs<T> {
    attributes: T;
    element: string;
    defaultKeys?: string[];
    text?: string;
    title?: string;
}

interface ID3DrawerConstructor {
    selector: string;
    d3Utils: D3Utils;
    defaults?: ID3DrawerDefaults
}

export class D3Drawer {
    private selector: string;
    private d3Utils: D3Utils;
    private defaults: ID3DrawerDefaults;

    constructor(d3DrawerConstructor: ID3DrawerConstructor) {
        const { selector, d3Utils, defaults } = d3DrawerConstructor;
        this.selector = selector;
        this.d3Utils = d3Utils;
        this.defaults = assign({
            fill: D3DefaultAttributes.FILL,
            stroke: D3DefaultAttributes.STROKE,
            strokeWidth: D3DefaultAttributes.STROKE_WIDTH
        } as ID3DrawerDefaults, defaults || {});
    }

    drawCircle(circleAttributes: ID3SvgCircle, title?: string): void {
        this.draw({
            attributes: circleAttributes,
            element: D3SvgElements.CIRCLE,
            defaultKeys: ['fill'],
            title: title
        });
    }

    drawLine(lineAttributes: ID3SvgLine, title?: string): void {
        this.draw({
            attributes: lineAttributes,
            element: D3SvgElements.LINE,
            defaultKeys: ['stroke', 'strokeWidth'],
            title: title
        });
    }

    drawRectangle(rectangleAttributes: ID3SvgRectangle, title?: string): void {
        this.draw({
            attributes: rectangleAttributes,
            element: D3SvgElements.RECTANGLE,
            defaultKeys: ['stroke', 'strokeWidth', 'fill'],
            title: title
        });
    }

    drawText(textAttributes: ID3SvgText, text: string, title?: string): void {
        this.draw({
            attributes: textAttributes,
            element: D3SvgElements.TEXT,
            text: text,
            title: title
        });
    }

    private draw<T>(drawerDrawArgs: ID3DrawerDrawArgs<T>): void {
        const { attributes, element, defaultKeys, text, title } = drawerDrawArgs;
        this.d3Utils.appendElement<T>({
            selector: this.selector,
            element: element,
            attributes: this.getAttributes(attributes, defaultKeys || []),
            text: text,
            title: title
        });
    }

    private getAttributes<T>(attributes: T,  defaultsKeys: string[]): T {
        const defaultAttributes = {};
        defaultsKeys.forEach(key => {
            defaultAttributes[key] = this.defaults[key]
        });
        return assign<T>(defaultAttributes, attributes)
    }
}