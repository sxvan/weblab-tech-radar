# Architekturdokumentation

## Lösungsstrategie

In diesem Projekt basiert die Architektur auf einer Node.js API, die Prisma für die code-first Datenbankgenerierung mit einer PostgreSQL-Datenbank verwendet, die in einem Docker-Container läuft. Die API ist mit Apollo Server in Kombination mit TypeGraphQL strukturiert, um einen DRY-Ansatz (Don't Repeat Yourself) bei der Handhabung von GraphQL-Anfragen zu gewährleisten.

Das Frontend ist eine Single-Page Angular-Anwendung, die über Apollo Angular mit der Backend-API kommuniziert und nahtlose GraphQL-Integration bietet.

### Wichtige Entscheidungen:
- Technologie-Stack:
  - Backend: Node.js mit Apollo Server und Prisma (für die Datenbankgenerierung).
  - Datenbank: PostgreSQL, betrieben in Docker, für Isolation und einfache Umgebungseinrichtung.
  - Frontend: Angular mit Apollo Angular für die GraphQL-Kommunikation im Frontend.
  - Schnittstelle: Es wurde sich für eine GraphQL Schnittstelle entschieden. Diese Entscheidung basiert auf dem Lerneffekt und ist nicht speziell für dieses Projekt geeignet.
  
- Architektur: Das System folgt einem Code-First-Ansatz (mit Prisma), bei dem das Datenbankschema basierend auf dem Backend-Code generiert wird, um Konsistenz und Wartbarkeit zu gewährleisten.
  
- Qualitätsziele:
  - Wartbarkeit: Die Kombination aus TypeGraphQL und Apollo Server sorgt für einen DRY-Ansatz, wodurch Boilerplate-Code reduziert und die Wiederverwendbarkeit des Codes gefördert wird.
  - Skalierbarkeit: Die Dockerisierung der PostgreSQL-Datenbank vereinfacht die Umgebungseinrichtung und Skalierung.
  - Leistung: Apollo Server und Prisma bieten effiziente GraphQL-Abfragen, die eine schnelle Datenabfrage und minimale Overhead-Kosten gewährleisten.

Diese Entscheidungen zielen darauf ab, ein flexibles, skalierbares und wartbares System zu erstellen, das in Zukunft leicht erweitert werden kann und dabei hohe Codequalität und Performance beibehält.

## Systembausteine

### Backend (Node.js API)
- GraphQL API: Die Hauptschnittstelle für die Kommunikation zwischen Frontend und Backend.
  - Apollo-Server: Dient als GraphQL-Server, der die Anfragen vom Frontend verarbeitet und Antworten zurückgibt.
  - Type-GraphQL: Hält den Code DRY, indem es GraphQL-Schemas direkt aus den TypeScript-Klassen generiert.
  - Prisma ORM: Wird verwendet, um mit der PostgreSQL-Datenbank zu interagieren und die Datenbankstruktur (Code-first) zu definieren.
  - PostgreSQL: Die relationale Datenbank, die in einem Docker-Container läuft und die Daten speichert.

### Frontend (Angular Webanwendung)
- Apollo-Angular: Das Modul, das die GraphQL-Kommunikation zwischen dem Frontend und der Backend-API ermöglicht.
- Angular: Das Frontend-Framework, das die Benutzeroberfläche und die Anwendungslogik steuert.
  - Module: Verschiedene Angular-Module für die Strukturierung der Anwendung (z.B. Benutzerverwaltung, Technologie-Dashboard).
  - Components: Komponenten, die die Benutzeroberfläche darstellen (z.B. Formular für das Erstellen von Technologien, Ansicht von Technologien).
  - Services: Für die Kommunikation mit der GraphQL-API und die Verwaltung von Daten im Frontend.

### Datenbank
- PostgreSQL-Datenbank: Hier werden alle Daten zur Verwaltung von Technologien, Benutzerrollen und anderen relevanten Informationen gespeichert.
- Docker-Container: Der PostgreSQL-Datenbankserver läuft in einem Docker-Container, um eine isolierte, leicht wiederherstellbare Umgebung bereitzustellen.

### Motivation

Die Struktur des Systems wurde so gewählt, dass sie eine klare Trennung zwischen Frontend und Backend ermöglicht, was eine saubere Skalierbarkeit und Wartbarkeit sicherstellt. Mit Prisma als ORM können Änderungen an der Datenbankstruktur problemlos vorgenommen werden, ohne dass eine separate SQL-Abstraktionsschicht erforderlich ist. Type-GraphQL und Apollo-Server ermöglichen eine saubere und erweiterbare GraphQL-API, die die Kommunikation zwischen Frontend und Backend effizient gestaltet.

Die Entscheidung, PostgreSQL und Docker zu verwenden, sorgt für eine robuste und skalierbare Datenbanklösung, die leicht zu konfigurieren und zu verwalten ist.

### Gesamtübersicht
![image](https://github.com/user-attachments/assets/c52f07ed-5c28-4090-bcbd-a2d1c3af2c92)


