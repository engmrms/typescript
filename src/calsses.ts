class Department {
  //name: string;
  //private id:string;
  //private employes: string[] = [];
  constructor(
    private readonly id: string,
    public name: string,
    protected employes: string[] = []
  ) {}

  describe() {
    console.log(`${this.name} ,id:${this.id}`);
  }

  addEmployee(employ: string) {
    this.employes.push(employ);
  }
  printOut() {
    console.log(this.employes);
  }
}

class ITDepartment extends Department {
  constructor(id: string, admins: string[]) {
    super(id, "IT");
  }
  printOut() {
    console.log(this.employes.length);
    console.log(this.employes);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;
  private constructor(id: string, private reports: string[] = []) {
    super(id, "Accounting");
    this.lastReport = "";
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new AccountingDepartment(
        `#${Math.floor(Math.random() * 10000)}`
      );
    }
    return this.instance;
  }
  AddReport(report: string) {
    this.reports.push(report);
  }
  printReport() {
    console.log(this.reports.length);
    console.log(this.reports);
  }

  get mostREcentlyReport() {
    if (this.lastReport) return this.lastReport;
    else throw "Erors";
  }
  set mostREcentlyReport(value: string) {
    if (value) this.lastReport = value;
    else throw "Errors";
  }
}

const depart = new Department(
  `#${Math.floor(Math.random() * 10000)}`,
  "Default"
);

depart.describe();
depart.addEmployee("Mohammad");
depart.addEmployee("Samer");
//depart.employes.push("jameel");
depart.printOut();

const it = new ITDepartment(`#${Math.floor(Math.random() * 10000)}`, [
  "mohammad",
]);

it.describe();
it.addEmployee("Mohammad");
it.addEmployee("jameel");
it.addEmployee("Samer");

it.printOut();
console.log(it);
// const accounting = new AccountingDepartment(
//   `#${Math.floor(Math.random() * 10000)}`
// );
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();
const accounting3 = AccountingDepartment.getInstance();

console.log(accounting, accounting2, accounting3);
accounting.describe();
accounting.mostREcentlyReport = "End of the year11111";
accounting.AddReport("End of the year");
accounting.mostREcentlyReport;
accounting.printReport();
