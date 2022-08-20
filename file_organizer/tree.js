let fs = require('fs');
let path = require('path');

function treefunction(srcpath){
    if(srcpath == undefined){
        console.log(`
            !!!PATH NOT FOUND!!!
            Please Enter Valid Path
        `)
        return;
    } 
    else{
        let doesExist = fs.existsSync(srcpath);
        if(doesExist){
            treehelper(srcpath, "");
        }
        else{
            console.log(`
                !!!INCORRECT PATH ENTERED!!!
                Please Enter Valid Path
            `)
            return;
        }
    }
}

function treehelper(src, indent){
    if(fs.lstatSync(src).isFile()){
        let filename = path.basename(src);
        console.log(indent + "|---- " + filename);
    }
    else{
        let directoryname = path.basename(src);
        console.log(indent + "|_____" + directoryname);

        let files = fs.readdirSync(src);
        for(let i in files){
            let filepath = path.join(src, files[i]);
            treehelper(filepath, indent + "\t");
        }
    }
}

module.exports = {
    treefunction : treefunction
}
