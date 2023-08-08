import axios from './Api';

export const getTimeOffCancel = async (token: string) => {
    const response = await axios.get('/timeoffcancel', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const createTimeOffCancel = async (token: string, timeOffId: number) => {
    await axios.post('/timeoffcancel', {
        timeOffId
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteTimeOffCancel = async (token: string, timeOffCancelId: number) => {
    await axios.delete(`/timeoffcancel/${timeOffCancelId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const approveOrDeclineTimeOffCancel = async (token: string, timeOffCancelId: number, isApproved: boolean) => {
    await axios.put(`/timeoffcancel/${timeOffCancelId}`, {
        isApproved
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
