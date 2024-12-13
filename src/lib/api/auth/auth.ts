import api from './api';
import { AxiosError } from 'axios';

interface ErrorResponseData {
    success: boolean;
    message?: string;
    errors?: {
        email?: string;
        password?: string;
    };
}
export const signIn = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', {
            email,
            password,
        });

        return response.data;
    } catch (err) {
        const error = err as AxiosError;

        if (error.response) {
            console.log('error response', error.response);
            const data = error.response.data as ErrorResponseData;

            // const { data } = error.response;
            console.log('error data', data);

            if (data?.success === false) {
                if (data.errors?.password) {
                    throw data.errors.password;
                }

                else if (data.errors?.email) {
                    throw data.errors.email;
                }else throw data.message || 'Sign-in failed.';
            }
        }

        throw 'An error occurred during sign-in. Please try again later.';
    }
};
