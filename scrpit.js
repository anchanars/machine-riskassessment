let gaugeChart;
let barChart;

function calculate() {

    const functionScore = parseFloat(document.getElementById("function").value);
    const riskScore = parseFloat(document.getElementById("risk").value);
    const conditionScore = parseFloat(document.getElementById("condition").value);
    const installDate = new Date(document.getElementById("installDate").value);

    const today = new Date();
    const years = Math.floor((today - installDate) / (365.25 * 24 * 60 * 60 * 1000));

    let timeScore = 1;

    if (years <= 8) timeScore = 1;
    else if (years <= 12) timeScore = 2;
    else if (years <= 16) timeScore = 3;
    else if (years <= 20) timeScore = 4;
    else timeScore = 5;

    const agingIndex =
        (0.30 * timeScore) +
        (0.35 * conditionScore) +
        (0.15 * riskScore) +
        (0.20 * functionScore);

    let status = "";
    let color = "";

    if (agingIndex <= 2) {
        status = "Healthy";
        color = "green";
    } else if (agingIndex <= 2.5) {
        status = "Monitor";
        color = "gold";
    } else if (agingIndex <= 3.5) {
        status = "Plan Replacement";
        color = "orange";
    } else {
        status = "Urgent Replacement";
        color = "red";
    }

    const statusBox = document.getElementById("statusBox");
    statusBox.innerHTML = "Status: " + status + " (AI=" + agingIndex.toFixed(2) + ")";
    statusBox.style.background = color;
    statusBox.style.color = "white";

    renderGauge(agingIndex);
    renderBar(timeScore, conditionScore, riskScore, functionScore);
}

function renderGauge(value) {

    if (gaugeChart) gaugeChart.destroy();

    gaugeChart = new Chart(document.getElementById('gaugeChart'), {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [value, 5 - value],
                backgroundColor: ['red', '#eee']
            }]
        },
        options: {
            circumference: 180,
            rotation: 270,
            cutout: '70%',
            plugins: { legend: { display: false } }
        }
    });
}

function renderBar(t, c, r, f) {

    if (barChart) barChart.destroy();

    barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: ['Time', 'Condition', 'Risk', 'Function'],
            datasets: [{
                label: 'Score',
                data: [t, c, r, f]
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, max: 5 }
            }
        }
    });
}
