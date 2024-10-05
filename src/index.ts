class Account {
    accountNumber : number;
    balance : number;
    transactionHistory : string[]
    constructor(accountNumber : number,balance : number = 0){
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.transactionHistory = [];
    }

    deposit (amount : number) : void {
        this.balance += amount;
        this.transactionHistory.push(`Deposit ${amount} new balance ${this.balance}`)
        console.log(`Deposit ${amount} new balance ${this.balance}`);        
    }

    withdraw (amount : number) : void {
        if(amount > this.balance){
            console.log(`Insufficient amount in you bank account ${this.balance}`);
            this.transactionHistory.push(`Failed withdrawal of ${amount} , insufficient funds `)
        } else {
            this.balance -= amount;
            console.log(`debited amount ${amount}`);
            this.transactionHistory.push(`debited ${amount} , balance ${this.balance}`)
        }
    }

    getBalance() : number{
        return this.balance;
    }

    getTransactionHistory() : void {
        console.log(`transaction history for account ${this.accountNumber}`);
        this.transactionHistory.forEach((transaction) => console.log(transaction));
    }
}


class savingAccount extends Account {
    private static interestRate : number = 5
    constructor(accountNumber : number,balance : number = 0){
        super(accountNumber,balance)
    }

    appliyInterest() : void {
        const interest = this.balance * (savingAccount.interestRate / 100);
        this.balance += interest;
        this.transactionHistory.push(`Interest added to the account check out the balance ${this.balance}`);
        console.log(`interest ${interest} applied new balance ${this.balance}`);        
    }
}


class checkingAccount extends Account {
    private static minimumBalance : number = 100;
    constructor(accountNumber : number , balance : number = 0){
        super(accountNumber,balance)
    }

    withdraw(amount : number) : void {
        if(this.balance - amount < checkingAccount.minimumBalance){
            console.log(`can not withdraw min amount dont met`);
            this.transactionHistory.push(`failed transaction min amount doesnt met${this.balance}`)
        } else {
            super.withdraw(amount)
        }
    }
}

class Customer{
    name : string;
    password : string;
    accounts : Account[];
    constructor(name : string, password : string){
        this.name = name;
        this.password = password;
        this.accounts = []
    }

    addAcount(account : Account) : void {
        this.accounts.push(account);
        console.log(`account ${account.accountNumber} connect customer ${this.name}`);
    }

    ownAccount(accountNumber : number) : boolean {
        return this.accounts.some((account) => accountNumber === account.accountNumber)
    }

    authentication(Password : string) : boolean {
        return this.password === Password;
    }
}

class bank {
    private customers : Customer[] = [];
    
    addCustomer(customer : Customer) : void {
        this.customers.push(customer);
        console.log(`customer ${customer.name} added to bank`);
    }

    findCustomer(name : string) : Customer | undefined {
        return this.customers.find((customer) => customer.name === name);
    }

    performOperation(customerName : string , password : string , operation : (customer : Customer) => void) : void {
        const customer = this.findCustomer(customerName);
        if(customer && customer.authentication(password)){
            operation(customer)
        } else {
            console.log("Authentication failed");            
        }
    }
}


const bankk = new bank();

const john = new Customer('john','john12');
const johnCena = new Customer('cena','cena12');

bankk.addCustomer(john);
bankk.addCustomer(johnCena);

const johnAccount = new savingAccount(1,1000);
const johnCenaAccount = new checkingAccount(2,500);

john.addAcount(johnAccount);
johnCena.addAcount(johnCenaAccount);

bankk.performOperation('john','john12', (customer) => {
    if(customer.ownAccount(1)){
        customer.accounts[0].deposit(500);
        customer.accounts[0].getTransactionHistory();
    }
})

bankk.performOperation('cena','cena12', (customer) => {
    if(customer.ownAccount(2)){
        customer.accounts[0].withdraw(100);
        customer.accounts[0].getTransactionHistory();
    }
})