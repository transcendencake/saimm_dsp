import { Input } from "@angular/core";

export abstract class DistributionBase<IDistrubutionSettings> {
    @Input() settings: IDistrubutionSettings;
    gistogramData: number[] = [];
    distribution: number[];
}