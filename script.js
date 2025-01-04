function solveStatistics() {
    const n = parseInt(document.getElementById('n').value);
    const lf = parseFloat(document.getElementById('lf').value);
    const rf = parseFloat(document.getElementById('rf').value);
    const kc = parseFloat(document.getElementById('kc').value);
    const ts = document.getElementById('ts').value.split(',').map(Number);

    if (ts.length !== n) {
        alert('Số lượng tần số phải khớp với số nhóm!');
        return;
    }

    const trai = [lf];
    const phai = [rf];
    const dd = rf - lf;

    for (let i = 1; i < n; i++) {
        trai.push(kc + trai[i - 1] + dd);
        phai.push(trai[i] + dd);
    }

    const gtdd = trai.map((t, i) => (t + phai[i]) / 2);
    const tstl = ts.reduce((acc, curr, i) => {
        acc.push((acc[i - 1] || 0) + curr);
        return acc;
    }, []);

    const N = tstl[tstl.length - 1];
    const tb = gtdd.reduce((sum, g, i) => sum + g * ts[i], 0) / N;
    const tsmax = Math.max(...ts);
    const maxIndex = ts.indexOf(tsmax);

    const up = trai[maxIndex];
    const tsmax0 = ts[maxIndex - 1] || 0;
    const tsmax1 = ts[maxIndex + 1] || 0;
    const mot = up + ((tsmax - tsmax0) / ((tsmax - tsmax0) + (tsmax - tsmax1))) * dd;

    const q1thuoc = N / 4;
    const q2thuoc = N / 2;
    const q3thuoc = (N * 3) / 4;

    let q1 = null, q2 = null, q3 = null;
    let q1Group = null, q2Group = null, q3Group = null;

    for (let i = 0; i < n; i++) {
        if (tstl[i] >= q1thuoc && q1 === null) {
            q1 = trai[i] + ((q1thuoc - (tstl[i - 1] || 0)) / ts[i]) * dd;
            q1Group = `[${trai[i]}; ${phai[i]})`;
        }
        if (tstl[i] >= q2thuoc && q2 === null) {
            q2 = trai[i] + ((q2thuoc - (tstl[i - 1] || 0)) / ts[i]) * dd;
            q2Group = `[${trai[i]}; ${phai[i]})`;
        }
        if (tstl[i] >= q3thuoc && q3 === null) {
            q3 = trai[i] + ((q3thuoc - (tstl[i - 1] || 0)) / ts[i]) * dd;
            q3Group = `[${trai[i]}; ${phai[i]})`;
        }
    }

    document.getElementById('results').innerHTML = `
        <p><strong>Các nhóm:</strong> ${trai.map((t, i) => `[${t}; ${phai[i]})`).join(', ')}</p>
        <p><strong>Giá trị đại diện:</strong> ${gtdd.join(', ')}</p>
        <p><strong>Tần số tích lũy:</strong> ${tstl.join(', ')}</p>
        <p><strong>N:</strong> ${N}</p>
        <p><strong>Số trung bình:</strong> ${tb.toFixed(4)}</p>
        <p><strong>Mốt:</strong> ${mot.toFixed(4)}</p>
        <p><strong>Q1:</strong> ${q1.toFixed(4)} (Thuộc nhóm: ${q1Group})</p>
        <p><strong>Q2:</strong> ${q2.toFixed(4)} (Thuộc nhóm: ${q2Group})</p>
        <p><strong>Q3:</strong> ${q3.toFixed(4)} (Thuộc nhóm: ${q3Group})</p>
    `;
}

