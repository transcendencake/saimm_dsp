export class AlghorythmUtils {
    public static Cartesian<T>(arrOfArr: T[][]): T[][] {
        let [head, ...tail] = arrOfArr;
        let remainder: T[][] = tail.length
            ? AlghorythmUtils.Cartesian(tail)
            : [[]];
        const res: T[][] = [];
        for (let r of remainder) {
            for (let h of head) {
                res.push([h, ...r]);
            }
        }
        return res;
    }
}