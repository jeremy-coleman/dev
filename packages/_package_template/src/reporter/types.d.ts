export declare const enum Status {
    Passed = 0,
    Failed = 1,
    Skipped = 2
}
export interface Report {
    readonly path: string[];
    readonly status: Status;
    readonly duration: number;
    readonly errors: string[];
}
export interface Reporter {
    start?(): void;
    finish?(): void;
    report(r: Report): void;
}
//# sourceMappingURL=types.d.ts.map