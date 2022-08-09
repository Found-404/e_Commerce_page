function axios(obj) {
    const { type = "GET", port, data = {}, success } = obj
    return new Promise((resolve, reject) => {
        $.ajax({
            type,
            url: "http://localhost:9527/api" + port,
            data,
            success(res) {
                resolve(res)
            },
            error(err) {
                reject(err.status)
            }
        });
    })
}
// axios({
//     type: 'GET',
//     port: '/getTypeOne',
//     data: {

//     },
// }).then((res) => {
//     console.log(res);
// }).catch((err) => {
//    console.log(err);
// })