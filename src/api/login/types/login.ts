export interface LoginRequestData {
    /** 账号 */
    username: "admin" | "editor"
    /** 密码 */
    password: string
  }