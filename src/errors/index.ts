/**
 * errors.ts
 */

export class E_STANDARD {

    message: string;
    statusCode: number;
    out: string;

    constructor(message: string = 'ERROR') {
        this.message = message;
        this.statusCode = 500;
        this.out = 'serverUnavailable';
    }
}

export class E_BAD_REQUEST extends E_STANDARD {

    message: string;
    statusCode: number;
    out: string;

    constructor(message: string = 'ERROR') {
        super(message);
        this.message = message;
        this.statusCode = 400;
        this.out = 'badRequest';
    }
}


export class E_UNAUTHORIZED extends E_STANDARD {

    message: string;
    statusCode: number;
    out: string;

    constructor(message = 'ERROR') {
        super(message);
        this.message = message;
        this.statusCode = 401;
        this.out = 'unauthorized';
    }
}

export class E_FORBIDDEN extends E_STANDARD {

    message: string;
    statusCode: number;
    out: string;

    constructor(message = 'ERROR') {
        super(message);
        this.message = message;
        this.statusCode = 403;
        this.out = 'forbidden';
    }
}

export class E_NOT_FOUND extends E_STANDARD {

    message: string;
    statusCode: number;
    out: string;

    constructor(message = 'ERROR') {
        super(message);
        this.message = message;
        this.statusCode = 404;
        this.out = 'notFound';
    }
}

export class E_SERVICE_UNAVAILABLE extends E_STANDARD {

    message: string;
    statusCode: number;
    out: string;

    constructor(message = 'ERROR') {
        super(message);
        this.message = message;
        this.statusCode = 500;
        this.out = 'serviceUnavailable';
    }
}

export class E_DATABASE_SERVICE extends E_STANDARD {

    message: string;
    statusCode: number;
    out: string;
    sql: string;
    params: string;

    constructor(sql: string, params: [] = [], message = 'DATABASE ERROR') {
        super(message);
        this.message = message;
        this.statusCode = 500;
        this.out = 'serviceUnavailable';
        this.sql = 'SQL ' + sql;
        this.params = 'PARAMS ' + JSON.stringify(params);
    }
}
