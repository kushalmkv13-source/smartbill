// =============================
// REPORT.JS - InvoiceHub
// =============================

document.addEventListener("DOMContentLoaded", async () => {
    function showToast(message){

    const toast = document.getElementById("toast");

    const text = document.getElementById("toastMessage");

    text.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },2000);

}
    let reportData = null;
    let revenueChart = null;

    // -------------------------
    // API Data Loading
    // -------------------------
    async function loadReportData() {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                console.warn("No access token found. Using demo data.");
                return getDemoData();
            }

      const month = document.getElementById("reportMonth")?.value || "";

let url = "http://127.0.0.1:8000/api/reports/dashboard/";

if (month !== "") {
    url += "?month=" + month;
}

const response = await fetch(url, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
});
      const data = await response.json();
      const tbody = document.getElementById("tbody");

tbody.innerHTML = "";

data.monthly_table.forEach(row => {

    tbody.innerHTML += `
        <tr>

            <td>${row.month}</td>

            <td>₹${Number(row.revenue).toLocaleString("en-IN")}</td>

            <td>₹${Number(row.expenses).toLocaleString("en-IN")}</td>

            <td>₹${Number(row.profit).toLocaleString("en-IN")}</td>

            <td>₹${Number(row.gst).toLocaleString("en-IN")}</td>

            <td>${row.growth}</td>

        </tr>
    `;

});

// Revenue
document.getElementById("totalRevenue").innerText =
    "₹" + Number(data.total_revenue).toLocaleString("en-IN");

// Profit
document.getElementById("totalProfit").innerText =
    "₹" + Number(data.total_revenue * 0.72).toLocaleString("en-IN");

// GST Card
const totalGST =
    Number(data.gst_chart.cgst) +
    Number(data.gst_chart.sgst) +
    Number(data.gst_chart.igst);

document.getElementById("totalGST").innerText =
    "₹" + totalGST.toLocaleString("en-IN");

// Growth
document.getElementById("growthRate").innerText = "18%";

// GST Circle Center
document.getElementById("gstTotal").innerText =
    "₹" + totalGST.toLocaleString("en-IN");

// GST Legend
document.getElementById("cgstValue").innerText =
    "₹" + Number(data.gst_chart.cgst).toLocaleString("en-IN");

document.getElementById("sgstValue").innerText =
    "₹" + Number(data.gst_chart.sgst).toLocaleString("en-IN");

document.getElementById("igstValue").innerText =
    "₹" + Number(data.gst_chart.igst).toLocaleString("en-IN");
    document.getElementById("bestMonth").innerText =
    data.best_sales_month;

document.getElementById("topProduct").innerText =
    data.highest_revenue_product;

document.getElementById("topCategory").innerText =
    data.fastest_growing_category;

