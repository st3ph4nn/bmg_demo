import { LitElement, html } from "lit-element";

class sendTransactionComponent extends LitElement {

  static get properties() {
    return {
      accountNr: String,
      toAccount: String,
      toAmount: Number,
    };
  }

  constructor() {
    super();
    this.accountNr = "";
    this.toAccount = "";
    this.toAmount = 0;
  }

  setToAccount(value) {
    this.toAccount = value;
  }

  setAmount(value) {
    this.toAmount = value;
  }

  sendTransaction() {
    var x = new XMLHttpRequest();
    x.open(
      "POST",
      "http://localhost:8080/transaction",
      true
    );
    x.setRequestHeader("Content-type", "application/json");
    var transaction =
    {
        "fromBankAccount": 
        {
          "bankAccountNr": this.accountNr
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
    `;
  }
}

customElements.define("send-transaction-row", sendTransactionComponent);