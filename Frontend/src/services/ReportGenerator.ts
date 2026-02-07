import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PolicyData {
    name: string;
    metrics: {
        aqi: number;
        pm25: number;
        no2: number;
    };
    budgetUsed: number;
    impactScore: number;
}

interface ComparisonResult {
    baseline: {
        aqi: number;
        pm25: number;
        no2: number;
    };
    policyA: PolicyData;
    policyB: PolicyData;
}

export const generateReport = (data: ComparisonResult, budget: number) => {
    const doc = new jsPDF();

    // -- Header --
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('NeetiSIM', 20, 20);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('Strategic Policy Impact Assessment', 20, 28);

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 38);

    // -- Executive Summary --
    let yPos = 55;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Summary', 20, yPos);

    yPos += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    const betterPolicy = data.policyA.impactScore > data.policyB.impactScore ? data.policyA : data.policyB;
    const worsePolicy = data.policyA.impactScore > data.policyB.impactScore ? data.policyB : data.policyA;
    const diff = (betterPolicy.impactScore - worsePolicy.impactScore).toFixed(1);

    const summaryText = `Simulation results indicate that ${betterPolicy.name} provides a superior outcome compared to ${worsePolicy.name}, with an efficiency score ${diff} points higher. With a deployed budget of Rs. ${budget} Cr, the projected AQI reduction is significant.`;

    const splitText = doc.splitTextToSize(summaryText, 170);
    doc.text(splitText, 20, yPos);

    // -- Impact Table --
    yPos += 30;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Impact Analysis', 20, yPos);

    yPos += 5;

    autoTable(doc, {
        startY: yPos,
        head: [['Metric', 'Baseline', data.policyA.name, data.policyB.name]],
        body: [
            ['AQI Index', data.baseline.aqi.toFixed(0), data.policyA.metrics.aqi.toFixed(0), data.policyB.metrics.aqi.toFixed(0)],
            ['PM 2.5', data.baseline.pm25.toFixed(0), data.policyA.metrics.pm25.toFixed(0), data.policyB.metrics.pm25.toFixed(0)],
            ['NO2 Levels', data.baseline.no2.toFixed(0), data.policyA.metrics.no2.toFixed(0), data.policyB.metrics.no2.toFixed(0)],
            ['Efficiency Score', '-', data.policyA.impactScore.toFixed(1), data.policyB.impactScore.toFixed(1)],
        ],
        theme: 'grid',
        headStyles: { fillColor: [15, 23, 42], textColor: 255 },
        styles: { fontSize: 11, cellPadding: 6 },
    });

    // -- Budget Efficiency --
    // @ts-ignore
    yPos = doc.lastAutoTable.finalY + 20;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Budget Efficiency', 20, yPos);

    yPos += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Budget Allocation: Rs. ${budget} Crores`, 20, yPos);

    yPos += 7;
    const costPerPointA = (budget / data.policyA.impactScore).toFixed(2);
    const costPerPointB = (budget / data.policyB.impactScore).toFixed(2);

    doc.text(`${data.policyA.name} Cost Efficiency: Rs. ${costPerPointA} Cr per impact point`, 20, yPos);
    yPos += 7;
    doc.text(`${data.policyB.name} Cost Efficiency: Rs. ${costPerPointB} Cr per impact point`, 20, yPos);

    // -- Footer --
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('NeetiSIM - AI Powered Governance Tool', 20, pageHeight - 10);
    doc.text('Confidential - For Official Use Only', 140, pageHeight - 10);

    doc.save('NeetiSIM_Policy_assessment.pdf');
};
