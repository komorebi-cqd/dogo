import { ElNotification } from 'element-plus';

export const web3Send = async ({ currentContract, paramter, sendValue, methodName }) => {
    return new Promise((resolve, reject) => {
        console.log(...paramter, methodName, "web3Send");
        currentContract.methods[methodName](...paramter).send({ ...sendValue })
            .on('confirmation', async (confirmationNumber, receipt) => {
                if (confirmationNumber < 1 && receipt.status) {
                    ElNotification({
                        title: 'Success',
                        message: 'Success',
                        type: 'success'
                    })
                    resolve(true)
                }
            })
            .on('error', error => {
                if (error.code === 4001) {
                    ElNotification({
                        title: 'Error',
                        message: 'The user rejected the request',
                        type: 'error'
                    })
                } else {
                    ElNotification({
                        title: 'Error',
                        message: 'Purchase failed, please try again later',
                        type: 'error'
                    })
                }
                console.log(error, 'buy error')
                reject(false)
            })
    })
}
