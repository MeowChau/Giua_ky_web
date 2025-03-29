import { message } from 'antd';

export const showSuccess = (msg: string) => message.success(msg);
export const showError = (msg: string) => message.error(msg);
