/* tslint:disable */
/* eslint-disable */

export class Life {
    free(): void;
    [Symbol.dispose](): void;
    cols(): number;
    get_cell(row: number, col: number): boolean;
    iterate(): void;
    constructor(rows: number, cols: number);
    rows(): number;
    set_cell(row: number, col: number, value: boolean): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_life_free: (a: number, b: number) => void;
    readonly life_cols: (a: number) => number;
    readonly life_get_cell: (a: number, b: number, c: number) => number;
    readonly life_iterate: (a: number) => void;
    readonly life_new: (a: number, b: number) => number;
    readonly life_rows: (a: number) => number;
    readonly life_set_cell: (a: number, b: number, c: number, d: number) => void;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
