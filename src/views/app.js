import { LitElement, css, html } from "lit-element";
import { styleApp } from "./styleApp";

const account = {
  IBAN: "NL78INGB7209131833",
  balance: 10,
};

class Accounts extends LitElement {
  static get styles() {
    return styleApp;
  }

  static get properties() {
    return {
      accounts: { type: Array },
      balance: Number,
      toAccount: String,
    };
  }

  constructor() {
    super();
    this.accounts = [];
    this.toAccount = "";
    this.toAmount = 0;

    this.accounts = [...this.accounts, account];
    this.balance = account.balance;
  }

  setToAccount(value) {
    this.toAccount = value;
  }

  setAmount(value) {
    this.toAmount = value;
    console.log('amount value after', this.toAmount);
  }

  // TODO: This is somewhat a hack, can be done better
  setSelected(event) {
    var elem = event.target;

    if (
      elem.className != "account" &&
      elem.className != "account is-selected"
    ) {
      elem = elem.parentElement;
    }

    if (elem.className.indexOf("account") > -1) {
      if (elem.className.indexOf("is-selected") > -1) {
        elem.className = "account";
      } else {
        elem.className = elem.className + " is-selected";
      }
    }
  }

  getBalance(element, thisBalance) {
    var x = new XMLHttpRequest();
    x.open("GET", "http://localhost:8080/getbalance?bankAccountNr=" + element.IBAN);
    x.onload = function() {
      if (x.status >= 200 && x.status < 400) {
        var bankAccount = JSON.parse(x.responseText);
        thisBalance = bankAccount.balance;
        return thisBalance;
      }
    };
    x.send();
  }

  sendTransaction() {
    var x = new XMLHttpRequest();
    x.open(
      "POST",
      "http://localhost:8080/transaction",
      true
    );
    x.setRequestHeader("Content-type", "application/json");
    console.log('values are: ', account.IBAN, this.toAccount, this.toAmount);
    var transaction =
    {
        "fromBankAccount": 
        {
          "bankAccountNr": account.IBAN
        },
        "toBankAccount": {
          "bankAccountNr": this.toAccount //"NL67INGB0001359336"
        },
       "amount": this.toAmount,
   }
    x.send(JSON.stringify(transaction));
  }

  render() {
    return html`
      <div class="my-accounts">
        <div class="title">
          My accounts
        </div>
        <div class="accounts-content">
          ${this.accounts.map(
            account => html`
            <div class="account" @click="${this.setSelected}">
              <div class="account-row">
                <div class="IBAN">
                  ${account.IBAN}
                </div>
                <div
                  class="balance"
                  @value=${this.getBalance(account, this.balance)}
                >
                  &euro;${this.balance}
                </div>
              </div>
              <div class="transaction">
                <div class="transaction-row">
                  Show all previous transactions for this bankaccount
                  <!-- TO DO: alle vorige transacties -->
                </div>
              </div>
            </div>
          `
          )}
          <div class="transaction-row">
            Send &euro;
            <input
              type="text"
              value="${this.toAmount}"
              @change="${e => this.setAmount(e.target.value)}"
            />
            to
            <input
              type="text"
              value="${this.toAccount}"
              @change="${e => this.setToAccount(e.target.value)}"
            />

            <button class="send-transaction" @click="${this.sendTransaction}">
              Send transaction
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("accounts-root", Accounts);
