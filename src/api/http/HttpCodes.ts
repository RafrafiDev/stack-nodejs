export class HttpCodes {
    // Standard codes
    public static readonly HTTP_OK = 200;
    public static readonly HTTP_CREATED = 201;
    public static readonly HTTP_ACCEPTED = 202;
    public static readonly HTTP_NO_CONTENT = 204;
    public static readonly HTTP_NOT_MODIFIED = 304;
    public static readonly HTTP_BAD_REQUEST = 400;
    public static readonly HTTP_UNAUTHORIZED = 401;
    public static readonly HTTP_FORBIDDEN = 403;
    public static readonly HTTP_NOT_FOUND = 404;
    public static readonly HTTP_METHOD_NOT_ALLOWED = 405;
    public static readonly HTTP_INTERNAL_SERVER_ERROR = 500;
    public static readonly HTTP_SERVICE_UNAVAILABLE = 503;

    // Specifics codes
    public static readonly FAILED_DATA_VALIDATION = 400000;
    public static readonly INVALID_PATCH_DOCUMENT = 400010;
    public static readonly INVALID_TARGET_DOCUMENT = 400011;
    public static readonly INVALID_PATCH_OPERATION = 400012;
    public static readonly INVALID_AUTHOR_ID = 400020;
    public static readonly INVALID_REFRESH_TOKEN = 400021;
    public static readonly INVALID_CREDENTIALS = 401001;
    public static readonly REFRESH_TOKEN_EXPIRED = 401002;
    public static readonly DENIED_VIEW_NOTE = 403010;
    public static readonly DENIED_EDIT_NOTE = 403011;
    public static readonly NOTE_NOT_FOUND = 404030;
    public static readonly USER_NOT_FOUND = 400025;
    public static readonly USER_EXISTS = 400026;

    public static readonly statusText = {
        200: 'OK',
        201: 'Created',
        202: 'Accepted',
        204: 'No Content',
        304: 'Not Modified',

        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        405: 'Method Not Allowed',

        500: 'Internal Server Error',
        503: 'Service Unavailable',

        400000: 'Failed data validation',
        400001: 'Invalid JSON in a patch document',
        400011: 'Invalid JSON in a target document',
        400012: 'Invalid JSON Pointer operation (i.e. missing property)',
        400020: 'Invalid author id',
        400021: 'Invalid refresh token',
        401001: 'Invalid credentials',
        401002: 'Refresh token expired',
        403010: 'Denied access to note',
        403011: 'Denied access to edit note',
        404030: 'Note not found',
        400025: 'User not found',
        400026: 'User already exists',
    };
}
