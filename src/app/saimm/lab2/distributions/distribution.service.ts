import { SaimmConstants } from "../../saimm.constants";
import { ArrayUtils } from "src/app/utils/array.utils";
import { Injectable } from "@angular/core";

@Injectable()
export class DistributionService {

    constructor(private arrayUtils: ArrayUtils) {

    }

    getDefaultDistributionSettings(): IDistributionSettingsBase {
        return {
            amount: SaimmConstants.DEFAULT_DISTRUBUTION_SIZE,
            start: SaimmConstants.DEFAULT_DISTRUBUTION_START,
            end: SaimmConstants.DEFAULT_DISTRUBUTION_END
        }
    }

    getRandomNumbers(amount: number): number[] {
        return this.arrayUtils.create(amount, () => Math.random());
    }

    getGistogramData(nums: number[], intervalAmount?: number): number[] {
        const intervalsAmount = intervalAmount || SaimmConstants.DEFAULT_INTERVALS_AMOUNT;
        const step = 1 / intervalsAmount;
        const res: number[] = [];
        for (let i = 0; i < 1; i += step) {
            res.push(nums.filter(num => num >= i && num < i + step).length);
        }
        return res;
    }
}