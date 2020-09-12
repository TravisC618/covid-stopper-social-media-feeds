const Twit = require("twit");

const T = new Twit({
    consumer_key: process.env.twit_consumer_key,
    consumer_secret: process.env.twit_consumer_secret,
    access_token: process.env.twit_access_token,
    access_token_secret: process.env.twit_access_token_secret,
});

const getWHOTwitter = async (req, res) => {
    await T.get(
        "statuses/user_timeline",
        { screen_name: "WHO", count: 10 },
        function (err, data, response) {
            if (err) {
                return res.status(400).send(err);
            }
            const feeds = data.reduce((acc, curr) => {
                const {
                    created_at,
                    text,
                    user: { name, profile_image_url },
                    entities,
                    retweeted_status,
                } = curr;
                let result = {
                    time: created_at,
                    content: text,
                    userName: name,
                    userAvatar: profile_image_url,
                };

                // check whether a retweet
                let urlArr;
                if (retweeted_status) {
                    urlArr = retweeted_status.entities.urls;
                } else {
                    urlArr = entities.urls;
                }
                result = {
                    ...result,
                    url: urlArr[urlArr.length - 1].expanded_url,
                };

                acc.push(result);
                return acc;
            }, []);

            return res.status(200).send(feeds);
        }
    );
};

module.exports = { getWHOTwitter };
