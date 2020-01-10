import {PageConfig,defaultPage } from "./types"
import "reflect-metadata";

const init_table=(o:PageConfig=defaultPage)=><T extends {new(...args:any[]):{}}>(constructor:T)=>{
    return class extends constructor {
           path=o.path
           title_dict=o.title_dict;
           title=o.title;
           title1=o.title1;
    }
}

function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    let set = descriptor.set;
    descriptor.set = function (value: T) {
        let type = Reflect.getMetadata("design:type", target, propertyKey);
        if (!(value instanceof type)) {
            throw new TypeError("Invalid type.");
        }
        set(value);
    }
}

export {
    init_table,
    validate,
}
