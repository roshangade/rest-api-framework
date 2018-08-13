/**
 * Expose
 */
declare const a: {
    error: (code: string | Function, task?: Function) => void;
    use: (task: Function) => void;
};
export = a;
