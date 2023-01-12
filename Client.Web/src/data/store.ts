import { makeObservable, observable } from "mobx";

export class Store {
	@observable
	public user: string | null = null;

	constructor() {
		makeObservable(this);
	}
}
