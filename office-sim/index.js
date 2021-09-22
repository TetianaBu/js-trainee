let EMPLOYEES = [];

class Employee {
  constructor({
    id,
    firstName,
    lastName,
    birthday,
    salary,
    position,
    department
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.salary = salary;
    this.position = position;
    this.department = department;
    EMPLOYEES.push(this);
  }

  get age() {
    const now = new Date();
    const fullYears = now.getFullYear() - this.birthday.getFullYear() - 1;
    now.setFullYear(this.birthday.getFullYear());
    return now - this.birthday > 0 ? fullYears + 1 : fullYears;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  quit() {
    EMPLOYEES = EMPLOYEES.filter((x) => x !== this);
  }
  retire() {
    console.log('It was such a pleasure to work with you!');
    EMPLOYEES = EMPLOYEES.filter((x) => x !== this);
  }
  getFired() {
    console.log('Not a big deal!');
    EMPLOYEES = EMPLOYEES.filter((x) => x !== this);
  }
  changeDepartment(newDepartment) {
    this.department = newDepartment;
  }
  changePosition(newPosition) {
    this.position = newPosition;
  }
  changeSalary(newSalary) {
    this.salary = newSalary;
  }

  getPromotedOrDemoted(changes) {
    if (changes.position) {
      this.changePosition(changes.position);
    }
    if (changes.department) {
      this.changeDepartment(changes.department);
    }
    if (changes.salary) {
      this.changeSalary(changes.salary);
    }
  }
  getPromoted(benefits) {
    console.log('Yoohooo!');
    this.getPromotedOrDemoted(benefits);
  }
  getDemoted(punishment) {
    console.log('Damn!');
    this.getPromotedOrDemoted(punishment);
  }

  static get EMPLOYEES() {
    return EMPLOYEES;
  }
}

class Manager extends Employee {
  constructor(data) {
    super(Object.assign({}, data, { position: 'manager' }));
  }

  get managedEmployees() {
    return EMPLOYEES.filter(
      (e) => e.department === this.department && e.position !== 'manager'
    );
  }
}
class SalesManager extends Manager {
  constructor(data) {
    super(Object.assign({}, data, { department: 'sales' }));
  }
}

class BlueCollarWorker extends Employee {}

function ManagerPro(manager) {
  manager.promote = function (employer, benefits) {
    employer.getPromoted(benefits);
  };
  return manager;
}
