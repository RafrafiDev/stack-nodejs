import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework-w3tec';
import { createGraphQLServer, createDataLoader } from '../lib/graphql';
import { env } from '../core/env';
import { UserRepository } from '../api/user/repositories/UserRepository';

export const graphqlLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.graphql.enabled) {
        const expressApp = settings.getData('express_app');

        createGraphQLServer(expressApp, {
            route: env.graphql.route,
            editorEnabled: env.graphql.editor,
            queries: env.app.dirs.queries,
            mutations: env.app.dirs.mutations,
            dataLoaders: {
                users: createDataLoader(UserRepository),
            },
        });

    }
};
