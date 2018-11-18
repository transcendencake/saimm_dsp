import { forOwn } from 'lodash';
import * as d3 from 'd3';
import { StringUtils } from './string.utils';
import { D3SvgElements } from '../app.constants';
import { Injectable } from '@angular/core';
import { FunctionUtils } from './function.utils';

type D3Select = d3.Selection<d3.BaseType, {}, HTMLElement, any>;


@Injectable()
export class D3Utils {
    constructor(private stringUtils: StringUtils, private functionUtils: FunctionUtils) {
    }

    appendElement<T>(d3SvgElement: ID3SvgElement<T>): D3Select {
        const { selector, element, attributes, text, title } = d3SvgElement;
        const svgEl = this.selectElement(selector)
            .append(element);
        if (attributes) {
            this.addAttributes(svgEl, attributes)
        }
        if(text) {
            this.addText(svgEl, text);
        }
        if(title) {
            this.addTitle(svgEl, title);
        }
        return svgEl;
    }

    selectElement(selector: string): D3Select {
        return d3.select(selector);
    }

    addAttributes<T>(d3SvgElement: D3Select, attributes: T): void {
        forOwn(attributes, (value, key) =>
            d3SvgElement.attr(
                this.stringUtils.replaceUppercaseWithDashFollowedByLowerCase(key),
                this.functionUtils.getValueFromValueOrFunction(value)
            ));
    }

    addText(d3SvgElement: D3Select, text: string): void {
        d3SvgElement.text(text);
    }

    addTitle(d3SvgElement: D3Select, title: string) {
        d3SvgElement.append('title').text(title);
    }
}