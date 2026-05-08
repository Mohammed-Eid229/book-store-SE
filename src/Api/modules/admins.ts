/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../axiosClient"

export const GetAllUsers = () => {
    return axiosClient.get('/users');
}

// ✅ جيب يوزر واحد بالـ ID — بيرجع كل الـ fields بما فيها role
export const GetUserById = (id: number) => {
    return axiosClient.get(`/users/${id}`);
}

export const UpdateUserProfile = (id: number, data: FormData) => {
    return axiosClient.put(`/users/${id}`, data);
}

export const DeleteUser = (id: number) => {
    return axiosClient.delete(`/users/${id}`);
}

export const CreateAdmin = (data: any) => {
    return axiosClient.post('/users/create-admin', data);
}

export const GetAllOrders = () => {
    return axiosClient.get('/orders');
}

export const UpdateOrderStatus = (id: number, status: string) => {
    return axiosClient.patch(`/orders/${id}/status`, null, {
        params: { status }
    });
}

export const GetStatistics = () => {
    return axiosClient.get('/admin/statistics');
}

export const GetOrdersChartData = () => {
    return axiosClient.get('/admin/statistics/chart/orders');
}

export const GetLoginStats = (data: any) => {
    return axiosClient.get('/users/stats/logins', { data });
}