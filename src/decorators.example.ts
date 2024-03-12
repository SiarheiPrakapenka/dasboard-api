function Component(id: number): Function {
	console.log('init component');
	return (target: Function) => {
		console.log('run component');
		target.prototype.id = id;
	};
}

function Logger(): Function {
	console.log('init logger');
	return (target: Function) => {
		console.log('run logger');
	};
}

function Method(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor): void {
	console.log('Method', propertyKey);
	const oldValue = propertyDescriptor.value;
	propertyDescriptor.value = function (...args: number[]): number {
		return args[0] * 10;
	};
}

function Prop(target: Object, propertyKey: string): void {
	let value: number;

	const getter = (): number => {
		console.log('getter');
		return value;
	};

	const setter = (newValue: number): void => {
		console.log('setter');
		value = newValue;
	};

	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
}

function Param(target: Object, propertyKey: string, index: number): void {
	console.log('Param propertyKey', propertyKey);
	console.log('Param index', index);
}

@Logger()
@Component(1)
export class User {
	@Prop
	id: number;

	@Method
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	updateId(
		@Param
		newId: number,
	) {
		this.id = newId;
		return this.id;
	}
}

console.log(new User().id);
console.log('--------');
console.log(new User().updateId(2));
