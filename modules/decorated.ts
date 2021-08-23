function Logger(logString: string) {
    console.log("looger Factory");
    return function (constructor: any) {
      console.log("looger REndering");
      console.log(logString);
      const nconst = new constructor();
      console.log("logger function .....");
    };
  }
  
  function WithTemplate(template: string, hookId: string) {
    console.log("Template Factory");
    return function <T extends { new (...args: any[]): { name: string } }>(
      originalConstructor: T
    ) {
      return class extends originalConstructor {
        constructor(..._: any[]) {
          super();
          console.log("template  REndering");
  
          const hokElement = document.getElementById(hookId);
          if (hokElement) {
            hokElement.innerHTML = template;
            hokElement.querySelector("h1")!.textContent = this.name;
          }
        }
      };
    };
  }
  
  @Logger("yes logger string.......")
  @WithTemplate("<h1>my Template</h1>", "app")
  class Persons {
    public name: string = "max";
    constructor() {
      console.log(".... the inititation of class");
    }
  }
  
  // const pres = new Persons();
  
  function Log(target: any, name: string | symbol) {
    console.log("proport decorated");
    console.log(target);
    console.log(name);
  }
  
  function Log2(
    target: any,
    name: string | symbol,
    descreptor: PropertyDescriptor
  ) {
    console.log("set decorated");
    console.log(target);
    console.log(name);
    console.log(descreptor);
  }
  function Log3(
    target: any,
    name: string | symbol,
    descreptor: PropertyDescriptor
  ) {
    console.log("method decorated");
    console.log(target);
    console.log(name);
    console.log(descreptor);
  }
  function Log4(target: any, name: string | symbol, position: number) {
    console.log("paramter decorated");
    console.log(target);
    console.log(name);
    console.log(position);
  }
  
  class Product {
    @Log
    title: string;
    private _price: number;
    constructor(t: string, p: number) {
      this.title = t;
      this._price = p;
    }
    @Log2
    set price(value: number) {
      value = this._price;
    }
    @Log3
    getPriceTax(@Log4 tax: number) {
      return this.price * (1 + tax);
    }
  }
  
  function Autobind(
    target: any,
    methodName: string,
    descrptor: PropertyDescriptor
  ) {
    const originalMethod = descrptor.value;
    const asjDescrptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return asjDescrptor;
  }
  
  class Print {
    message = "This is work!!!";
  
    @Autobind
    showMessage() {
      console.log(this);
      console.log(this.message);
    }
  }
  
  const pr = new Print();
  pr.showMessage();
  
  const btn = document.querySelector("button")!;
  btn.addEventListener("click", pr.showMessage);
  
  /****/
  
  interface validatorConfig {
    [property: string]: {
      [validatorProp: string]: string[];
    };
  }
  
  const registerValidation: validatorConfig = {};
  
  function Test(target: any, propName: string) {
    registerValidation[target.constructor.name] = {
      ...registerValidation[target.constructor.name],
      [propName]: [
        ...(registerValidation[target.constructor.name]?.[propName] ?? []),
        "required",
      ],
    }; 
  }
  function Positive(target: any, propName: string) {
    registerValidation[target.constructor.name] = {
      ...registerValidation[target.constructor.name],
      [propName]: [
        ...(registerValidation[target.constructor.name]?.[propName] ?? []),
        "positive",
      ],
    };
  }
  function validate(obj: any) {
    const objValidator = registerValidation[obj.constructor.name];
    let invalid = true;
    if (!objValidator) return true;
  
    for (const prop in objValidator) {
      for (const validItem of objValidator[prop]) {
        switch (validItem) {
          case "required":
            invalid = invalid && !!obj[prop];
            break;
          case "positive":
            invalid = invalid && obj[prop] > 0;
            break;
        }
      }
    }
    return invalid;
  }
  
  class Course {
    @Test
    title: string;
    @Positive
    price: number;
    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  }
  
  const formEl = document.querySelector("form")!;
  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleEl = document.getElementById("title") as HTMLInputElement;
    const priceEl = document.getElementById("price") as HTMLInputElement;
    const title = titleEl.value;
    const price = +priceEl.value;
  
    const createCourse = new Course(title, price);
    if (!validate(createCourse)) {
      alert("Invalid Form");
      return;
    }
    console.log(createCourse);
  });
  