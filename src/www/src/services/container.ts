import "reflect-metadata";
// reflect-metadata - first
import {Container} from "inversify";
import {buildProviderModule} from "inversify-binding-decorators";
import "./load-modules";

const DIcontainer = new Container();

DIcontainer.load(buildProviderModule());

export {DIcontainer};
    