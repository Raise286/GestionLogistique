# Waka Colis - Frontend (V1.0)

Bienvenue sur le dépôt du frontend de l'application **Waka Colis**. Cette première version se concentre sur la mise en place des interfaces utilisateur (UI) et des parcours principaux, sans connexion à un backend.

## ✨ Statut de cette version

**Version :** 1.0 - Interfaces Utilisateur (UI) Uniquement

Cette version est **fonctionnelle du point de vue de l'interface** mais ne contient **aucune logique métier ou connexion à une base de données**. Toutes les données affichées sont des données fictives ("mock data") directement intégrées dans le code pour simuler le comportement de l'application.

## 🚀 Fonctionnalités Implémentées

*   **Page d'Accueil (Landing Page) :** Une page de présentation simple et professionnelle pour l'application.
*   **Système d'Authentification (UI) :**
    *   Page d'inscription (`/signup`) avec une logique d'affichage conditionnelle pour les livreurs indépendants vs. membres d'agence.
    *   Page de connexion (`/login`) avec une fausse redirection.
*   **Profil Complet du Livreur Indépendant (`/profile/edit`) :**
    *   Modification des informations personnelles.
    *   Interface pour lister et **ajouter des véhicules** (avec un formulaire dans une modale).
    *   Interface pour **définir les tarifs** (tarif de base, au km, etc.).
*   **Tableau de Bord Dynamique (`/dashboard`) :**
    *   Vue claire des livraisons "En attente" et "En cours".
    *   **Simulation de notification** : un bouton permet de simuler l'arrivée d'une nouvelle livraison, déclenchant une notification toast.

## 🛠️ Technologies Utilisées

Ce projet est construit avec un stack moderne, performant et centré sur l'écosystème React.

| Technologie      | Rôle                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| **Next.js 14**   | Le framework React pour la production. Gère le routing (App Router), le rendu serveur et l'optimisation. |
| **React**        | La bibliothèque de base pour construire les interfaces utilisateur.                                 |
| **TypeScript**   | Ajoute un typage statique au JavaScript pour un code plus robuste et moins de bugs.                 |
| **Tailwind CSS** | Un framework CSS "utility-first" pour un stylisme rapide et personnalisable directement dans le HTML. |
| **shadcn/ui**    | Une collection de composants UI réutilisables, accessibles et magnifiquement conçus (boutons, cartes, formulaires...). |
| **Sonner**       | Une bibliothèque élégante pour afficher des notifications "toast" non intrusives.                     |
| **Lucide React** | Une bibliothèque d'icônes simples, claires et légères, parfaitement intégrée avec shadcn/ui.     |
| **pnpm**         | Le gestionnaire de paquets utilisé pour sa rapidité et son efficacité de gestion des dépendances.    |

---

## 📦 Comment Lancer le Projet en Local

Suivez ces étapes pour faire tourner le projet sur votre machine.

### Prérequis

*   **Node.js** (version 18 ou supérieure)
*   **pnpm** (gestionnaire de paquets). Si vous ne l'avez pas, installez-le avec la commande :
    ```bash
    npm install -g pnpm
    ```

### Installation et Lancement

1.  **Clonez le dépôt :**
    Ouvrez un terminal et clonez le projet depuis GitHub.
    ```bash
    git clone [URL_DU_DEPOT_GITHUB_DE_VOTRE_CHEF]
    ```

2.  **Naviguez dans le dossier du projet :**
    ```bash
    cd nom-du-dossier-du-projet
    ```

3.  **Installez les dépendances :**
    Utilisez `pnpm` pour une installation rapide et fiable.
    ```bash
    pnpm install
    ```

4.  **Lancez le serveur de développement :**
    ```bash
    pnpm dev
    ```

5.  **Ouvrez l'application :**
    Ouvrez votre navigateur et allez à l'adresse [http://localhost:3000](http://localhost:3000).