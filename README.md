# Astro-Website-Starter

Dieses kleine Starterprojekt ist für Anfänger vorbereitet. Nach dem vollständigen Entpacken kann der gesamte Ordner in VS Code geöffnet und die vorhandene Website direkt mit Codex weiterentwickelt werden. Es verwendet das offizielle Astro-Grundprinzip ohne React, Vue, Svelte, Datenbank, Login, CMS oder CSS-Framework.

## Voraussetzung

Benötigt wird **Node.js 24 LTS**. Die Datei `.nvmrc` und der Eintrag `engines` in `package.json` legen diese Hauptversion fest. Mit einem installierten Node Version Manager genügt im Projektordner meist `nvm use`.

## Lokale Befehle

```bash
npm ci          # Abhängigkeiten exakt aus package-lock.json installieren
npm run dev     # lokalen Entwicklungsserver starten
npm run build   # fertige statische Website in dist/ erzeugen
npm run preview # den fertigen Build lokal ansehen
```

Nach `npm run dev` zeigt das Terminal die lokale Adresse, normalerweise `http://localhost:4321`.

## Wichtige Projektdateien

- `AGENTS.md` enthält dauerhafte Arbeits-, Qualitäts- und Sicherheitsregeln für Codex.
- `.codex/config.toml` erlaubt Codex selbstständiges Arbeiten und Netzwerkzugriff innerhalb des geschützten Projektordners.
- `.codex/rules/default.rules` verlangt für schreibende Git-Aktionen eine Bestätigung und blockiert gefährliche Befehle.
- `KONZEPT.md` ist die neutrale Vorlage für Ziele, Zielgruppe, Inhalte und Design der späteren Website.
- `START_HIER.txt` führt Schritt für Schritt durch den ersten Start.

Codex lädt die projektbezogene Konfiguration und die Regeln nur, wenn der Projektordner als **vertrauenswürdig** geöffnet wurde. Die Sicherheits- und Agentendateien `AGENTS.md` sowie der Ordner `.codex` dürfen nicht gelöscht oder verändert werden.

## Codex-Konfiguration

Die Konfiguration verwendet die aktuell dokumentierten Schlüssel. Gegenüber der Vorgabe war keine inhaltliche Abweichung nötig: Freigaben erfolgen bei Bedarf durch den Benutzer, Befehle laufen im `workspace-write`-Sandboxmodus, Netzwerk ist dort erlaubt und Zugriffe auf temporäre Verzeichnisse außerhalb des Projekts sind ausgeschlossen.
