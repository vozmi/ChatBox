import {TYPES} from "@/services/TYPES";
import {fluentProvide} from "inversify-binding-decorators";
import {makeObservable, observable} from "mobx";

@fluentProvide(TYPES.STORE).inSingletonScope().done()
export class Store {
	@observable
	public user: string | null = null;

	constructor() {
		makeObservable(this);
	}
}
