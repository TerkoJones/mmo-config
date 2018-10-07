'extrict mode'
const
    fs = require("fs"),
    path = require('path'),
    config = {
        maindir: path.parse(require.main.filename).dir
    };

module.exports = config;

(function () {
    let
        cf = load(path.join(config.maindir, 'mmo.json')),
        env = config.env = cf.env || process.env.NODE_ENV || 'development',
        envs = cf.envs || {};

    delete cf.envs;
    delete cf.env;
    
    extend(config, cf);

    if (typeof envs === 'string') {
        envs = search(envs, env);
    } else {
        envs = envs[env] || {};
    }
    extend(config, envs);
}());

function extend(target, source) {
    let k, it;
    for (k in source) {
        it = source[k];
        if (it !== null && !Array.isArray(it) && typeof it === 'object') {
            target[k] = target[k] || {};
            extend(target[k], it);
        } else {
            target[k] = it;
        }
    }
    return target;
}

function search(dir, env) {
    if (!path.isAbsolute(dir)) dir = path.join(config.maindir, dir);
    return load(path.join(dir, env + '.env.json'));
}

function load(filepath) {
    try {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'))
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
    }
    return {}

}