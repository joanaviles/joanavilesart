# Joan Avilés — Web Portfolio

Web portfolio professional per a Joan Avilés, estudi d'imatgeria festiva i religiosa.

**Live:** [joanaviles.art](https://joanaviles.art)

---

## Tecnologia

- HTML / CSS / JS pur — sense frameworks
- Allotjat a **GitHub Pages** amb domini personalitzat
- Formulari de contacte via **Formspree**
- Mapa interactiu via **Leaflet.js**
- Galeria lightbox via **GLightbox**

---

## Estructura de fitxers

```
joanavilesart/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   └── i18n.js
└── assets/
    ├── images/
    │   ├── logo.png
    │   ├── minilogo.png          ← favicon
    │   ├── hero-poster.jpg       ← frame del vídeo hero
    │   ├── og-image.jpg          ← imatge xarxes socials (1200×630px)
    │   ├── artista/
    │   │   ├── portrait.jpg      ← foto principal artista
    │   │   ├── photo2.jpg
    │   │   └── photo3.jpg
    │   ├── creaciones/
    │   │   ├── obra1.jpg
    │   │   ├── obra2.jpg
    │   │   ├── obra3.jpg
    │   │   ├── obra4.jpg
    │   │   ├── obra5.jpg
    │   │   └── obra6.jpg
    │   ├── taller/
    │   │   ├── taller1.jpg
    │   │   ├── taller2.jpg
    │   │   └── taller3.jpg
    │   └── galeria/
    │       ├── g1.jpg → g9.jpg
    └── videos/
        └── hero.mp4
```

---

## Contingut pendent de substituir

### Obres (x6) — `js/i18n.js` + `index.html`
Per a cada obra cal:
- Títol (CA / ES / EN)
- Any
- Ubicació (ciutat, país)
- Material
- Descripció curta
- Coordenades GPS (per al mapa)
- Foto → `assets/images/creaciones/obraN.jpg`

### El Artista — `js/i18n.js`
- Text biogràfic (CA / ES / EN)
- Cita destacada
- Fotos → `portrait.jpg`, `photo2.jpg`, `photo3.jpg`

### El Taller — `js/i18n.js`
- Text descriptiu (CA / ES / EN)
- Fotos → `taller1.jpg`, `taller2.jpg`, `taller3.jpg`

### Galeria
- Fins a 9 fotos → `g1.jpg` → `g9.jpg`

### Hero
- Vídeo → `assets/videos/hero.mp4`
- Poster → `assets/images/hero-poster.jpg`

---

## Idiomes

El lloc és trilingüe: **Català / Castellà / English**
Totes les traduccions es troben a `js/i18n.js`

---

## Desenvolupament

Obert `index.html` directament al navegador sense servidor.

Quan hi hagi canvis, pujar a GitHub:
```bash
git add -A
git commit -m "descripció del canvi"
git push
```

---

## Contacte desenvolupador

Marc García-Cuevas de Paz — [marcg-c20@hotmail.es](mailto:marcg-c20@hotmail.es) — [@marccgarciia](https://www.instagram.com/marccgarciia/)
