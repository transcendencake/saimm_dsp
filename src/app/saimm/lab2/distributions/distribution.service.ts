import { SaimmConstants } from '../../saimm.constants';
import { ArrayUtils } from 'src/app/utils/array.utils';
import { Injectable } from '@angular/core';
import { max, min } from 'lodash';

@Injectable()
export class DistributionService {

    constructor(private arrayUtils: ArrayUtils) {

    }

    getDistributionSettingsBase(): IDistributionSettingsBase {
        return {
            amount: SaimmConstants.DEFAULT_DISTRUBUTION_SIZE,
            start: SaimmConstants.DEFAULT_DISTRUBUTION_START,
            end: SaimmConstants.DEFAULT_DISTRUBUTION_END
        };
    }

    getRandomNumbers(amount: number): number[] {
        return this.arrayUtils.create(amount, () => Math.random());
    }

    getGaussianSettings(): IGaussingDistributionSettings {
        return {
            amount: SaimmConstants.DEFAULT_DISTRUBUTION_SIZE,
            m: SaimmConstants.DEFAULT_M,
            d: SaimmConstants.DEFAULT_D,
            randAmount: SaimmConstants.DEFAULT_GAUSSIAN_RANDOM_AMOUNT
        };
    }

    getExponentialSettings(): IExponentialDistributionSettings {
        return {
            lambda: SaimmConstants.DEFAULT_EXPONENTIAL_LAMBDA,
            amount: SaimmConstants.DEFAULT_DISTRUBUTION_SIZE
        };
    }

    getGammaSettings(): IGammaDistributionSettings {
        return {
            lambda: SaimmConstants.DEFAULT_GAMMA_LAMBDA,
            amount: SaimmConstants.DEFAULT_DISTRUBUTION_SIZE,
            n: SaimmConstants.DEFAULT_GAMMA_N
        };
    }

    getTriangleSettings(): ITriangleDistributionSettings {
        return {
            ...this.getDistributionSettingsBase(),
            mode: SaimmConstants.DEFAULT_TRIANGLE_MODE
        };
    }

    getGistogramData(nums: number[], intervalAmount?: number): IGistogramData[] {
        const intervalsAmount = intervalAmount || SaimmConstants.DEFAULT_INTERVALS_AMOUNT;
        const maxValue = max(nums);
        const minValue = min(nums);
        const step = (maxValue - minValue) / intervalsAmount;
        const res: IGistogramData[] = [];
        for (let i = minValue; i < maxValue; i += step) {
            res.push({
                amount: nums.filter(num => num >= i && num < i + step).length,
                end: i + step,
                start: i,
                step
            });
        }
        return res;
    }

    getM(distribution: number[]): number {
        const summ = distribution.reduce((prev, curr) => prev + curr, 0);
        return summ / distribution.length;
    }

    getD(distribution: number[], M: number): number {
        const summ = distribution.reduce((prev, curr) => prev + Math.pow((curr - M), 2), 0);
        return summ / distribution.length;
    }

    getSKO(D: number): number {
        return Math.sqrt(D);
    }

    getUniformDistribution(settings: IDistributionSettingsBase): number[] {
        const { start, end, amount } = settings;
        const randomNumbers = this.getRandomNumbers(amount);
        return randomNumbers.map(randomNumber => start + (end - start) * randomNumber);
    }
}
