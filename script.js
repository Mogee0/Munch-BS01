document.addEventListener("DOMContentLoaded", function () {
    function updateTotals() {
        let totalAmount = 0;
        document.querySelectorAll("#invoice-body tr").forEach(row => {
            const quantity = parseFloat(row.querySelector(".quantity").innerText) || 0;
            const price = parseFloat(row.querySelector(".price").innerText) || 0;
            const totalCell = row.querySelector(".total");
            const rowTotal = quantity * price;
            totalCell.innerText = rowTotal.toFixed(2);
            totalAmount += rowTotal;
        });
        document.getElementById("total-amount").innerText = totalAmount.toFixed(2);
        document.getElementById("amount-words").innerText = convertNumberToWords(totalAmount);
        calculateBalance();
    }

    function calculateBalance() {
        const total = parseFloat(document.getElementById("total-amount").innerText) || 0;
        const received = parseFloat(document.getElementById("received").value) || 0;
        const balance = total - received;
        document.getElementById("balance").innerText = balance.toFixed(2);
    }

    function addRow() {
        const tableBody = document.getElementById("invoice-body");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td contenteditable="true">New Product</td>
            <td contenteditable="true" class="quantity">1</td>
            <td contenteditable="true" class="price">0</td>
            <td class="total">0</td>
        `;
        tableBody.appendChild(newRow);
        newRow.querySelectorAll("td").forEach(cell => {
            cell.addEventListener("input", updateTotals);
        });
    }

    function convertNumberToWords(amount) {
        const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        function numberToWords(n) {
            if (n < 20) return words[n];
            if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + words[n % 10] : "");
            if (n < 1000) return words[Math.floor(n / 100)] + " Hundred " + (n % 100 ? numberToWords(n % 100) : "");
            return "";
        }
        return amount === 0 ? "Zero Rupees" : numberToWords(amount) + " Rupees";
    }

    function generatePDF() {
        const elementsToHide = document.querySelectorAll(".hide-on-print, button");
        elementsToHide.forEach(el => el.style.display = "none");
    
        setTimeout(() => {
            window.print();
            elementsToHide.forEach(el => el.style.display = "block");
        }, 200);
    }
    

    function shareInvoice() {
        const companyName = document.getElementById("company-name").innerText;
        const totalAmount = document.getElementById("total-amount").innerText;
        const message = `Invoice from ${companyName}: Total Amount ₹${totalAmount}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    }

    document.getElementById("received").addEventListener("input", calculateBalance);
    document.querySelector("button").addEventListener("click", addRow);
    document.querySelectorAll(".quantity, .price").forEach(cell => {
        cell.addEventListener("input", updateTotals);
    });

    window.generatePDF = generatePDF;
    window.shareInvoice = shareInvoice;

// Update footer styling dynamically
const footer = document.querySelector("footer");
footer.style.textAlign = "center";
footer.style.fontFamily = "'Dancing Script', cursive";
footer.style.color = "blue";
footer.style.fontWeight = "bold";
});
