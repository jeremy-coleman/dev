import { UserServiceContext } from "@coglite/framework/ozone/user/service/UserServiceContext";
import { MockUserService } from "@coglite/framework/ozone/user/service/MockUserService";
import { UserDataServiceContext } from "@coglite/framework/ozone/user/service/UserDataServiceContext";
import { MockUserDataService } from "@coglite/framework/ozone/user/service/MockUserDataService";
import { ListingServiceContext } from "@coglite/framework/ozone/listing/service/ListingServiceContext";
import { MockListingService } from "@coglite/framework/ozone/listing/service/MockListingService";
import { ImageServiceContext } from "@coglite/framework/ozone/media/service/ImageServiceContext";
import { MockImageService } from "@coglite/framework/ozone/media/service/MockImageService";
import { MockCategoryService } from "@coglite/framework/ozone/category/service/MockCategoryService";
import { CategoryServiceContext } from "@coglite/framework/ozone/category/service/CategoryServiceContext";


const mock = (env : any) => {
    console.log("-- Applying Mock Configuration");
    UserServiceContext.value = new MockUserService();
    UserDataServiceContext.value = new MockUserDataService();
    ListingServiceContext.value = new MockListingService();
    ImageServiceContext.value = new MockImageService();
    CategoryServiceContext.value = new MockCategoryService();
};

export { mock, mock as default }