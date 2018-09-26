const axios = require('axios')

export const httpReq = {
    getList: function (callbackSuccess?: (data: APP.TodoItem[]) => void, callbackNegative?: (error: any)=> void) {
        axios.get('/api/getList')
            .then(function (response: any) {
                console.log(response);
                if (callbackSuccess) {
                    callbackSuccess(response.data)
                }
            })
            .catch(function (error: any) {
                console.log(error);
            })
    },

    addItem: function (item: APP.TodoItem, callbackSuccess?: (data: any) => void, callbackNegative?: (error: any)=> void) {
        axios.post('/api/getList/addItem', {
            id: item.id,
            text: item.text,
            isDone: item.isDone,
        }).then(function (response: any) {
            console.log(response);
            if (callbackSuccess) {
                callbackSuccess(response.data)
            }
        }).catch(function (error: any) {
            console.log(error);
            if (callbackNegative) {
                callbackNegative(error)
            }
        })
    },

    updateTask: function(item:APP.TodoItem, callbackSuccess?: (data: any) => void, callbackNegative?: (error: any)=> void) {
        axios.post('/api/getList/updateItem', {
            id: item.id,
            text: item.text,
            isDone: item.isDone,
        }).then(function (response: any) {
            console.log(response);
            if (callbackSuccess) {
                callbackSuccess(response.data)
            }
        }).catch(function (error: any) {
            console.log(error);
            if (callbackNegative) {
                callbackNegative(error)
            }
        })
    },

    removeItem: function (id: number, callbackSuccess?: (data: any) => void, callbackNegative?: (error: any)=> void) {
        axios.get(`/api/getList/remove/${id}`)
            .then(function (response: any) {
                console.log(response);
                if (callbackSuccess) {
                    callbackSuccess(response.data)
                }
            })
            .catch(function (error: any) {
                console.log(error);
                if (callbackNegative) {
                    callbackNegative(error)
                }
            })
    }
};