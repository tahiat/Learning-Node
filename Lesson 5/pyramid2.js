var Promise = require("bluebird");
var fs = Promise.promisifyAll(require('fs'));

function load_file_contents2(filename, callback) {

    const errorHandler = (err) => {
        console.log("SO sad!!: " + JSON.springify(err));
        // do any processing on the error
        callback(err);
    };

    fs.openAsync(filename, 'r')
        .then(function (fd) {
            fs.fstatAsync(fd)
                .then(function (stats) {
                    if (stats.isFile()) {
                        let b = new Buffer(stats.size);

                        return fs.readAsync(fd, b, 0, stats.size, null)
                            .then(fs.closeAsync(fd))
                            .then(function () {
                                callback(null, b.toString('utf8', 0, b.size));
                            })
                            .catch(errorHandler);
                    } else {
                        callback(null, null);
                    }
                })
                .catch(errorHandler);
        })
        .catch(errorHandler);
}

load_file_contents2('pyramid2.js', (err, results) => {
    console.log(err);
    console.log(results);
});
