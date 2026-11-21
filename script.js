(function () {
  var cfg = window.PORTFOLIO || {};

  // Année du pied de page
  var annee = document.getElementById('annee');
  if (annee) annee.textContent = new Date().getFullYear();

  // Lien vers le code de l'app météo (affiché seulement s'il est renseigné)
  var meteo = document.getElementById('meteo-code');
  if (meteo && cfg.meteoCode) {
    meteo.href = cfg.meteoCode;
    meteo.hidden = false;
  }

  // Boutons de contact (WhatsApp, e-mail, LinkedIn), ajoutés avant GitHub
  var liste = document.getElementById('contact-list');
  var github = document.getElementById('c-github');

  function ajouter(texte, href, principal, nouvelOnglet) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.className = 'btn ' + (principal ? 'btn-primary' : 'btn-ghost');
    a.href = href;
    a.textContent = texte;
    if (nouvelOnglet) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    li.appendChild(a);
    liste.insertBefore(li, github);
  }

  if (liste && github) {
    if (cfg.whatsapp) {
      var numero = String(cfg.whatsapp).replace(/\D/g, '');
      var message = "Bonjour Adriano, j'ai vu votre portfolio et je voudrais vous parler d'un projet.";
      ajouter('WhatsApp', 'https://wa.me/' + numero + '?text=' + encodeURIComponent(message), true, true);
    }
    if (cfg.email) {
      ajouter('Écrire un e-mail', 'mailto:' + cfg.email, !cfg.whatsapp, false);
    }
    if (cfg.linkedin) {
      ajouter('LinkedIn', cfg.linkedin, false, true);
    }
  }

  // Apparition douce des blocs au défilement
  var blocs = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    blocs.forEach(function (b) { b.classList.add('in'); });
    return;
  }
  var obs = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  blocs.forEach(function (b) { obs.observe(b); });
})();
