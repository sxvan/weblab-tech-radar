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

### Datenbank (Postgres)
- PostgreSQL-Datenbank: Hier werden alle Daten zur Verwaltung von Technologien, Benutzerrollen und anderen relevanten Informationen gespeichert.
- Docker-Container: Der PostgreSQL-Datenbankserver läuft in einem Docker-Container, um eine isolierte, leicht wiederherstellbare Umgebung bereitzustellen.

### Motivation

Die Struktur des Systems wurde so gewählt, dass sie eine klare Trennung zwischen Frontend und Backend ermöglicht, was eine saubere Skalierbarkeit und Wartbarkeit sicherstellt. Mit Prisma als ORM können Änderungen an der Datenbankstruktur problemlos vorgenommen werden, ohne dass eine separate SQL-Abstraktionsschicht erforderlich ist. Type-GraphQL und Apollo-Server ermöglichen eine saubere und erweiterbare GraphQL-API, die die Kommunikation zwischen Frontend und Backend effizient gestaltet.

Die Entscheidung, PostgreSQL und Docker zu verwenden, sorgt für eine robuste und skalierbare Datenbanklösung, die leicht zu konfigurieren und zu verwalten ist.

### Gesamtübersicht
![image](https://github.com/user-attachments/assets/c52f07ed-5c28-4090-bcbd-a2d1c3af2c92)

**Backend**: Das Backend nutzt ApolloServer für GraphQL und Prisma als ORM, um mit der Datenbank zu interagieren.

**Frontend**: Das Frontend verwendet Angular für die Benutzeroberfläche und ApolloAngular für die GraphQL-Kommunikation.

**Database**: Postgres speichert die Daten und wird über Prisma im Backend angesprochen.

**Frontend → Backend**: Das Frontend sendet GraphQL-Anfragen an das Backend, um Daten abzurufen oder zu verändern.

**Backend → Frontend**: Das Backend sendet GraphQL-Antworten mit den angeforderten Daten an das Frontend.

**Backend → Database**: Prisma ermöglicht dem Backend die Interaktion mit der Postgres-Datenbank.

**Database → Docker Container**: Postgres läuft innerhalb eines Docker-Containers für eine isolierte Umgebung.

## Laufzeitsicht

In diesem Beispiel wird die Laufzeitsicht zur Erstellung einer neuen Technologie abgebildet. Dieser Ablauf wiederspiegelt die Abwicklung der meisten Use Cases.

![image](https://github.com/user-attachments/assets/066236fc-0a71-46c9-bc72-9257cd3de25b)

## Verteilungssicht

Das System wird in drei Hauptkomponenten unterteilt (Frontend, Backend und Datenbank), wobei nur die Datenbank mit Docker bereitgestellt wird. Wichtige Konfigurationswerte werden über eine .env-Datei zur Verfügung gestellt, die bei Bedarf angepasst werden kann. Die Anwendung läuft nicht in einer produktiven Umgebung. Eine Testumgebung wurde ebenfalls nicht aufgesetzt. In der Zukünft könnten die Applikation mit Hilfe von GitHub Actions verteilt werden.

![image](https://github.com/user-attachments/assets/24fc2566-9c5a-4010-91d7-db7e777f6cab)

## Querschnittliche Konzepte

### Domänenmodell

Das Domänenmodell repräsentiert die grundlegenden Entitäten und deren Beziehungen in der Applikation:

![image](https://github.com/user-attachments/assets/a755eedb-40f0-48fb-8374-3ec41e1650f1)

- **User**: Ein Benutzer im System, der eine eindeutige `id`, `name`, `email` und ein `passwordHash` besitzt. Jeder Benutzer hat eine Rolle, die durch das `Role`-Enum definiert ist (CTO, TECH_LEAD, EMPLOYEE).
  
- **Technology**: Eine Technologie, die von einem Benutzer erstellt wird. Sie besitzt Attribute wie `id`, `name`, `description`, und gehört zu einer bestimmten `Category` (z.B. TECHNIQUES, PLATFORMS). Eine Technologie kann optional einer `Classification` zugewiesen werden (z.B. ASSESS, TRIAL).

- Ein **User** kann mehrere **Technologies** erstellen.
- Ein **User** hat genau eine **Role**.
- Eine **Technology** gehört zu einer **Category**.
- Eine **Technology** kann optional einer **Classification** zugewiesen werden.

### Autentifizerung und Authorisierung

Es wird JWT (JSON Web Token) zur Authentifizierung verwendet. Der Benutzer sendet eine Anfrage an die GraphQL-API, um sich anzumelden. Bei erfolgreicher Authentifizierung erhält der Benutzer ein JWT, das dann in den Headern zukünftiger GraphQL-Anfragen zur Identifikation und Autorisierung verwendet wird. Das Token wird bei jeder Anfrage überprüft, um sicherzustellen, dass der Benutzer über die erforderlichen Berechtigungen verfügt. Das JWT-Token ist zwei Tage gültig.

## Architekturentscheidungen:

1. **Backend: Node.js mit Apollo Server**: Hohe Performance und Flexibilität durch Node.js, effiziente GraphQL-Verarbeitung mit Apollo Server.

2. **PostgreSQL in Docker**: Robuste relationale Datenbank, isolierte und einfach konfigurierbare Umgebung durch Docker, einfache Skalierbarkeit.

3. **Frontend: Angular mit Apollo Angular**: Angular für strukturierte SPAs, Apollo Angular für nahtlose GraphQL-Integration im Frontend.

4. **GraphQL als Schnittstelle**: Flexible und präzise Datenabfragen, reduzierte Datenlast und verbesserte Performance. Hauptsächlich aufgrund des Lerneffekts gewählt um etwas neues zu lernen.

5. **JWT für Authentifizierung**: Sichere, effiziente Authentifizierung mit JWT, einfaches Handling von Benutzerberechtigungen.

6. **Code-First-Ansatz mit Prisma und Type-GraphQL**: Enge Verbindung zwischen Code und Datenbank, erhöhte Konsistenz und Wartbarkeit, Typensicherheit (DRY).

7. **Docker für Datenbank**: Isolierte, reproduzierbare Umgebung für die PostgreSQL-Datenbank, erleichtert Verwaltung und Skalierung.

8. **Trennung von Frontend und Backend**: Bessere Wartbarkeit und Skalierbarkeit durch klare Trennung, unabhängige Änderungen.

## Qualitätsanforderungen

1. **Leistung**  
   Das System sollte eine bestimmte Anzahl gleichzeitiger Nutzer und Anfragen pro Sekunde ohne signifikante Verschlechterung der Antwortzeiten bewältigen können. Leistung ist zwar wichtig, jedoch kann eine gewisse Leistungseinbuße bei geringer Nutzung toleriert werden.

2. **Skalierbarkeit**  
   Die Architektur sollte zukünftiges Wachstum unterstützen, insbesondere mit zunehmender Nutzerzahl oder der Integration weiterer Technologien. Die Wahl von Docker für PostgreSQL sorgt dafür, dass die Datenbankumgebung zukünftig problemlos skaliert werden kann.

3. **Sicherheit**  
   Sicherheit ist besonders wichtig für Benutzerdaten und den Authentifizierungsprozess. Während JWT-Token für sichere Authentifizierung und Autorisierung genutzt werden, sind weitere Sicherheitsmaßnahmen wie Verschlüsselung der Daten im Ruhezustand und gesicherte API-Endpunkte wünschenswert, aber aufgrund der begrenzten Zeit nicht priorisiert worden.

4. **Wartbarkeit**  
   Das System sollte einfach wartbar und erweiterbar sein. Der Einsatz von TypeGraphQL, Apollo Server und Prisma trägt dazu bei, dass der Code sauber, wiederverwendbar und konsistent bleibt, was zukünftige Anpassungen erleichtert.

### Testing

Aufgrund schlechter Zeitplanung wurden im Rahmen dieses Projekts keine Tests durchgeführt. Das Fehlen formaler Tests bedeutet, dass das System nicht auf mögliche Edgecases geprüft wurde. Daher ist die Zuverlässigkeit und Leistung des Systems unter verschiedenen Bedingungen nicht vollständig gewährleistet. Zukünftige Arbeiten sollten umfassende automatisierte Tests umfassen, um diese Risiken zu mindern und eine höhere Systemrobustheit sicherzustellen.












