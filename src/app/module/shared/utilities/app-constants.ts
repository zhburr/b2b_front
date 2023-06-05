import { environment } from 'src/environments/environment';

export class AppConstants {
  public static baseUrl = environment.baseURL;

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

  //auth
  public static REGISTER_USER = 'api/auth/register';
  public static VERIFY_EMAIL = 'api/auth/emailVerified';
  public static LOGIN = 'api/auth/login';
  public static EMAIL_FORGET_PASSWORD = 'api/auth/emailForgetPassword';
  public static RESET_PASSWORD = 'api/auth/resetPassword';
}
