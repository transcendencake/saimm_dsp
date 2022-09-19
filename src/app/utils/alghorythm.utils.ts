export class AlghorythmUtils {
    public static Cartesian<T>(arrOfArr: T[][]): T[][] {
        const [head, ...tail] = arrOfArr;
        const remainder: T[][] = tail.length
            ? AlghorythmUtils.Cartesian(tail)
            : [[]];
        const res: T[][] = [];
        for (const r of remainder) {
            for (const h of head) {
                res.push([h, ...r]);
            }
        }
        return res;
    }
}
