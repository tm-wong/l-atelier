/**
* errors.ts
*/


export class STANDARD extends Error {

    message: string;
    statusCode: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'STANDARD ERROR ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.statusCode = 500;
        this.out = 'Service Unavailable';
    }
}

export class BAD_REQUEST extends STANDARD {

    message: string;
    statusCode: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'BAD REQUEST ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.statusCode = 400;
        this.out = 'Bad Request';
    }
}


export class UNAUTHORIZED extends STANDARD {

    message: string;
    statusCode: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'UNAUTHORIZED ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.statusCode = 401;
        this.out = 'Unauthorized';
    }
}

export class FORBIDDEN extends STANDARD {

    message: string;
    statusCode: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'FORBIDDEN ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.statusCode = 403;
        this.out = 'Forbidden';
    }
}

export class NOT_FOUND extends STANDARD {

    message: string;
    statusCode: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'NOT FOUND ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.statusCode = 404;
        this.out = 'Not Found';
    }
}

export class SERVICE_UNAVAILABLE extends STANDARD {

    message: string;
    statusCode: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'SERVICE UNAVAILABLE ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.statusCode = 500;
        this.out = 'Service Unavailable';
    }
}

export class DATABASE_CONNEXION extends STANDARD {

    message: string;
    statusCode: number;
    out: string;

    constructor(message: string | null = '') {
        const msg = 'DATABASE CONNEXION ERROR ' + (message ??= '');
        super(msg);
        this.message = msg;
        this.statusCode = 500;
        this.out = 'Service Unavailable';
    }
}


export class DATABASE_QUERY extends STANDARD {

    message: string;
    statusCode: number;
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
        this.statusCode = 500;
        this.out = 'Service Unavailable';
        this.sql = 'SQL: ' + sql;
        this.params = 'PARAMS:  ' + JSON.stringify(params);
    }
}


export const _E_ = {
    STANDARD,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    SERVICE_UNAVAILABLE,
    DATABASE_CONNEXION,
    DATABASE_QUERY
};
