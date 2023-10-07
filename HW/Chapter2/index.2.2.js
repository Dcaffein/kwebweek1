const fs = require('fs');
const util = require('util');
const path = require('path');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const isDirectory = async (route) => {
    try {
        const stats = await stat(route);
        return stats.isDirectory();
    } catch(err) {
        console.log(`err in isDirectory(${route})`);
    }
}

const readDir = async (route) => {
    try {
        const files = await readdir(route);
        return files;
    } catch (err) {
        console.error(`err in readDir(${route})`);
    }
}

const traverse = async (route) => {
    const files = await readDir(route);

    for(const file of files){
        const updatedRoute = path.join(route,file)
        const isFile = !(await isDirectory(updatedRoute));
        
        if(isFile) {
            if(path.extname(file)=='.js'){
                console.log(path.join(updatedRoute));
            }
        }
        else {
            await traverse(updatedRoute)
        }
    }
}

traverse('test');
