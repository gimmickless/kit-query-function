"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
const getNewKits = () => {
    return [];
};
const resolvers = {
    Query: {
        posts: (ctx) => {
            return getNewKits();
        }
    }
};
const lambdaHandler = async (event) => {
    const typeHandler = resolvers[event.info.parentTypeName];
    if (typeHandler) {
        const resolver = typeHandler[event.info.fieldName];
        if (resolver) {
            return await resolver(event);
        }
    }
    throw new Error(`Resolver not found for event: ${JSON.stringify(event)}`);
};
exports.lambdaHandler = lambdaHandler;
