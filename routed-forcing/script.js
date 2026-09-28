const datasets = {
  SpeakerVid: [
    ['Self Forcing',27.17,320.91,4.03,10.97,5.62,1.07,3.07,1.37,4.96,2.14],
    ['DFD',28.78,325.33,3.92,11.10,5.47,1.11,3.08,1.42,4.67,1.84],
    ['DP-DMD',27.22,320.27,4.00,10.98,5.67,1.06,3.00,1.33,4.89,2.13],
    ['Reward Forcing',26.99,315.84,4.04,10.97,5.79,1.09,3.14,1.41,5.20,2.21],
    ['DynaForcing',27.75,326.38,4.04,10.95,5.45,1.07,2.96,1.31,4.69,2.06],
    ['Routed Forcing',25.43,309.92,4.07,10.94,7.80,1.25,3.55,1.58,6.09,2.29]
  ],
  AVSpeech: [
    ['Self Forcing',39.44,456.01,3.05,10.77,3.33,0.99,2.42,1.73,4.08,1.90],
    ['DFD',41.52,442.15,2.96,10.80,3.46,1.12,2.59,1.89,3.99,1.77],
    ['DP-DMD',39.48,454.76,3.02,10.79,3.33,0.98,2.35,1.68,3.97,1.87],
    ['Reward Forcing',39.46,453.16,3.04,10.80,3.35,1.01,2.46,1.78,4.17,1.94],
    ['DynaForcing',39.78,460.86,3.04,10.77,3.23,0.96,2.29,1.63,3.85,1.82],
    ['Routed Forcing',38.47,424.58,3.09,10.75,4.85,1.23,2.92,2.01,5.08,2.14]
  ]
};

document.querySelectorAll('[data-dataset]').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.dataset;
    document.querySelectorAll('[data-dataset]').forEach(other => {
      other.setAttribute('aria-pressed', String(other === button));
    });
    document.getElementById('results-body').innerHTML = datasets[name].map(([method, ...values]) => {
      const ours = method === 'Routed Forcing';
      return `<tr${ours ? ' class="ours"' : ''}><th scope="row">${method}${ours ? ' <span>Ours</span>' : ''}</th>${values.map(value => `<td>${value.toFixed(2)}</td>`).join('')}</tr>`;
    }).join('');
    document.getElementById('table-caption').textContent = `${name} · Controlled training strategy comparison`;
    const baseline = datasets[name][0];
    const ours = datasets[name][5];
    const gain = ((ours[5] / baseline[5] - 1) * 100).toFixed(1);
    document.getElementById('result-takeaway').innerHTML = `<strong>${gain}% higher motion dynamics on ${name}.</strong> RAFT-Motion rises from ${baseline[5].toFixed(2)} to ${ours[5].toFixed(2)}, while FID improves from ${baseline[1].toFixed(2)} to ${ours[1].toFixed(2)} and Sync-C from ${baseline[3].toFixed(2)} to ${ours[3].toFixed(2)}.`;
  });
});

document.getElementById('copy-citation').addEventListener('click', async () => {
  const code = document.getElementById('bibtex');
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(code.textContent);
    status.textContent = 'Citation copied.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(code);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
  }
});
