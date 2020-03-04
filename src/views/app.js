import { LitElement, html } from "lit-element";
import { styleApp } from "./styleApp";
import './sendTransactionComponent/sendTransactionComponent.js'

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
    };
  }

  constructor() {
    super();
    this.accounts = [];

    this.accounts = [...this.accounts, account];
    this.balance = account.balance;
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
            <send-transaction-row .account=${this.accounts}></send-transaction-row>
        </div>
      </div>
    `;
  }
}

customElements.define("accounts-root", Accounts);
