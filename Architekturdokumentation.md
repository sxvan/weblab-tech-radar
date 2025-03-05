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
