# Spécifications Images - TAXI BRK

## Palette de Couleurs

| Nom | Code Hex | Utilisation |
|-----|----------|-------------|
| Or Principal | `#D4AF37` | Textes, icônes, bordures |
| Or Clair | `#F4E4BC` | Highlights, dégradés |
| Or Foncé | `#B8960C` | Ombres, dégradés |
| Noir Profond | `#0A0A0A` | Fonds principaux |
| Noir Secondaire | `#1A1A1A` | Cards, éléments UI |
| Blanc | `#FFFFFF` | Textes secondaires |
| Gris | `#A3A3A3` | Textes tertiaires |

---

## 1. LOGO (logo.svg) ✅ CRÉÉ

**Fichier:** `/public/images/logo.svg`

| Propriété | Valeur |
|-----------|--------|
| Dimensions | 240 x 70 px |
| Format | SVG vectoriel |
| Fond | Transparent |
| Typographie | Playfair Display Bold |

**Composition:**
- "TAXI" en dégradé or (#F4E4BC → #D4AF37 → #B8960C)
- "BRK" en blanc (#FFFFFF)
- Ligne de soulignement dorée (3px)
- Accent vertical doré à gauche (4px)
- Ombre dorée subtile sur "TAXI"

**Variantes à créer (optionnel):**
- `logo-white.svg` - Version tout blanc (pour fonds colorés)
- `logo-icon.svg` - Icône seule (64x64) avec initiales "TB"

---

## 2. OG IMAGE (og-image.svg) ✅ CRÉÉ

**Fichier:** `/public/images/og-image.svg`

| Propriété | Valeur |
|-----------|--------|
| Dimensions | 1200 x 630 px (ratio 1.91:1) |
| Format | SVG |
| Fond | Dégradé noir (#0A0A0A → #111111) |

**Composition:**
- Logo "TAXI BRK" centré avec effet glow
- Tagline: "Votre taxi premium à Strasbourg"
- 3 badges: CONVENTIONNÉ CPAM | DISPONIBLE 24H/24 | SERVICE PREMIUM
- Numéro de téléphone: 07 68 14 94 61
- Cadre décoratif doré aux coins
- Pattern de points dorés subtil

**Note:** Pour production, convertir en JPG 1200x630px avec https://cloudconvert.com

---

## 3. HERO IMAGE (À TÉLÉCHARGER)

**Fichier attendu:** `/public/images/hero-bg.webp`

| Propriété | Valeur |
|-----------|--------|
| Dimensions | 1920 x 1080 px minimum |
| Format | WebP (optimisé) |
| Taille max | < 200 KB |

### Recherche sur Unsplash/Pexels

**Mots-clés recommandés:**
```
taxi night city
luxury black car night
chauffeur service premium
executive car service night
black sedan city lights
```

**Critères de sélection:**
- ✅ Ambiance nocturne/sombre
- ✅ Véhicule premium (berline noire de préférence)
- ✅ Éclairage urbain (lumières de ville)
- ✅ Pas de marque visible sur le véhicule
- ✅ Angle avant 3/4 ou profil
- ✅ Espace pour overlay texte

**URLs recommandées:**
- https://unsplash.com/s/photos/taxi-night
- https://unsplash.com/s/photos/luxury-car-night
- https://pexels.com/search/black%20car%20night/

**Traitement post-téléchargement:**
1. Redimensionner à 1920x1080 (https://squoosh.app)
2. Appliquer overlay noir 40-60% opacité (optionnel, déjà géré en CSS)
3. Convertir en WebP qualité 80%
4. Vérifier taille < 200 KB

---

## 4. ICÔNES SERVICES (Lucide React) ✅ INTÉGRÉ

Les icônes sont intégrées via Lucide React dans le code.

| Service | Icône Lucide | Fichier utilisant l'icône |
|---------|--------------|---------------------------|
| Transport Médical | `Shield` | ServicesSection.tsx |
| Transfert Aéroport | `Plane` | ServicesSection.tsx |
| Transfert Gare | `Train` | ServicesSection.tsx |
| Transport Colis | `Package` | ServicesSection.tsx |
| Service Entreprise | `Building2` | ServicesSection.tsx |
| Transport Enfants | `Baby` | ServicesSection.tsx |

**Style appliqué:**
```jsx
<Icon className="w-7 h-7 text-gold-400" />
```

---

## 5. FAVICON & ICÔNES APP (À GÉNÉRER)

**Outil:** https://realfavicongenerator.net

**Fichiers à générer:**

| Fichier | Dimensions | Emplacement |
|---------|------------|-------------|
| `favicon.ico` | 16x16, 32x32 | `/public/` |
| `favicon-16x16.png` | 16x16 | `/public/` |
| `favicon-32x32.png` | 32x32 | `/public/` |
| `apple-touch-icon.png` | 180x180 | `/public/` |
| `android-chrome-192x192.png` | 192x192 | `/public/` |
| `android-chrome-512x512.png` | 512x512 | `/public/` |

**Design suggéré:**
- Fond noir (#0A0A0A)
- Initiales "TB" en or (#D4AF37)
- Style Playfair Display Bold
- Coins arrondis (border-radius: 20%)

---

## 6. IMAGES ADDITIONNELLES (Optionnel)

### Galerie Véhicule
| Fichier | Dimensions | Description |
|---------|------------|-------------|
| `vehicle-exterior.webp` | 800x600 | Vue extérieure 3/4 |
| `vehicle-interior.webp` | 800x600 | Intérieur cuir |
| `vehicle-trunk.webp` | 800x600 | Coffre spacieux |

### Carte Zone
| Fichier | Dimensions | Description |
|---------|------------|-------------|
| `map-strasbourg.webp` | 600x400 | Carte stylisée zone Strasbourg |

---

## Checklist Avant Production

- [x] Logo SVG créé (`logo.svg`)
- [x] OG Image créé (`og-image.svg`)
- [ ] Hero image téléchargée et optimisée
- [ ] Favicon généré avec realfavicongenerator.net
- [ ] Toutes les images < 200 KB
- [ ] OG Image testée sur https://developers.facebook.com/tools/debug/

---

## Ressources Utiles

| Outil | URL | Usage |
|-------|-----|-------|
| Squoosh | https://squoosh.app | Compression images |
| RealFaviconGenerator | https://realfavicongenerator.net | Génération favicons |
| SVGOMG | https://jakearchibald.github.io/svgomg/ | Optimisation SVG |
| CloudConvert | https://cloudconvert.com | Conversion formats |
| Facebook Debugger | https://developers.facebook.com/tools/debug/ | Test OG Image |
| Unsplash | https://unsplash.com | Photos libres de droits |
| Pexels | https://pexels.com | Photos libres de droits |
| Lucide Icons | https://lucide.dev/icons | Documentation icônes |
