# 🌟 Jisca Fashion — Site E-commerce

Boutique de mode et stylisme basée au Bénin.  
Site e-commerce responsive, dynamique et prêt au déploiement sur **Netlify**.

---

## 📁 Structure du projet

```
jisca-fashion/
├── index.html       → Page principale (toutes sections)
├── style.css        → Styles globaux (afro-luxe dark theme)
├── app.js           → JavaScript (panier, filtres, slider, FAQ…)
├── 404.html         → Page d'erreur personnalisée
├── manifest.json    → PWA manifest
├── robots.txt       → Instructions moteurs de recherche
├── sitemap.xml      → Plan du site pour le SEO
└── netlify.toml     → Configuration Netlify (cache, redirects, headers)
```

---

## 🚀 Déploiement sur Netlify

### Méthode 1 — Glisser-déposer (le plus simple)
1. Aller sur [app.netlify.com](https://app.netlify.com)
2. Se connecter / créer un compte
3. Glisser le **dossier `jisca-fashion`** dans la zone de dépôt
4. C'est en ligne ! 🎉

### Méthode 2 — Via GitHub (recommandée pour les mises à jour)
1. Créer un repo GitHub et y pousser le dossier
2. Sur Netlify : **Add new site → Import from Git**
3. Sélectionner le repo → Branche `main`
4. Build command : *(laisser vide)*
5. Publish directory : `.`
6. Cliquer **Deploy site**

### Méthode 3 — Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir .
```

---

## 🎨 Personnalisation rapide

### Couleurs (dans `style.css`)
```css
--gold:       #C9A84C;   /* Couleur principale dorée */
--noir:       #0D0D0D;   /* Fond principal */
--cream:      #F5F0E8;   /* Texte clair */
--accent:     #C9503A;   /* Badges promo */
```

### Informations de contact (dans `index.html`)
- Chercher `+229 XX XX XX XX` → remplacer par votre numéro
- Chercher `contact@jiscafashion.bj` → remplacer par votre email
- Chercher `wa.me/22900000000` → remplacer par votre numéro WhatsApp

### Produits (dans `app.js`)
Modifier le tableau `products[]` pour ajouter / modifier les articles.

---

## ✨ Fonctionnalités incluses

| Fonctionnalité | Détail |
|---|---|
| 🛒 Panier | Ajout, suppression, quantités — localStorage |
| 🔍 Filtres Collection | Par catégorie (Femme, Homme, Accessoires…) |
| 📸 Lookbook / Galerie | Grille masonry + lightbox clavier |
| 💬 FAQ interactive | Accordéon animé |
| 📧 Newsletter | Formulaire avec confirmation |
| 📩 Formulaire contact | Validation + feedback visuel |
| 🌙 Curseur personnalisé | Effet luxe (desktop) |
| 📱 WhatsApp float | Bouton raccourci WhatsApp |
| ⬆️ Retour en haut | Bouton scroll-to-top |
| 🏷️ Marque défilante | Marquee partenaires |
| 🎭 Loader animé | Écran de chargement élégant |
| 📐 Responsive | Mobile, tablette, desktop |
| 🔒 Headers sécurité | XSS, CSP, Referrer via Netlify |
| 🗺️ SEO | Sitemap, robots.txt, OG tags |
| 📲 PWA | Manifest installable sur mobile |

---

## 📞 Support

Pour toute question technique, contacter le développeur.

---

*© 2024 Jisca Fashion — Made with ♥ in Bénin*
