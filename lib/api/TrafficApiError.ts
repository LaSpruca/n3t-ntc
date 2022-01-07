export default class TrafficApiError extends Error {
    constructor(
        private _message: string,
        public status: number,
        public apiResponse?: unknown
    ) {
        super();
    }

    public get message() {
        return this._message + ', Error ' + this.status;
    }
}
