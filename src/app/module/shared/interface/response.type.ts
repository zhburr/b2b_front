export interface ApiResponse<Type> {
  Content: Type;
  Succeed: boolean;
  message?: string;
}
