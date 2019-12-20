var checkoutHandler = StripeCheckout.configure({
    key: "pk_test_p65fKrYqxsLpaKI22ailyIJA00ZrVKNSEI",
    locale: "auto"
  });


function handleToken(token) {
    const amountInput = document.getElementById('pago')
    const amount = Number(amountInput.value)
    if (amount) {
        axios.post(`/donation/${currentArtist}`, JSON.stringify({...token, amount}), { headers: { "Content-Type": "application/json" } })
          .then(output => {
            if (output.status === "succeeded")
            debugger
              document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
          })
    }
  }


var button = document.getElementById("submit");
button.addEventListener("click", function(ev) {
  checkoutHandler.open({
    name: "ArtCoolT",
    description: "Example Purchase",
    token: handleToken
  });
});