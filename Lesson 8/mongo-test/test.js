const async = require('async');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/photo-app';
let db;

let pix = [
    {
        filename: "picture_01.jpg",
        albumid: "italy2012",
        description: "rome!",
        date: "2012/02/15 16:20:40"
    },
    {
        filename: "picture_04.jpg",
        albumid: "italy2012",
        description: "fontana di trevi",
        date: "2012/02/19 16:20:40"
    },
    {
        filename: "picture_02.jpg",
        albumid: "italy2012",
        description: "it's the vatican!",
        date: "2012/02/17 16:35:04"
    },
    {
        filename: "picture_05.jpg",
        albumid: "italy2012",
        description: "rome!",
        date: "2012/02/19 16:20:40"
    },
    {
        filename: "picture_03.jpg",
        albumid: "italy2012",
        description: "spanish steps",
        date: "2012/02/18 16:20:40"
    },

    {
        filename: "photo_05.jpg",
        albumid: "japan2010",
        description: "something nice",
        date: "2010/06/14 12:21:40"
    },
    {
        filename: "photo_01.jpg",
        albumid: "japan2010",
        description: "tokyo tower!",
        date: "2010/06/11 12:20:40"
    },
    {
        filename: "photo_06.jpg",
        albumid: "japan2010",
        description: "kitty cats",
        date: "2010/06/14 12:23:40"
    },
    {
        filename: "photo_03.jpg",
        albumid: "japan2010",
        description: "kyoto is nice",
        date: "2010/06/12 08:50:40"
    },
    {
        filename: "photo_04.jpg",
        albumid: "japan2010",
        description: "eating suhi",
        date: "2010/06/12 08:34:40"
    },
    {
        filename: "photo_02.jpg",
        albumid: "japan2010",
        description: "osaka!",
        date: "2010/06/12 07:44:40"
    },
    {
        filename: "photo_07.jpg",
        albumid: "japan2010",
        description: "moo cow oink pig woo!!",
        date: "2010/06/15 12:55:40"
    },

    {
        filename: "photo_001.jpg",
        albumid: "australia2010",
        description: "sydney!",
        date: "2010/10/20 07:44:40"
    },
    {
        filename: "photo_002.jpg",
        albumid: "australia2010",
        description: "asdfasdf!",
        date: "2010/10/20 08:24:40"
    },
    {
        filename: "photo_003.jpg",
        albumid: "australia2010",
        description: "qwerqwr!",
        date: "2010/10/20 08:55:40"
    },
    {
        filename: "photo_004.jpg",
        albumid: "australia2010",
        description: "zzzxcv zxcv",
        date: "2010/10/21 14:29:40"
    },
    {
        filename: "photo_005.jpg",
        albumid: "australia2010",
        description: "ipuoip",
        date: "2010/10/22 19:08:40"
    },
    {
        filename: "photo_006.jpg",
        albumid: "australia2010",
        description: "asdufio",
        date: "2010/10/22 22:15:40"
    }
];

let a1 = {
    _id: "italy2012",
    name: "italy2012",
    title: "Visiting Italy in 2012",
    description: "This was a very nice trip ...",
    date: "2012-05-12"
};

let a2 = {
    _id: "australia2010",
    name: "australia2010",
    title: "Australia wedding!",
    description: "Lovely time there  ...",
    date: "2010-10-20"
};

let a3 = {
    _id: "japan2010",
    name: "japan2010",
    title: "A trip to Kyoto and Tokyo",
    description: "What a funcountry!",
    date: "2010-04-15"
};

let albumsCollection, photosCollection;

async.waterfall([

    function (callback) {
        MongoClient.connect(
            url,
            {
                poolSize: 100,
                w: 1                // write concern - confirm 1 write to db succeeded
            }, (err, database) => {

                if (err) {
                    console.log('ERROR: Failed to connect to database');
                    process.exit(-1);
                }

                console.log('Connected to Mongo');

                db = database;

                callback(null);
            });
    },

    function (callback) {
        db.collection('albums', callback);
    },

    function (albums, callback) {
        albumsCollection = albums;
        db.collection('photos', callback);
    },

    function (photos, callback) {
        photosCollection = photos;
        callback(null);
    },

    function (callback) {
        albumsCollection.insertMany([a1, a2, a3], callback);
    },

    function (inserted, callback) {
        console.log('Inserted albums!');
        photosCollection.insertMany(pix, callback);
    },

    function (inserted, callback) {
        console.log('Inserted photos!');

        // Perform update
        photosCollection.updateOne({
            filename: 'photo_003.jpg',
            albumid: 'australia2010'
        }, {
            $set: {description: 'Look at them kangaroos!'}
        }, callback);
    },

    function (results, callback) {
        // let cursor = albumsCollection.find();

        // 1. All documents
        // cursor.toArray(callback);

        // 2. Each document
        // cursor.each((err, document) => {
        //     if (err) {
        //         callback(err);
        //     } else if (!document) {
        //         callback(null)
        //     } else {
        //         console.log(document)
        //     }
        // });

        // 3. Use cursor as a stream
        // cursor.on('data', (document) => {
        //     console.log(document);
        // });
        //
        // cursor.on('error', callback);
        //
        // cursor.on('end', () => {
        //     callback(null);
        // });

        // 4. Find by specific fields
        // let cursor = photosCollection.find({ albumid: 'italy2012', filename: 'picture_02.jpg' });
        //
        // cursor.on('data', (document) => {
        //     console.log(document);
        // });
        //
        // cursor.on('error', callback);
        //
        // cursor.on('end', () => {
        //     callback(null);
        // });

        // 5. Find by regular expression
        // let cursor = albumsCollection.find({ date: { $regex: /^2010/ }});
        //
        // cursor.on('data', (document) => {
        //     console.log(document);
        // });
        //
        // cursor.on('error', callback);
        //
        // cursor.on('end', () => {
        //     callback(null);
        // });

        // 6. Sort by ascending values (descending uses -1), skip first 3, limit to 3 documents
        let cursor = photosCollection.find({albumid: 'italy2012'})
            .sort({filename: 1})
            .skip(3)
            .limit(3);

        cursor.on('data', (document) => {
            console.log(document);
        });

        cursor.on('error', callback);

        cursor.on('end', () => {
            callback(null);
        });
    }

], function (err, results) {
    console.log(`Done!`);
    console.log(err);
    console.log(results);

    db.close();
});