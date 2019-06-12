export class Person {
    private name: string = "ya";
    private age: number = 4;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    walking() {
        return this.name + " is walking";
    }
}
