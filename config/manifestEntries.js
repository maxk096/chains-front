const { version: revision } = require('../package.json')
const fs = require('fs')
const path = require('path')
const paths = require('./paths')
const IMG_FOLDER = '/img'

const getAdditionalManifestEntries = () => {
    const imgPath = path.join(paths.appPublic, IMG_FOLDER)
    console.log('🚀 ~ file: manifestEntries.js ~ line 8 ~ getAdditionalManifestEntries ~ imgPath', imgPath)
    const images = fs.readdirSync(imgPath).map((file) => ({
        url: path.join(IMG_FOLDER, file),
        revision
    }))
    const others = [
        { url: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap', revision }
    ]
    const entries = [...images, ...others]
    return entries
}

module.exports.getAdditionalManifestEntries = getAdditionalManifestEntries
