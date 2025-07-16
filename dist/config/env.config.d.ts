declare const _default: (() => {
    system: {
        node_env: string | undefined;
        port: string | number;
    };
    email: {
        user: string | undefined;
        pass: string | undefined;
        reciever: string | undefined;
    };
    jwt: {
        pass: string | undefined;
        exp: string | undefined;
    };
    bcrypt: {
        salting: string | undefined;
    };
    db: {
        type: string | undefined;
        user: string | undefined;
        pass: string | undefined;
        host: string | undefined;
        port: string | undefined;
        name: string | undefined;
    };
    links: {
        updateMyEmailRedirectionLink: string | undefined;
    };
    cloudinary: {
        name: string | undefined;
        key: string | undefined;
        secret: string | undefined;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    system: {
        node_env: string | undefined;
        port: string | number;
    };
    email: {
        user: string | undefined;
        pass: string | undefined;
        reciever: string | undefined;
    };
    jwt: {
        pass: string | undefined;
        exp: string | undefined;
    };
    bcrypt: {
        salting: string | undefined;
    };
    db: {
        type: string | undefined;
        user: string | undefined;
        pass: string | undefined;
        host: string | undefined;
        port: string | undefined;
        name: string | undefined;
    };
    links: {
        updateMyEmailRedirectionLink: string | undefined;
    };
    cloudinary: {
        name: string | undefined;
        key: string | undefined;
        secret: string | undefined;
    };
}>;
export default _default;
