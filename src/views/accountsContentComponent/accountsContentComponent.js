import { LitElement, html } from "lit-element";

class accountsContentComponent extends LitElement {
  static get properties() {
    return {
      accounts: { type: Array },
      accountNr: String,
      balance: Number,
    };
  }

  constructor() {
    super();
    this.accounts = [];
    this.accountNr = "";
    this.balance = 0;
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

  async getBalance() {
    fetch("http://localhost:8080/getbalance?bankAccountNr="+this.accountNr)
    .then((response) => {
        return response.json();
    }).then( (data) => {
        for (let index = 0; index < this.accounts.length; index++) {
            if (data.bankAccountNr == this.accounts[index].accountNr) {
                this.accounts[index].accountNr = data.bankAccountNr;
                this.accounts[index].balance = data.balance;
                this.balance = data.balance;
            }
        }
    })
}

  render() {
    return html`
    ${this.accounts.map(
        elementAccount => html`
        <div class="account" @click="${this.setSelected}">
          <div class="account-row">
            <div class="IBAN">
              ${elementAccount.accountNr}
            </div>
            <div
              class="balance"
              @value=${this.getBalance()}
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
    `;
  }
}

customElements.define("accounts-content-component", accountsContentComponent);