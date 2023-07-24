import { environment } from 'src/environments/environment';

export class AppConstants {
  public static baseUrl = environment.baseURL;
  public static JWT_SK = environment.jwtSk;
  public static PAYPAL_SK = environment.paypalSecretKey;
  public static PAYPAL_CLIENT_ID = environment.paypalClientId;

  // Actions
  public static EDIT = 'edit';
  public static Save = 'save';
  public static VIEW = 'view';
  public static CREATE = 'create';
  public static DELETE = 'delete';
  public static SUCCESS = 'success';
  public static CONFIRM = 'confirm';
  public static CHECKBOX = 'checkbox';
  public static ENVELOP = 'envelop';
  public static TOGGLE = 'toggle';

  public static PAGINATION = 'pagination';
  public static DOWNLOAD = 'download';
  public static DETAIL = 'detail';
  public static FILE = 'file';

  //Sorting
  public static DEC = 'dec';
  public static ASC = 'asc';

  // Errors
  public static PRIMARY = 'primary';
  public static SECONDARY = 'secondary';

  // public static SUCCESS = "success"; ALREADY EXISTS CAN BE REUSE
  public static DANGER = 'danger';
  public static WARNING = 'warning';
  public static INFO = 'info';
  public static LIGHT = 'light';
  public static DARK = 'dark';

  // messages
  public static INVALID_DATA = 'Data is not valid';
  public static UPSERT_SUCCESSFULLY = 'Upsert Successfully';

  // tabs
  public static ACTIVE_TAB = 'active tab';
  public static TAB = 'tab';

  //Table type
  public static TEXT = 'text';
  public static BADGE = 'badge';
  public static INDEX = 'index';
  public static DATE = 'date';
  public static NUMBER = 'number';
  public static NUMBER_FIXED = 'number-fixed';
  public static COLORSPOT = 'color-spot';
  public static TEXT_ARRAY = 'text-array';
  public static ADD = 'add';
  public static TAG = 'tag';
  public static TAG_ARRAY = 'tag-array';
  public static STATUS = 'status';
  public static TRANSLATION = 'translation';
  public static INPUT = 'input';
  public static SELECT = 'select';
  public static HAND_RAISE = 'handRaise';
  public static CHECK = 'check';
  public static APPROVE = 'approve';
  public static REJECT = 'rejecct';
  public static COMMENT = 'comment';

  //auth
  public static REGISTER_USER = 'auth/register';
  public static VERIFY_EMAIL = 'auth/verifyEmail';
  public static LOGIN = 'auth/login';
  public static EMAIL_FORGET_PASSWORD = 'auth/emailForgetPassword';
  public static RESET_PASSWORD = 'auth/resetPassword';

  //product
  public static UPLOAD_PRODUCT_APPROVAL_LISTING = 'product/uploadListing';
  public static ALL_PRODUCT_APPROVAL_LISTING_OF_USER =
    'product/allProductApprovalOfUser';
  public static ALL_USER_PRODUCT_APPROVAL_LISTING =
    'product/getAllUserProductApproval';
  public static UPDATE_PRODUCT_APPROVAL_LISTING_STATUS =
    'product/updateProductApprovalStatus';
  public static GET_PRODUCT_LISTING = 'product/getProductListing';
  public static GET_PRODUCT_LISTING_OF_SELECTED_USER =
    'product/getSelectedUserProduct';
  public static UPDATE_USER_PRODUCT_BY_ADMIN =
    'product/updateUserProductByAdmin';
  //productFileURl
  public static PRODUCT_FILE_URL = `${this.baseUrl}uploads/products/`;

  //user
  public static GET_ALL_USERS = 'user/getAllUsers';
  public static UPDATE_USER = 'user/updateUser';

  //order
  public static UPLOAD_ORDER_LISTING = 'order/uploadOrder';
  public static GET_ALL_POSTAGE = 'order/getAllPostage';
  public static UPSERT_POSTAGE = 'order/upsertPostage';
}
