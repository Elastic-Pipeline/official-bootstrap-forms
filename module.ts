import { Module, ModuleManager } from "../../API/Modules/Module";
import fs from "fs";
import path from "path";

class BaseModule extends Module
{
    constructor()
    {
        super("Official Bootstrap Form Wrapper", fs.readFileSync(path.resolve(__dirname, "./version.txt")).toString("utf-8"));
    }
}

ModuleManager.RegisterModule(new BaseModule());