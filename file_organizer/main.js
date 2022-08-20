#!/usr/bin/env Node

let helpobj = require('./help');
let organizeobj = require('./organize');
let treeobj = require('./tree');


let input = process.argv.slice(2);

let command = input[0]
let path = input[1];


switch(command){
    case "tree":
        treeobj.treefunction(path);
        break;
    case "organize":
        organizeobj.organizefunction(path);
        break;
    case "help":
        helpobj.helpfunction();
        break;
    default:
        console.log(`
            Invalid input
            Check Help for List of Valid Commands
        `);
        break;
}
