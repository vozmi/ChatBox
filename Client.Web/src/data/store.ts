import {injectable} from "inversify";
import { makeObservable, observable } from "mobx";

@injectable()
export class Store {
	@observable
	public user: string | null = null;

	constructor() {
		makeObservable(this);
	}
}
