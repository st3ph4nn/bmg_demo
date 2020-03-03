import { css } from "lit-element";

export const styleApp = css`
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
