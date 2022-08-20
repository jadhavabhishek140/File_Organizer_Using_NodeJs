
let fs = require('fs');
let path = require('path');

let filetypes = {
    media : ["mp4","mp3","mkv"],
    archieves : ["zip","7z","rar","tar","gz","ar","iso","xz"],
    documents : ["docx","doc","pdf","xlsx","xls","odt","obs","odp","odg","odf","txt","ps","tex"],
    app : ["exe","dmg","pkg","deb", "apk"],
    pictures : ["png","jpg","jpeg"]
}

function organizefunction(srcpath){

    let destinationPath;

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
            destinationPath = path.join(srcpath, "Organized_Folder");

            if(!fs.existsSync(destinationPath))
                fs.mkdirSync(destinationPath);

            
        }
        else{
            console.log(`
                !!!INCORRECT PATH ENTERED!!!
                Please Enter Valid Path
            `)
            return;
        }
    }
    organizehelper(srcpath, destinationPath);
}

function organizehelper(src, dest){
    let filenames = fs.readdirSync(src);

    for(let i in filenames){

        let fileAdress = path.join(src, filenames[i]);
        
        if(fs.lstatSync(fileAdress).isFile()){
            let category = getfilecategory(filenames[i]);
            // console.log(filenames[i] + " Belongs to " +category);

            movefile(fileAdress, dest, category);
        }
    }

}

function getfilecategory(filename){
    let extension = path.extname(filename);
    extension = extension.slice(1);

    for(let subarray in filetypes){
        let subtypes = filetypes[subarray];

        for(let types in subtypes){
            if(extension == subtypes[types]){
                return subarray;
            }
        }
    }
    return "other";
}

function movefile(src, dest, category){
    let destfolder = path.join(dest, category);
    if(!fs.existsSync(destfolder)){
        fs.mkdirSync(destfolder);
    }
    let destfilename = path.basename(src);
    let destfilepath = path.join(destfolder, destfilename);
    fs.copyFileSync(src, destfilepath);
    fs.unlinkSync(src);
    console.log(destfilename + " Moved From \n" + src + "    to \n" + destfolder + "\n");
}

module.exports = {
    organizefunction : organizefunction
}