return data;

        } catch (error) {
            console.error("Unable to load reports:", error);
            return getDemoData();
        }
    }

    // Demo data fallback
    function getDemoData() {
        return {
            revenue_chart: [
                { month: "Jan", amount: 25000 },
                { month: "Feb", amount: 32000 },
                { month: "Mar", amount: 28000 },
                { month: "Apr", amount: 35000 },
                { month: "May", amount: 42000 },
                { month: "Jun", amount: 38000 }
            ],
            gst_chart: {
                cgst: 15000,
                sgst: 12000,
                igst: 18000
            }
        };
    }

    async function getReportData() {
        if (reportData) {
            return reportData;
        }

        reportData = await loadReportData();
        return reportData;
    }

    // -------------------------
    // Reveal Animation
    // -------------------------
    try {
        document.querySelectorAll(".reveal").forEach((el, index) => {
            setTimeout(() => {
                el.classList.add("in");
            }, index * 100);
        });
    } catch (error) {
        console.error("Error in reveal animation:", error);
    }

    // -------------------------
    // Floating Background Tokens
    // -------------------------
    try {
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
    } catch (error) {
        console.error("Error creating floating tokens:", error);
    }

    // -------------------------
    // Revenue Chart
    // -------------------------
    try {
        const revenueCanvas = document.getElementById("revenueChart");

        if (revenueCanvas && typeof Chart !== "undefined") {
            getReportData().then(data => {
                if (!data || !data.revenue_chart) {
                    console.warn("No revenue data available");
                    return;
                }

             const labels = data.monthly_table.map(x => x.month);

const revenue = data.monthly_table.map(x => x.revenue);

const expenses = data.monthly_table.map(x => x.expenses);

const profit = data.monthly_table.map(x => x.profit);
               if (revenueChart) {
    revenueChart.destroy();
}

revenueChart = new Chart(revenueCanvas,{
                    type: "line",
                    data: {
                        labels: labels,
                        datasets: [

{
    label: "Revenue",
    data: revenue,
    borderColor: "#00D4FF",
    backgroundColor: "rgba(0,212,255,0.15)",
    fill: false,
    tension: 0.4,
    borderWidth: 3
},

{
    label: "Expenses",
    data: expenses,
    borderColor: "#FF9800",
    backgroundColor: "rgba(255,152,0,0.15)",
    fill: false,
    tension: 0.4,
    borderWidth: 3
},

{
    label: "Profit",
    data: profit,
    borderColor: "#00E676",
    backgroundColor: "rgba(0,230,118,0.15)",
    fill: false,
    tension: 0.4,
    borderWidth: 3
}

]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
    display: true
}
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: "rgba(0, 0, 0, 0.05)"
                                }
                            }
                        }
                    }
                });
            }).catch(error => {
                console.error("Error loading revenue chart:", error);
            });
        }
    } catch (error) {
        console.error("Error initializing revenue chart:", error);
    }



    // -------------------------
    // GST Doughnut Chart
    // -------------------------
    try {
        const gstCanvas = document.getElementById("gstChart");

        if (gstCanvas && typeof Chart !== "undefined") {
            getReportData().then(data => {
                if (!data || !data.gst_chart) {
                    console.warn("No GST data available");
                    return;
                }

                new Chart(gstCanvas, {
                    type: "doughnut",
                    data: {
                        labels: ["CGST", "SGST", "IGST"],
                        datasets: [
                            {
                                data: [
                                    data.gst_chart.cgst,
                                    data.gst_chart.sgst,
                                    data.gst_chart.igst
                                ],
                                backgroundColor: [
                                    "#00D4FF",
                                    "#0A84FF",
                                    "#4DA3FF"
                                ],
                                borderColor: "#fff",
                                borderWidth: 2
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        cutout: "70%",
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }).catch(error => {
                console.error("Error loading GST chart:", error);
            });
        }
    } catch (error) {
        console.error("Error initializing GST chart:", error);
    }

    // -------------------------
    // Initialize Report Data
    // -------------------------
  getReportData().catch(error => {
    console.error("Fatal error loading report data:", error);
});

// ======================
// Search Button
// ======================

const searchBtn = document.getElementById("searchReport");

if (searchBtn) {

    searchBtn.addEventListener("click", () => {

        reportData = null;

        location.reload();

    });

}


// ======================
// Back to Dashboard
// ======================

const dashboardBtn = document.getElementById("dashboardBtn");

console.log("Dashboard Button =", dashboardBtn);

if (dashboardBtn) {

    dashboardBtn.addEventListener("click", function () {


setTimeout(() => {

    window.location.href = "dashboard.html";

},300);

    });

}
// =========================
// Report Tabs
// =========================

const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {

    tab.addEventListener("click", async function () {

        tabs.forEach(t => t.classList.remove("active"));

        this.classList.add("active");

        const type = this.dataset.tab;

        const tbody = document.getElementById("tbody");

        tbody.innerHTML = "";

        const data = await getReportData();

        data.monthly_table.forEach(row => {

            if(type === "sales"){

                tbody.innerHTML += `
                <tr>
                    <td>${row.month}</td>
                    <td>₹${Number(row.revenue).toLocaleString("en-IN")}</td>
                    <td>₹${Number(row.expenses).toLocaleString("en-IN")}</td>
                    <td>₹${Number(row.profit).toLocaleString("en-IN")}</td>
                    <td>₹${Number(row.gst).toLocaleString("en-IN")}</td>
                    <td>${row.growth}</td>
                </tr>
                `;
            }

            else if(type === "revenue"){

                tbody.innerHTML += `
                <tr>
                    <td>${row.month}</td>
                    <td colspan="5">
                        Revenue :
                        <b>₹${Number(row.revenue).toLocaleString("en-IN")}</b>
                    </td>
                </tr>
                `;
            }

            else if(type === "gst"){

                tbody.innerHTML += `
                <tr>
                    <td>${row.month}</td>
                    <td colspan="5">
                        GST :
                        <b>₹${Number(row.gst).toLocaleString("en-IN")}</b>
                    </td>
                </tr>
                `;
            }

        });

    });

});
// =====================
// Print Report
// =====================

const printBtn = document.getElementById("printBtn");

if (printBtn) {

    printBtn.addEventListener("click", () => {

        window.print();

    });

}
// =============================
// Export to Excel
// =============================

const exportBtn = document.getElementById("exportBtn");

if (exportBtn) {

    exportBtn.addEventListener("click", async () => {

        const data = await getReportData();

        const rows = data.monthly_table.map(row => ({
            Month: row.month,
            Revenue: row.revenue,
            Expenses: row.expenses,
            "Net Profit": row.profit,
            GST: row.gst,
            Growth: row.growth
        }));

        const worksheet = XLSX.utils.json_to_sheet(rows);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Monthly Report"
        );

        XLSX.writeFile(
            workbook,
            "InvoiceHub_Report.xlsx"
        );

    });

}
    });



