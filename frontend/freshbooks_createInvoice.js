// Create an invoice billed to OHIP

const amount = 77.2;
const expenseName = "General Consultation";
const appointmentDate = "2019-09-30";
let user = "Pdowla";
let invoiceEndpoint =
  "https://api.freshbooks.com/accounting/account/" +
  user +
  "/invoices/invoices";
let phoneNumber = "6471231234";
const ohipEmail = "ohip@ontario.ca";
const customerId = 15536;
let userEmail = "davidli3100@gmail.com"; // hardcoded test user
const invoiceBody = {
  invoice: {
    email: ohipEmail,
    customerid: customerId, // "client" is OHIP (hardcoded value because we only have 1 client rn)
    create_date: appointmentDate,
    lines: [
      {
        type: 0,
        description: phoneNumber,
        taxName1: "",
        taxAmount1: 0,
        name: expenseName,
        qty: 1,
        unit_cost: {
          amount: amount,
          code: "CAD"
        }
      }
    ]
  }
};

const invoiceEmail = {
  invoice: {
    email_subject: user + "sent you an invoice (" + customerId + ')',
    email_recipients: [ohipEmail, userEmail],
    email_body: "",
    action_email: true
  }
};

createInvoice(invoiceEndpoint, invoiceBody)
  .then(data => {
    console.log(data);
    console.log(JSON.stringify(data));
    sendEmail(user, data.response.result.invoice.id, invoiceEmail)
      .then(data => {
        console.log("GoT thIS faR")
        console.log(data);
      })
  }) // JSON-string from `response.json()` call
  .catch(error => console.error(error));

function createInvoice(url = "", data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer ee66e3250c752fe6a21c53e09ecebd0581212ad0cb47002a31f7034c550a77b0"
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then(response => response.json()); // parses JSON response into native JavaScript objects
}

function sendEmail(accountId = "", invoiceId = "", data = {}) {
  return fetch(
    "https://api.freshbooks.com/accounting/account/" +
      accountId +
      "/invoices/invoices/" +
      invoiceId,
    {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer ee66e3250c752fe6a21c53e09ecebd0581212ad0cb47002a31f7034c550a77b0"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
  ).then(response => response.json()); // parses JSON response into native JavaScript objects
}