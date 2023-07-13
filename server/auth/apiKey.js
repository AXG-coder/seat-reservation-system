const authKey = (permissions) => {
    return async (req, res, next) => {
        const apiKey = await req.headers.key
        if (permissions === apiKey) {
            next()
        } else if (process.env.ADMIN_KEY === apiKey) {
            next()
        } else {
            res.status(401).json("not auth")
        }
    }
}

module.exports = { authKey }