// Wärmebild: Messpunkte im Hausschnitt (Koordinaten in Prozent der Grafik)
(function () {
  var punkte = [
    { id: 'heizung', name: 'Heizung', x: 27.1, y: 88.2, t: '68,2 °C', titel: 'Heizungstechnik', text: 'Modernste Heizungstechnik und bedienungsfreundliche Regeltechnik.', link: '#waerme' },
    { id: 'wartung', name: 'Wartung', x: 23, y: 47.1, t: '54,6 °C', titel: 'Wartung hält die Heizung fit', text: 'Regelmäßig geprüft, bleibt die Anlage sparsam und zuverlässig.', link: '#wartung' },
    { id: 'bad', name: 'Bad', x: 75.4, y: 49.1, t: '38,4 °C', titel: 'Das komplette Bad', text: 'Von der Planung bis zum ersten Wohlfühlerlebnis, alles aus einer Hand.', link: '#wasser' },
    { id: 'leck', name: 'Leck', x: 50.4, y: 67, t: '41,7 °C', titel: 'Leckortung', text: 'Wir finden das Leck, reparieren es und trocknen alles wieder.', link: '#thermografie' },
    { id: 'solar', name: 'Solar', x: 66.6, y: 23.4, t: '72,9 °C', titel: 'Solaranlagen', text: 'Solartechnik, passend zu Ihrer Heizung.', link: '#waerme' },
    { id: 'abwasser', name: 'Abwasser', x: 80.1, y: 83.9, t: '24,3 °C', titel: 'Rohrreinigung', text: 'Mit Spülwagen, Motorspiralen und Kamera.', link: '#wasser' }
  ];
  var hots = document.getElementById('hots');
  var chips = document.getElementById('chips');
  if (!hots || !chips) return;
  var cross = document.getElementById('cross');
  var lbl = document.getElementById('crossLbl');
  var title = document.getElementById('camTitle');
  var text = document.getElementById('camText');
  var link = document.getElementById('camLink');
  var buttons = [];

  function zeige(i) {
    var p = punkte[i];
    cross.style.left = p.x + '%';
    cross.style.top = p.y + '%';
    lbl.textContent = 'Sp' + (i + 1) + ' · ' + p.t;
    title.textContent = p.titel;
    text.textContent = p.text;
    link.setAttribute('href', p.link);
    buttons.forEach(function (b, j) { b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
    // Beschriftung nicht über den rechten Rand laufen lassen
    lbl.style.left = p.x > 62 ? 'auto' : '34px';
    lbl.style.right = p.x > 62 ? '34px' : 'auto';
  }

  punkte.forEach(function (p, i) {
    var h = document.createElement('button');
    h.className = 'hot';
    h.type = 'button';
    h.style.left = p.x + '%';
    h.style.top = p.y + '%';
    h.setAttribute('aria-label', p.titel);
    h.addEventListener('click', function () { zeige(i); });
    hots.appendChild(h);

    var c = document.createElement('button');
    c.type = 'button';
    c.textContent = p.name;
    c.addEventListener('click', function () { zeige(i); });
    chips.appendChild(c);
    buttons.push(c);
  });
  zeige(0);
})();

// Vergleich Normalbild / Wärmebild
(function () {
  var box = document.getElementById('compare');
  if (!box) return;
  var input = box.querySelector('input');
  input.addEventListener('input', function () { box.style.setProperty('--pos', input.value + '%'); });
})();

// Anfrage: Anliegen vorauswählen, Absenden im Entwurf abfangen
(function () {
  document.querySelectorAll('[data-anliegen]').forEach(function (a) {
    a.addEventListener('click', function () {
      var r = document.querySelector('input[name="anliegen"][value="' + a.getAttribute('data-anliegen') + '"]');
      if (r) r.checked = true;
    });
  });
  var form = document.getElementById('form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('ok').style.display = 'block';
  });
})();
