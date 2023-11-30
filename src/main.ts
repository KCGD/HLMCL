import * as fs from 'fs';
import * as path from "path";
import * as process from "process";


//debug lib imports
import { Log } from './lib/util/debug';


//define process args type
export type processArgs = {
    showHelpDoc:boolean;
    debug:boolean;
}
//define object for process arguments
export var ProcessArgs:processArgs = {
    "showHelpDoc":false,
    "debug":true,
}


//parse process arguments
for(let i = 0; i < process.argv.length; i++) {
    switch(process.argv[i]) {
        case "--help":
        case "-h": {
            ProcessArgs.showHelpDoc = true;
        } break;
    }
}


//main function
Main();
function Main(): void {
    if(ProcessArgs.showHelpDoc) {
        console.log(fs.readFileSync("./src/assets/helpdoc").toString());
        process.exit(0);
    }
}
