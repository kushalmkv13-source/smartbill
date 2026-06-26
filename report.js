// =============================
// REPORT.JS - InvoiceHub
// =============================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------
    // Reveal Animation
    // -------------------------
    document.querySelectorAll(".reveal").forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("in");
        }, index * 100);
    });

    // -------------------------
    // Floating Background Tokens
    // -------------------------
    const tokens = document.getElementById("tokens");

    if (tokens) {
        const words = [
            "GST",
            "₹",
            "Invoice",
            "Sales",
            "Profit",
            "Revenue",
            "CGST",
            "SGST",
            "IGST"
        ];

        for (let i = 0; i < 20; i++) {

            const span = document.createElement("span");

            span.className = "float-token";
            span.innerText = words[Math.floor(Math.random() * words.length)];

            span.style.left = Math.random() * 100 + "%";
            span.style.top = Math.random() * 100 + "%";
            span.style.fontSize = (14 + Math.random() * 16) + "px";
            span.style.animationDelay = (Math.random() * 15) + "s";

            tokens.appendChild(span);
        }
    }

    // -------------------------
    // Revenue Chart
    // -------------------------
    const revenueCanvas = document.getElementById("revenueChart");

    if (revenueCanvas && typeof Chart !== "undefined") {

        new Chart(revenueCanvas, {

            type: "line",

            data: {

                labels: [
                    "Apr","May","Jun","Jul",
                    "Aug","Sep","Oct","Nov",
                    "Dec","Jan","Feb","Mar"
                ],

                datasets: [{

                    label: "Revenue",

                    data: [
                        32000,
                        42000,
                        39000,
                        52000,
                        48000,
                        61000,
                        65000,
                        59000,
                        72000,
                        68000,
                        75000,
                        82000
                    ],

                    borderColor: "#00D4FF",

                    backgroundColor: "rgba(0,212,255,.2)",

                    fill: true,

                    tension: .4

                }]

            },

            options: {

                responsive: true,

                plugins: {
                    legend: {
                        display: false
                    }
                }

            }

        });

    }

    // -------------------------
    // GST Doughnut Chart
    // -------------------------
    const gstCanvas = document.getElementById("gstChart");

    if (gstCanvas && typeof Chart !== "undefined") {

        new Chart(gstCanvas, {

            type: "doughnut",

            data: {

                labels: [

                    "CGST",
                    "SGST",
                    "IGST"

                ],

                datasets: [{

                    data: [

                        38880,
                        38880,
                        19440

                    ],

                    backgroundColor: [

                        "#00D4FF",
                        "#0A84FF",
                        "#4DA3FF"

                    ]

                }]

            },

            options: {

                responsive: true,

                cutout: "70%",

                plugins: {

                    legend: {
                        display: false
                    }

                }

            }

        });

    }

    // -------------------------
    // Table Data
    // -------------------------
    const tbody = document.getElementById("tbody");

    if (tbody) {

        const rows = [

            ["April","₹45,000","₹18,000","₹27,000","₹8,100","+12%"],
            ["May","₹52,000","₹20,000","₹32,000","₹9,360","+15%"],
            ["June","₹48,000","₹19,000","₹29,000","₹8,640","+8%"],
            ["July","₹60,000","₹24,000","₹36,000","₹10,800","+18%"],
            ["August","₹58,000","₹22,000","₹36,000","₹10,440","+10%"],
            ["September","₹65,000","₹25,000","₹40,000","₹11,700","+22%"]

        ];

        rows.forEach(row => {

            tbody.innerHTML += `

            <tr>

                <td class="month">${row[0]}</td>

                <td>${row[1]}</td>

                <td>${row[2]}</td>

                <td>${row[3]}</td>

                <td>${row[4]}</td>

                <td class="pos">${row[5]}</td>

            </tr>

            `;

        });

    }

    // -------------------------
    // Export Button
    // -------------------------
    const exportBtn = document.getElementById("exportBtn");

    if (exportBtn) {

        exportBtn.addEventListener("click", () => {

            alert("Export feature will be connected with Django backend.");

        });

    }

    // -------------------------
    // Print Button
    // -------------------------
    const printBtn = document.getElementById("printBtn");

    if (printBtn) {

        printBtn.addEventListener("click", () => {

            window.print();

        });

    }

});