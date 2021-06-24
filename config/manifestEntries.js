const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const paths = require('./paths')
const IMG_FOLDER = '/img'

const getAdditionalManifestEntries = () => {
    const imgPath = path.join(paths.appPublic, IMG_FOLDER)
    const images = fs.readdirSync(imgPath).map((file) => {
        const filePath = path.join(paths.appPublic, IMG_FOLDER, file)
        const fileData = fs.readFileSync(filePath)
        const fileChecksum = generateImageChecksum(fileData)
        return {
            url: path.join(IMG_FOLDER, file),
            revision: fileChecksum
        }
    })
    const entries = [...images]
    return entries
}

const generateImageChecksum = (str) => {
    return crypto.createHash('md5').update(str, 'utf8').digest('hex')
}

module.exports.getAdditionalManifestEntries = getAdditionalManifestEntries
