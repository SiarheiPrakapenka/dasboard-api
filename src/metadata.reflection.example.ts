import 'reflect-metadata';

function Test(target: Function): void {
	Reflect.defineMetadata('a', 1, target);
	const meta = Reflect.getMetadata('a', target);
	console.log(meta);
}

function Prop(target: Object, name: string): void {}

@Test
export class C {
	@Prop
	prop: number;
}
