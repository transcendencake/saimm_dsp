interface IDistributionSettingsBase {
    start: number;
    end:  number;
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