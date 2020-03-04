import { LitElement, html } from "lit-element";
import { styleApp } from "./styleApp";
import './sendTransactionComponent/sendTransactionComponent.js';
import './accountsContentComponent/accountsContentComponent.js';

class Accounts extends LitElement {

  //didn't get the styles to work for the accountsContentComponent. Still needed to figure that out
  static get styles() {
    return styleApp;
  }

  static get properties() {
    return {
      accountNr: String,
      accounts: { type: Array }
    };
  }

  constructor() {
    super();
    this.accountNr = 'NL78INGB7209131833';
    this.accounts = [];

    this.accounts.push({ "accountNr": this.accountNr, "balance": 0 });
  }

  render() {
    return html`
      <div class="my-accounts">
        <div class="title">
          My accounts
        </div>
        <div class="accounts-content">
          <accounts-content-component .accounts=${this.accounts} .accountNr=${this.accountNr}></accounts-content-component>
          <send-transaction-row .accountNr=${this.accountNr}></send-transaction-row>
        </div>
      </div>
    `;
  }
}

customElements.define("accounts-root", Accounts);
