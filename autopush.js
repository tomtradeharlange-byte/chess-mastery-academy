#!/usr/bin/env node
// Auto-commit & push dès qu'un fichier src/ est modifié

import { watch } from 'fs'
import { execSync } from 'child_process'
import { resolve } from 'path'

const ROOT    = resolve(import.meta.dirname)
const WATCH   = resolve(ROOT, 'src')
const DELAY   = 3000   // ms d'inactivité avant de commiter

let timer = null

function gitPush() {
  try {
    const status = execSync('git status --porcelain', { cwd: ROOT }).toString().trim()
    if (!status) return

    const stamp = new Date().toLocaleTimeString('fr-FR')
    execSync('git add -A', { cwd: ROOT })
    execSync(`git commit -m "auto: sauvegarde ${stamp}"`, { cwd: ROOT })
    execSync('git push origin main', { cwd: ROOT })
    console.log(`✓ [${stamp}] Poussé vers GitHub`)
  } catch (err) {
    console.error('✗ Erreur git :', err.message)
  }
}

watch(WATCH, { recursive: true }, (event, filename) => {
  if (!filename || filename.includes('node_modules')) return
  clearTimeout(timer)
  timer = setTimeout(gitPush, DELAY)
})

console.log(`👀 Surveillance de src/ — auto-push actif (délai ${DELAY/1000}s d'inactivité)`)
