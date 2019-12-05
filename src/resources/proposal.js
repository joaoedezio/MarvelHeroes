import requestUtils from "./request";

export default {
  createProposal(idQuota, idClient, token) {
    return requestUtils({
      url: "/sales/proposal",
      method: "POST",
      data: {
        idQuota,
        idClient,
      },
      token,
    });
  },
  createCharge(value, idProposal, creditCard, token) {
    return requestUtils({
      url: "/sales/creditcard/charge",
      method: "POST",
      data: {
        value,
        idProposal,
        creditCard,
      },
      token,
    });
  },
};
