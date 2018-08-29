import { IPredicateFunc } from "@coglite/framework/common/IPredicateFunc";
import { ISyncSupplier } from "@coglite/framework/common/ISyncSupplier";
import { IRequest } from "@coglite/framework/common/IRequest";
import { IRequestHandler } from "@coglite/framework/common/IRequestHandler";
import { IRouter } from "@coglite/framework/common/IRouter";
import { Router } from "@coglite/framework/common/Router";
import { IUserProfile } from "./IUserProfile";
import { UserProfileStore } from "./model/UserProfileStore";
import { isMemberOfGroup } from "./UserHelper";

//import { ISupplierFunc } from "@coglite/framework/common/ISupplierFunc";
//import { IMapFunc } from "@coglite/framework/common/IMapFunc";


/**
 * Inject a user profile from the specified supplier
 * @param userProfileSupplier
 */
const injectUserProfile = (userProfileSupplier : ISyncSupplier<IUserProfile> = UserProfileStore) : IRequestHandler => {
    return (req : IRequest, next?: IRequestHandler) => {
        if(!req.userProfile) {
            return userProfileSupplier.load().then(() => {
                if(userProfileSupplier.sync.error) {
                    return Promise.reject(userProfileSupplier.sync.error);
                }
                const nextReq = Object.assign({}, req, { userProfile: userProfileSupplier.value });
                next(nextReq);
            });
        }
        next();
    };
};

const userProfileFilter = (filter : IPredicateFunc<IUserProfile>,
                           userProfileSupplier : ISyncSupplier<IUserProfile> = UserProfileStore) => {
    return (req: IRequest, next?: IRequestHandler) : Promise<any> | any => {
        return userProfileSupplier.load().then(() => {
            if(userProfileSupplier.sync.error) {
                return Promise.reject(userProfileSupplier.sync.error);
            }
            const match = filter(userProfileSupplier.value);
            if(!match) {
                throw { code: "FORBIDDEN", message: "You do not have permission to access this resource", request: req };
            }
            return next();
        });
    }
};

const userProfileFilterRouter = (filter : IPredicateFunc<IUserProfile>,
                                 router : IRouter | IRequestHandler,
                                 userProfileSupplier : ISyncSupplier<IUserProfile> = UserProfileStore) : IRouter => {
    const r = new Router();
    r.use(userProfileFilter(filter, userProfileSupplier));
    r.use(router);
    return r;
};

const requiresGroup = (group : string,
                       userProfileSupplier : ISyncSupplier<IUserProfile> = UserProfileStore) : IRequestHandler => {
    return userProfileFilter(userProfile => {
        return isMemberOfGroup(userProfile, group);
    }, userProfileSupplier);
};

const requiresGroupRouter = (group : string,
                             router : IRouter | IRequestHandler,
                             userProfileSupplier : ISyncSupplier<IUserProfile> = UserProfileStore) : IRouter => {
    const r = new Router();
    r.use(requiresGroup(group, userProfileSupplier));
    r.use(router);
    return r;
};

export { injectUserProfile, userProfileFilter, requiresGroup, requiresGroupRouter, userProfileFilterRouter };
