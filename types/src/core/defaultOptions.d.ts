declare const _default: {
    rootPath: string;
    log4jsConfigure: {
        appenders: {
            console: {
                type: string;
            };
            access: {
                type: string;
            };
            application: {
                type: string;
            };
        };
        categories: {
            default: {
                appenders: string[];
                level: string;
            };
            access: {
                appenders: string[];
                level: string;
            };
            application: {
                appenders: string[];
                level: string;
            };
        };
    };
};
export default _default;
