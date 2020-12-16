let mysqlConn = require('./connection');
const userModel = {
    // 通过email获取验证码
    queryVerificationCode: function (email) {
        let promiseObj = new Promise(function(resolve, reject) {
            let sql = "select * from user_email_active where `email`='"+email+"'";
            mysqlConn.query(
                sql,
                function selectCb(err, results, fields) {
                    // resolve({
                    //     err: err,
                    //     results: results,
                    //     fields: fields
                    // });
                    resolve(results[0].verify_code)
                }
            );
        });

        return promiseObj;
    }
}
module.exports = userModel;
