/**
 * errors.ts
 */

export class E_STANDARD {

    message: string;
    status: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'STANDARD ERROR ' + (message ??= '');
        this.message = msg;
        this.status = 500;
        this.out = 'Service Unavailable';
    }
}

export class E_BAD_REQUEST extends E_STANDARD {

    message: string;
    status: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'BAD REQUEST ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.status = 400;
        this.out = 'Bad Request';
    }
}


export class E_UNAUTHORIZED extends E_STANDARD {

    message: string;
    status: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'UNAUTHORIZED ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.status = 401;
        this.out = 'Unauthorized';
    }
}

export class E_FORBIDDEN extends E_STANDARD {

    message: string;
    status: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'FORBIDDEN ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.status = 403;
        this.out = 'Forbidden';
    }
}

export class E_NOT_FOUND extends E_STANDARD {

    message: string;
    status: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'NOT FOUND ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.status = 404;
        this.out = 'Not Found';
    }
}

export class E_SERVICE_UNAVAILABLE extends E_STANDARD {

    message: string;
    status: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'SERVICE UNAVAILABLE ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.status = 500;
        this.out = 'Service Unavailable';
    }
}

export class E_DATABASE_CONNEXION extends E_STANDARD {

    message: string;
    status: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'DATABASE CONNEXION ERROR ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.status = 500;
        this.out = 'Service Unavailable';
    }
}


export class E_DATABASE_QUERY extends E_STANDARD {

    message: string;
    status: number;
    out: string;
    sql: string;
    params: string;

    constructor(
        message: string | null = '',
        sql: string | null = null,
        params: [] | null = []
    ) {
        const msg = 'DATABASE QUERY ERROR ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.status = 500;
        this.out = 'Service Unavailable';
        this.sql = 'SQL: ' + sql;
        this.params = 'PARAMS:  ' + JSON.stringify(params);
    }
}
