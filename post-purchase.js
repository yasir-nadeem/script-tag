console.log("Executing post puchase script");

function filterFreeProduct(htmlElement) {
  return htmlElement.textContent.trim().toLowerCase().includes("free")
}

function updateOrderStatusPage() {
  const REFRESH_TIME_MS = 1000 * 5;
  // if (Shopify?.checkout?.credit_card != null) {
    // if user navigates to a new post puchase page
    if (!window.location.hash.includes("updated")) {
      // queue a timeout to refresh the page in REFRESH_TIME_MS
      setTimeout(() => {
        window.location = window.location + "#updated";
        window.location.reload();
      }, REFRESH_TIME_MS);

      // Show a message to the user in the meantime (As a buffer for the webhook)
      const pageContent = document.querySelector(".content");

      pageContent.style.visibility = "hidden";

      pageContent.insertAdjacentHTML(
        "beforebegin",
        `<div class="content" style="display: flex;width: 100%;justify-content: center;align-items: center;height: 100%;"><h1>Updating order, please wait...</h1></div>`
      );
    // } else {
    } else if (Array.from($$('.order-summary__emphasis')).filter(filterFreeProduct).length > 0) {
      // otherwise, add complimentary product message to the post purchase page.
      let customerMessage = "A complimentary gift was added to your order!";

      const orderHeader = document.getElementById("main-header").parentElement;

      const headingElement = document.getElementById("main-header").cloneNode();

      headingElement.style.color = "#e9206c";
      headingElement.style.fontSize = "18px";

      headingElement.innerText = customerMessage;

      orderHeader.appendChild(headingElement);
    }
  // }
}

updateOrderStatusPage();