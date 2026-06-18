export type LoginState = {
  success: boolean;
  error?: Array<{ message?: string } | undefined>;
};
