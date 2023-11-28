import { exec, execSync } from 'child_process';

try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completato con successo.');
  const versionOutput = execSync('echo build completata con successo ');
  console.log('Creazione versione');
  execSync('changeset', { stdio: 'inherit' });
  execSync('changeset version', { stdio: 'inherit' });
  try {
    console.log('Committo versione e changelog...');
    execSync('git add package.json CHANGELOG.md', { stdio: 'inherit' });
    execSync('git commit -m "fix: publish"', { stdio: 'inherit' });
  } catch (error) {
    'Commit non completato: ', error.message;
  }
  execSync('changeset tag', { stdio: 'inherit' });
  console.log('Versioni create con successo.');

  execSync('git push --follow-tags', { stdio: 'inherit' });
  console.log('Versione Creata con successo.');
} catch (error) {
  console.error("Errore durante l'esecuzione di un comando:", error.message);
}
