module.exports = {
    cekUser(req, res, next) {
        try {
            const decoded = jwt.verify(req.headers.token, 'wrong-secret');
            Favorite
                .findByPk(req.params.id)
                .then(data => {
                    if (data.user._id === decoded._id) {
                        next();
                    } else {
                        throw 'Bukan user yang terauthorasi'
                    }
                })
                .catch(err => {
                    res
                        .status(500)
                })

        } catch (err) {
            throw err
        }


    }
}