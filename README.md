# 🤖 AI Agent Starter

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![AI SDK](https://img.shields.io/badge/AI_SDK-000000?style=for-the-badge&logo=vercel&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Anthropic](https://img.shields.io/badge/Anthropic-191919?style=for-the-badge&logo=anthropic&logoColor=white)
![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

Un projet starter pour créer des agents IA conversationnels avec support multi-providers (OpenAI, Anthropic, Google) et un système d'outils modulaires extensible.

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Outils disponibles](#-outils-disponibles)
- [Ajouter de nouveaux outils](#-ajouter-de-nouveaux-outils)

## 🎯 À propos

Ce projet est un point de départ pour construire des agents IA intelligents capables d'interagir avec leur environnement grâce à un système d'outils modulaires. L'agent peut lire et écrire des fichiers, effectuer des recherches dans le code, naviguer dans les répertoires, et même récupérer du contenu web.

### Ce que vous pouvez faire avec cet agent :

- 💬 **Converser** avec différents modèles IA (GPT-4, Claude, Gemini)
- 🔧 **Exécuter des outils** directement depuis les réponses de l'IA
- 📁 **Manipuler des fichiers** (lecture, écriture, copie)
- 🔍 **Rechercher dans le code** avec grep et glob
- 🌐 **Récupérer du contenu web** pour enrichir les réponses
- 🎨 **Étendre facilement** avec vos propres outils

## ✨ Fonctionnalités

### Multi-Provider Support
Choisissez parmi trois fournisseurs IA leaders :
- **OpenAI** (GPT-4, GPT-3.5)
- **Anthropic** (Claude)
- **Google** (Gemini)

### Système d'outils modulaires
L'agent peut invoquer des outils via des balises XML dans ses réponses. Les outils disponibles incluent :
- `readfile` - Lire le contenu d'un fichier
- `writefile` - Écrire du contenu dans un fichier
- `grep` - Rechercher des patterns dans les fichiers
- `glob` - Trouver des fichiers par pattern
- `ls` - Lister le contenu d'un répertoire
- `websearch` - Récupérer et convertir du contenu web
- `cp` - Copier des fichiers

### Architecture propre et extensible
- Providers découplés dans `providers/`
- Outils modulaires dans `tools/implementations/`
- Parsing XML robuste pour l'invocation d'outils
- Gestion d'état conversationnel

## 🏗️ Architecture

```
.
├── index.ts                    # Point d'entrée principal
├── providers/                  # Implémentations des providers IA
│   ├── openai.ts
│   ├── anthropic.ts
│   └── google.ts
├── tools/                      # Système d'outils
│   ├── helpers.ts             # Parsing et exécution des outils
│   ├── index.ts
│   └── implementations/        # Implémentations individuelles
│       ├── readfile.ts
│       ├── writefile.ts
│       ├── grep.ts
│       ├── glob.ts
│       ├── ls.ts
│       ├── websearch.ts
│       └── copy.ts
└── utils/
    └── system-prompt.ts       # Messages système et état
```

### Comment ça fonctionne ?

1. **Sélection du provider** : Au démarrage, l'utilisateur choisit son provider IA préféré
2. **Boucle conversationnelle** : L'agent attend les inputs utilisateur
3. **Génération de réponse** : Le provider génère une réponse qui peut contenir des balises d'outils XML
4. **Parsing et exécution** : Les outils sont extraits via regex et exécutés séquentiellement
5. **Feedback** : Les résultats des outils sont ajoutés à la conversation et un nouveau cycle commence

**Exemple d'invocation d'outil :**
```xml
<readfile file="package.json" />
```

## 🚀 Installation

### Prérequis
- [Bun](https://bun.sh) installé sur votre machine
- Clés API pour au moins un provider (OpenAI, Anthropic, ou Google)

### Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd agent-starter-sandbox

# Installer les dépendances
bun install

# Configurer les variables d'environnement
cp .env.template .env
```

### Configuration des clés API

Éditez le fichier `.env` et ajoutez vos clés API :

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-...

# Gemini Configuration
GOOGLE_GENERATIVE_AI_API_KEY=AIza...

# Anthropic Configuration
ANTHROPIC_API_KEY=sk-ant-...
```

> **Note :** Vous n'avez besoin que des clés pour les providers que vous souhaitez utiliser.

## 💻 Utilisation

### Démarrer l'agent

```bash
bun run index.ts
```

### Session exemple

```
Agent Started! Type 'exit' to quit.

What provider do you want to use? choose 1, 2 or 3
1. OpenAI
2. Anthropic
3. Google
Provider: 2
Provider 2 selected.

What can I do for you?
You: Lis le fichier package.json
Agent: Je vais lire le fichier package.json <readfile file="package.json" />
Tool: readfile Result: {...}
Agent: Voici le contenu de votre package.json...
```

### Exemples d'utilisation

```bash
# Question simple
"Quelle est la capitale de la France ?"

# Lecture de fichier
"Quel est le contenu du fichier package.json ?"

# Modification de fichier
"Crée un nouveau fichier TypeScript avec une structure de classe basique"

# Fonctionnalité de recherche
"Trouve tous les fichiers JavaScript dans le répertoire src"

# Contenu web
"Récupère la documentation depuis https://example.com"
```

### Commandes

- Tapez vos questions ou commandes normalement
- Tapez `exit` pour quitter l'agent

## 🔧 Outils disponibles

| Outil | Description | Exemple d'utilisation |
|-------|-------------|----------------------|
| `readfile` | Lit le contenu d'un fichier | `<readfile file="src/index.ts" />` |
| `writefile` | Écrit du contenu dans un fichier | `<writefile file="output.txt" content="Hello" />` |
| `grep` | Recherche un pattern dans les fichiers | `<grep pattern="TODO" file="src/" flags="r" />` |
| `glob` | Trouve des fichiers par pattern | `<glob pattern="*.ts" path="src/" />` |
| `ls` | Liste le contenu d'un répertoire | `<ls path="src/" />` |
| `websearch` | Récupère du contenu web (converti en markdown) | `<websearch url="https://example.com" />` |
| `cp` | Copie un fichier | `<cp source="file.txt" destination="backup.txt" />` |

## ➕ Ajouter de nouveaux outils

### 1. Créer l'implémentation

Créez un nouveau fichier dans `tools/implementations/` :

```typescript
// tools/implementations/mon-outil.ts
export async function monOutil(param1: string, param2?: string) {
  // Votre logique ici
  return "résultat";
}
```

### 2. Ajouter le regex de parsing

Dans `tools/helpers.ts`, ajoutez :

```typescript
const MON_OUTIL_REGEX = /<mon-outil param1="([^"]+)"(?:\s+param2="([^"]+)")?\s*\/>/g;
```

### 3. Parser les occurrences

Dans la fonction `parseTools` :

```typescript
const monOutilMatches = text.matchAll(MON_OUTIL_REGEX);
for (const match of monOutilMatches) {
  tools.push({
    name: "mon-outil",
    params: {
      param1: match[1],
      param2: match[2] || undefined
    }
  });
}
```

### 4. Exécuter l'outil

Dans la fonction `executeTool` :

```typescript
if (tool.name === "mon-outil") {
  return monOutil(tool.params.param1, tool.params.param2);
}
```

### 5. Documenter dans le system prompt

Ajoutez la description de votre outil dans `utils/system-prompt.ts` pour que l'IA sache comment l'utiliser.

## 📚 Technologies utilisées

- **[Bun](https://bun.sh)** - Runtime JavaScript ultra-rapide
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique
- **[AI SDK](https://sdk.vercel.ai/)** - Abstraction unifiée pour les providers IA
- **[Glob](https://github.com/isaacs/node-glob)** - Pattern matching de fichiers
- **[Turndown](https://github.com/mixmark-io/turndown)** - Conversion HTML vers Markdown

## 📝 License

MIT

---

**Bon coding avec votre agent IA ! 🚀**