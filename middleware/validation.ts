const mw_validator = require('../util/validate');

// Check data to be added to the artist collection
const artistCheck = async (req: any, res: any, next: any) => {
    const validationRule = {
      "name": "required|string",
      "type": "required|string"
    };

    await mw_validator(req.body, validationRule, {}, (err: any, status: any) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( (err: any) => console.log(err))
}

const albumCheck = async (req: any, res: any, next: any) => {
    const validationRule = {
      "title": "required|string",
      "artist_id": "required|string|min:24|max:24",
      "media": "required|string",
      "genre": "required|string",
      "year": "required|integer",
      "tracks": "integer",
      "mins": "integer",
      "discnbr": "integer"
    };

    await mw_validator(req.body, validationRule, {}, (err: any, status: any) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( (err: any) => console.log(err))
}

const songCheck = async (req: any, res: any, next: any) => {
    const validationRule = {
      "title": "required|string",
      "artist_id": "required|string|min:24|max:24",
      "album_id": "required|string|min:24|max:24",
      "time": "string"
    };

    await mw_validator(req.body, validationRule, {}, (err: any, status: any) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( (err: any) => console.log(err))
}

module.exports = {
    artistCheck,
    albumCheck,
    songCheck
};