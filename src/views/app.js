import { LitElement, css, html } from "lit-element";

const account = {
  IBAN: "NL78INGB7209131833",
  balance: 10,
};

class Accounts extends LitElement {
  static get styles() {
    return css`
      .my-accounts {
        display: flex;
        margin: 45px 0 0 0;
      }

      .my-accounts .title {
        margin: 0 20px 0 0;
      }

      .my-accounts .accounts-content {
        flex: auto;
      }

      .account {
        cursor: pointer;
        border: 1px solid #cccccc;
        margin: 1px 0;
        padding: 20px;
      }

      .account .account-row {
        align-items: center;
        display: flex;
        justify-content: space-between;
      }

      .account .account-row > * {
        pointer-events: none;
      }

      .account .account-row .IBAN {
        font-size: 28px;
      }

      .account .account-row .balance {
        font-size: 38px;
      }

      .account .transaction {
        display: none;
      }

      .account .transaction {
        border: 1px solid #cccccc;
        padding: 15px;
      }

      .account.is-selected .transaction {
        display: block;
      }

      .transaction-row {
        border: 1px solid #cccccc;
        margin: 1px 0;
        padding: 20px;
      }
    `;
  }

  static get properties() {
    return {
      accounts: { type: Array },
      toAccount: String
    };
  }

  constructor() {
    super();
    this.accounts = [];
    this.toAccount = "";
    this.toAmount = 0;

    this.accounts = [...this.accounts, account];
  }

  getAccount(IBAN) {
    this.accounts.forEach(element => {
      if (element.IBAN == IBAN) {
        return element;
      }
    });
  }

  setAccount(account) {
    this.accounts.forEach(element => {
      if (element.IBAN == account.IBAN) {
        element = account;
      }
    });
  }

  setToAccount(value) {
    this.toAccount = value;
  }

  setAmount(value) {
    this.toAmount = value;
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

  getBalance(IBAN) {
    var x = new XMLHttpRequest();
    var accountElement = this.getAccount(IBAN);
    console.log('getAccount', accountElement);
    x.open(
      "GET",
      "http://localhost:8080/getbalance?bankAccountNr="+IBAN
    );
    x.onload = function() {
      if (x.status >= 200 && x.status < 400) {
        balance = JSON.parse(x.responseText);
        
      }

    };
    x.send();
  }

  sendTransaction() {
    var x = new XMLHttpRequest();
    x.open(
      "GET",
      "http://localhost:8080/getbalance?bankAccountNr="+account.IBAN
    );
    var jsonResponse;
    x.onload = function(e) {
      jsonResponse = JSON.parse(x.responseText);
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
                  <div class="balance" @value=${account.balance} @change=${this.getBalance(account.IBAN)} >
                    &euro;${account.balance}
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
