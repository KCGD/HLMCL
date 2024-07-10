import * as fs from 'fs';
import * as path from "path";
import * as process from "process";


//debug lib imports
import { Log } from './lib/util/debug';

//rom import
export const rom = require('./rom.js');

//define process args type
export type processArgs = {
    showHelpDoc: boolean;
    debug: boolean;
    printLicense: boolean;
}
//define object for process arguments
export var ProcessArgs:processArgs = {
    "showHelpDoc": false,
    "debug": true,
    "printLicense": false
}


//parse process arguments
for(let i = 0; i < process.argv.length; i++) {
    switch(process.argv[i]) {
        case "--help":
        case "-h": {
            ProcessArgs.showHelpDoc = true;
        } break;

        case "--license": {
            ProcessArgs.printLicense = true;
        }
    }
}


//main function
Main();
function Main(): void {
    if(ProcessArgs.showHelpDoc) {
        rom.readFile("src/assets/helpdoc", (err:any, res:any) => {
            console.log(res.toString());
            process.exit(0);
        })
    }

    /**
     * Print license if --license flag passed
     */
    if(ProcessArgs.printLicense) {
        rom.readFile("LICENSE", (err:any, res:any) => {
            console.log(res.toString());
            process.exit(0);
        })
    }
}
