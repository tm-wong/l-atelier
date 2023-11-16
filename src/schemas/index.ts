export const player = {
    type: 'object',
    required: [ 'id', 'player' ],
    additionalProperties: false,
    properties: {
        id: { type: 'number' },
        player: {
            type: 'object',
            required: [
                'sex',
                'data',
                'country',
                'picture',
                'lastname',
                'firstname',
                'shortname'
            ],
            additionalProperties: false,
            properties: {
                sex: {
                    type: 'string',
                    enum: [ 'M', 'F' ]
                },
                data: {
                    type: 'object',
                    required: [ 'age', 'last' ],
                    additionalProperties: false,
                    properties: {
                        age: { type: 'number' },
                        last: {
                            type: 'array',
                            items: { type: 'number' }
                        }
                    }
                },
                country: {
                    code: { type: 'string' },
                    picture: { type: 'string' }
                },
                picture: { type: 'string' },
                lastname: { type: 'string' },
                firstname: { type: 'string' },
                shortname: { type: 'string' }
            }
        }
    }
};

export const playerList = {
    type: 'array',
    items: { player }
};

export const playerKpis = {
    type: 'object',
    required: [ 'kpis' ],
    additionalProperties: false,
    properties: {
        kpis: {
            type: 'object',
            required: [
                'maxPointRatioPerCountry',
                'medianBodyHeight',
                'imcs'
            ],
            additionalProperties: false,
            properties: {
                maxPointRatioPerCountry: {
                    type: 'object',
                    required: [ 'country', 'points' ],
                    additionalProperties: false,
                    properties: {
                        country: { type: 'string' },
                        points: { type: 'number' }
                    }
                },
                medianBodyHeight: { type: 'number' },
                imcs: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required: [
                            'id',
                            'imc',
                            'lastname',
                            'firstname'
                        ],
                        additionalProperties: false,
                        properties: {
                            id: { type: 'number' },
                            imc: { type: 'number' },
                            lastname: { type: 'string' },
                            firstname: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
};
