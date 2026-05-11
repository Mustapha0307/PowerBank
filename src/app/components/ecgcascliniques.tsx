import { useState } from "react";

const cases = [
  {
    id: 1,
    difficulty: "facile",
    difficultyColor: "#22c55e",
    title: "Cas 1 — Fibrillation Auriculaire",
    patient: {
      age: "68 ans",
      sexe: "Homme",
      symptomes: "Palpitations depuis 3 heures, légère dyspnée, sans douleur thoracique",
      contexte: "Antécédents d'HTA. Aux urgences, FC à 110 bpm irrégulière.",
    },
    ecg: {
      rythme: "Irrégulier, absence totale d'ondes P organisées",
      ondeP: "Absente — remplacée par des oscillations fibrillantes (f) à 350–600/min",
      qrs: "Fins (< 120 ms), morphologie normale, intervalles R-R irréguliers",
      st: "Isoélectrique, pas de sus/sous-décalage",
      ondeT: "Normale",
      fc: "~110 bpm (variable)",
      visualHint: "Ligne de base chaotique et trémulante, QRS fins et irréguliers, pas d'onde P visible",
    },
    waveform: "fa",
    questions: [
      "Quel est le rythme ? Régulier ou irrégulier ?",
      "Y a-t-il des ondes P visibles ? Si non, que voyez-vous ?",
      "Le complexe QRS est-il fin ou large ?",
      "Y a-t-il un sus-décalage ou sous-décalage du segment ST ?",
      "Quel est votre diagnostic final ?",
    ],
    solution: [
      "Rythme : Absolument IRRÉGULIER — c'est la clé de la FA",
      "Onde P : Absente → remplacée par des ondulations fibrillantes sur la ligne de base",
      "QRS : Fins (< 120 ms) → l'influx est conduit normalement dans les ventricules",
      "Segment ST : Normal → pas d'ischémie associée ici",
      "Conclusion : FA à réponse ventriculaire rapide (> 100 bpm)",
    ],
    diagnosis: "Fibrillation Auriculaire (FA) à réponse ventriculaire rapide",
    trap: "⚠️ Piège classique : confondre FA et Flutter auriculaire. Dans le Flutter, la ligne de base montre des ondes F régulières 'en dents de scie' à 300/min, avec bloc 2:1 ou 4:1 — le rythme ventriculaire peut paraître régulier !",
    tip: "🧠 Mémo : FA = Fibrillante et Anarchique. Pas d'onde P + irrégulier = FA jusqu'à preuve du contraire.",
    normal_vs_abnormal: [
      { parametre: "Onde P", normal: "Présente, positive en D2", anormal: "Absente, remplacée par ondulations" },
      { parametre: "Rythme", normal: "Régulier sinusal", anormal: "Totalement irrégulier" },
      { parametre: "Ligne de base", normal: "Isoélectrique stable", anormal: "Trémulante et chaotique" },
    ],
  },
  {
    id: 2,
    difficulty: "facile",
    difficultyColor: "#22c55e",
    title: "Cas 2 — Bradycardie Sinusale",
    patient: {
      age: "45 ans",
      sexe: "Femme",
      symptomes: "Fatigue chronique, vertiges en se levant, sans syncope",
      contexte: "Athlète de haut niveau, traitement par bêtabloquant pour HTA.",
    },
    ecg: {
      rythme: "Régulier, sinusal",
      ondeP: "Présente, positive en D2, précède chaque QRS",
      qrs: "Fins (< 120 ms), morphologie normale",
      st: "Normal, isoélectrique",
      ondeT: "Normale",
      fc: "42 bpm",
      visualHint: "Ondes P normales bien espacées, QRS fins, intervalles R-R très larges — rythme lent et régulier",
    },
    waveform: "brady",
    questions: [
      "Quel est le rythme ? Régulier ou irrégulier ?",
      "Y a-t-il une onde P avant chaque QRS ?",
      "Quelle est la fréquence cardiaque ?",
      "Y a-t-il un trouble de conduction (allongement PR, QRS large) ?",
      "Quel est votre diagnostic final ?",
    ],
    solution: [
      "Rythme : Régulier, sinusal (onde P → QRS → T normal)",
      "Onde P : Présente avant chaque QRS → l'origine est bien sinusale",
      "Fréquence : 42 bpm → < 60 bpm = bradycardie",
      "PR et QRS : Normaux → pas de bloc auriculo-ventriculaire associé",
      "Contexte : Sportive + bêtabloquant → bradycardie probablement physiologique + médicamenteuse",
    ],
    diagnosis: "Bradycardie Sinusale (FC 42 bpm) — contexte physiologique et iatrogène",
    trap: "⚠️ Piège : Ne pas confondre bradycardie sinusale et bloc AV du 3e degré. Dans le BAV complet, les ondes P et QRS sont DISSOCIÉES — il y a plus d'ondes P que de QRS.",
    tip: "🧠 Mémo : FC < 60 + onde P avant chaque QRS + PR normal = Bradycardie Sinusale. Chercher la cause : médicament, hypothyroïdie, sportif.",
    normal_vs_abnormal: [
      { parametre: "Fréquence cardiaque", normal: "60–100 bpm", anormal: "< 60 bpm (bradycardie)" },
      { parametre: "Intervalle R-R", normal: "Espacé de ~0,8-1s", anormal: "Très long (> 1,4s)" },
      { parametre: "Onde P/QRS", normal: "Rapport 1:1", anormal: "1:1 conservé (≠ BAV complet)" },
    ],
  },
  {
    id: 3,
    difficulty: "moyen",
    difficultyColor: "#f59e0b",
    title: "Cas 3 — STEMI Inférieur (SCA ST+)",
    patient: {
      age: "58 ans",
      sexe: "Homme",
      symptomes: "Douleur thoracique rétrosternale irradiant en mâchoire depuis 40 minutes, sueurs, nausées",
      contexte: "Diabétique, fumeur, dyslipidémique. Admis en SAMU. TA 90/60 mmHg.",
    },
    ecg: {
      rythme: "Sinusal régulier",
      ondeP: "Présente et normale",
      qrs: "Ondes Q de nécrose en D2, D3, aVF",
      st: "Sus-décalage ST en D2, D3, aVF (≥ 2mm) + image en miroir : sous-décalage en D1, aVL",
      ondeT: "Ondes T hyperaiguës débutantes en D2, D3, aVF",
      fc: "88 bpm",
      visualHint: "Sus-décalage ST marqué en territoire inférieur (D2-D3-aVF), image miroir en D1-aVL, ondes Q naissantes",
    },
    waveform: "stemi",
    questions: [
      "Y a-t-il un sus-décalage du ST ? Dans quelles dérivations ?",
      "Y a-t-il une image en miroir ? Où ?",
      "Y a-t-il des ondes Q de nécrose ?",
      "Quel territoire coronaire est atteint ?",
      "Quel est le diagnostic et la prise en charge urgente ?",
    ],
    solution: [
      "Sus-décalage ST : Oui, en D2, D3, aVF → territoire INFÉRIEUR",
      "Image miroir : Sous-décalage en D1 et aVL → confirme STEMI inférieur",
      "Ondes Q : Présentes en D2, D3, aVF → nécrose débutante (transmural)",
      "Coronaire responsable : Coronaire droite (CD) dans 80% des cas",
      "Urgence absolue : STEMI → activation coronarographie + angioplastie primaire < 90 min",
    ],
    diagnosis: "STEMI Inférieur — Occlusion de la Coronaire Droite — URGENCE vitale",
    trap: "⚠️ Pièges multiples : (1) Toujours rechercher l'image en miroir pour confirmer ! (2) Faire des dérivations droites (V3R-V4R) pour éliminer une extension au VD — modifie la prise en charge (contre-indication aux dérivés nitrés !). (3) Chez le diabétique : douleur atypique fréquente voire absente.",
    tip: "🧠 Mémo : Sus-ST en D2D3aVF + miroir en D1aVL = STEMI INFÉRIEUR. CD occluse. Penser VD ! Dérivations droites obligatoires.",
    normal_vs_abnormal: [
      { parametre: "Segment ST", normal: "Isoélectrique (± 0,5mm)", anormal: "Sus-décalage ≥ 1-2 mm" },
      { parametre: "Onde Q", normal: "Absente ou < 40ms et < 25% R", anormal: "Large, profonde = nécrose" },
      { parametre: "Image miroir", normal: "Absente", anormal: "Sous-décalage en regard = confirme STEMI" },
    ],
  },
  {
    id: 4,
    difficulty: "moyen",
    difficultyColor: "#f59e0b",
    title: "Cas 4 — Tachycardie Supraventriculaire (TSV)",
    patient: {
      age: "32 ans",
      sexe: "Femme",
      symptomes: "Palpitations brutales à début et fin brusques, légère dyspnée, sans douleur thoracique",
      contexte: "Pas d'antécédents cardiaques. Étudiante en médecine stressée. FC 178 bpm régulière.",
    },
    ecg: {
      rythme: "Régulier, rapide",
      ondeP: "Absente (cachée dans le QRS ou juste après) — non visible",
      qrs: "Fins (< 120 ms) et réguliers — morphologie normale",
      st: "Peut montrer un sous-décalage fonctionnel (non ischémique)",
      ondeT: "Peut être inversée fonctionnellement à haute fréquence",
      fc: "178 bpm",
      visualHint: "QRS fins rapides et réguliers, pas d'onde P visible, très haute fréquence > 150 bpm",
    },
    waveform: "tsv",
    questions: [
      "Le rythme est-il régulier ou irrégulier ?",
      "Les QRS sont-ils fins ou larges ? Que cela indique-t-il ?",
      "Y a-t-il des ondes P visibles ?",
      "Comment différencier TSV et Tachycardie Ventriculaire ?",
      "Quel traitement en urgence ?",
    ],
    solution: [
      "Rythme : Régulier et rapide (178 bpm) → pas une FA",
      "QRS fins : < 120 ms → conduction ventriculaire normale → origine SUPRAVENTRICULAIRE",
      "Onde P : Absente ou rétrograde → réentrée auriculo-nodale probable (TRIN)",
      "≠ TV : La TV donne des QRS LARGES (≥ 120 ms) — règle d'or !",
      "Traitement : Manœuvres vagales (Valsalva modifié) → si échec : Adénosine IV 6mg en bolus rapide",
    ],
    diagnosis: "Tachycardie Supraventriculaire (TSV) — Probablement TRIN (Tachycardie par Réentrée Intra-Nodale)",
    trap: "⚠️ Piège majeur : TSV avec aberration de conduction peut mimer une TV (QRS larges). Règle : QRS larges + hémodynamique instable = traiter comme TV ! Ne jamais donner du vérapamil sur une TV — risque d'arrêt cardiaque.",
    tip: "🧠 Mémo : QRS FINS + Régulier + Rapide = TSV. QRS LARGES + Rapide = TV jusqu'à preuve du contraire. Valsalva > Adénosine > Cardioversion.",
    normal_vs_abnormal: [
      { parametre: "Fréquence", normal: "60–100 bpm", anormal: "> 150 bpm (tachycardie)" },
      { parametre: "Largeur QRS", normal: "< 120 ms (fin)", anormal: "Fin = SV ; Large = V" },
      { parametre: "Onde P", normal: "Avant chaque QRS, PR 120-200ms", anormal: "Absente ou rétrograde" },
    ],
  },
  {
    id: 5,
    difficulty: "difficile",
    difficultyColor: "#ef4444",
    title: "Cas 5 — Bloc AV du 3e degré (BAV Complet)",
    patient: {
      age: "74 ans",
      sexe: "Homme",
      symptomes: "Syncope de 30 secondes, prodromes absents, reprise spontanée. Confusion post-critique.",
      contexte: "Coronarien connu, post-STEMI inférieur il y a 2 semaines. FC perçue à 36 bpm.",
    },
    ecg: {
      rythme: "Double rythme : auriculaire régulier (80/min) + ventriculaire régulier mais lent (36/min)",
      ondeP: "Présente, régulière à 80/min, MAIS sans aucune relation avec les QRS",
      qrs: "Larges (≥ 120 ms) — rythme d'échappement jonctionnel ou ventriculaire",
      st: "Variable selon dérivations",
      ondeT: "Peut être discordante au QRS large",
      fc: "36 bpm (rythme d'échappement)",
      visualHint: "Ondes P régulières 'marchant librement' sans lien avec les QRS larges lents — dissociation auriculo-ventriculaire complète",
    },
    waveform: "bav3",
    questions: [
      "Y a-t-il une relation entre les ondes P et les QRS ?",
      "Compter séparément : quelle est la fréquence auriculaire ? Ventriculaire ?",
      "Les QRS sont-ils fins ou larges ? Que cela implique-t-il ?",
      "Quel est le site du bloc ? Quel est le pronostic ?",
      "Quelle est la prise en charge d'urgence ?",
    ],
    solution: [
      "Relation P-QRS : AUCUNE — dissociation AV complète. Les P et QRS 'marchent' indépendamment",
      "Fréquences : Auriculaire 80/min (normal) / Ventriculaire 36/min (rythme d'échappement)",
      "QRS larges : ≥ 120 ms → bloc infra-hissien → rythme ventriculaire → MOINS FIABLE, risque d'asystolie++",
      "Site : Post-STEMI inférieur → souvent transitoire si atteinte du NAV / permanent si infra-hissien",
      "Urgence : Atropine IV (si jonctionnel) ou isoprénaline + stimulation transcutanée + PM définitif",
    ],
    diagnosis: "Bloc Auriculo-Ventriculaire du 3e degré (BAV Complet) — post-STEMI — URGENCE pacemaker",
    trap: "⚠️ Pièges : (1) Confondre BAV 3 et BAV 2 Mobitz II : dans le Mobitz II, il y a des ondes P qui ne sont pas suivies de QRS mais le PR des complexes conduits est FIXE. (2) Ne pas confondre avec dissociation isorhythmique (rythme AV et ventriculaire presque identiques — bénin). (3) QRS larges = site bas = danger → PM urgent.",
    tip: "🧠 Mémo : BAV 3 = P et QRS divorcent. Comptez-les séparément. QRS larges = urgence pacemaker. Ne jamais manquer la dissociation AV !",
    normal_vs_abnormal: [
      { parametre: "Relation P-QRS", normal: "1 P pour 1 QRS, PR fixe 120-200ms", anormal: "Aucune relation — dissociation complète" },
      { parametre: "Fréquence ventriculaire", normal: "60–100 bpm (conduite)", anormal: "20–45 bpm (échappement)" },
      { parametre: "Largeur QRS", normal: "< 120 ms", anormal: "≥ 120 ms si bloc infra-hissien" },
    ],
  },
];

function ECGWaveform({ type }) {
  const svgProps = { viewBox: "0 0 400 100", className: "w-full h-20", style: { filter: "drop-shadow(0 0 6px #00ff88)" } };

  if (type === "fa") {
    // Fibrillation auriculaire: chaotic baseline + irregular narrow QRS
    const points = [];
    for (let x = 0; x < 400; x += 2) {
      const noise = (Math.sin(x * 0.8) * 3 + Math.sin(x * 1.3) * 2 + Math.sin(x * 2.1) * 1.5);
      points.push(`${x},${50 + noise}`);
    }
    const qrsPositions = [40, 90, 130, 185, 230, 275, 310, 360];
    return (
      <svg {...svgProps}>
        <polyline points={points.join(" ")} fill="none" stroke="#00ff88" strokeWidth="1.5" opacity="0.7" />
        {qrsPositions.map((x, i) => (
          <g key={i}>
            <line x1={x} y1={50} x2={x} y2={50} stroke="#00ff88" strokeWidth="1.5" />
            <polyline points={`${x-3},50 ${x},50 ${x+1},20 ${x+2},70 ${x+4},48 ${x+10},50`} fill="none" stroke="#00ff88" strokeWidth="2" />
          </g>
        ))}
      </svg>
    );
  }

  if (type === "brady") {
    // Normal sinus but slow — few QRS complexes, wide R-R
    const beats = [60, 210, 360];
    return (
      <svg {...svgProps}>
        <line x1="0" y1="50" x2="400" y2="50" stroke="#00ff88" strokeWidth="1" opacity="0.3" />
        {beats.map((x, i) => (
          <g key={i}>
            <polyline points={`${x-20},50 ${x-10},46 ${x-5},50 ${x},20 ${x+3},75 ${x+6},50 ${x+18},55 ${x+25},50 ${x+60},50`} fill="none" stroke="#00ff88" strokeWidth="2" />
          </g>
        ))}
      </svg>
    );
  }

  if (type === "stemi") {
    // STEMI pattern: ST elevation visible
    const beats = [50, 210, 360];
    return (
      <svg {...svgProps}>
        <line x1="0" y1="50" x2="400" y2="50" stroke="#00ff88" strokeWidth="1" opacity="0.3" />
        {beats.map((x, i) => (
          <g key={i}>
            {/* Q wave, QRS, ST elevation, T wave */}
            <polyline
              points={`${x-25},50 ${x-10},50 ${x-5},55 ${x},18 ${x+4},78 ${x+8},32 ${x+18},28 ${x+30},50 ${x+50},50`}
              fill="none" stroke="#ff4444" strokeWidth="2.5"
            />
          </g>
        ))}
        <text x="10" y="15" fill="#ff4444" fontSize="9" fontFamily="monospace">Sus-ST ↑</text>
      </svg>
    );
  }

  if (type === "tsv") {
    // SVT: narrow QRS, rapid, no visible P
    const beats = Array.from({ length: 14 }, (_, i) => 15 + i * 27);
    return (
      <svg {...svgProps}>
        <line x1="0" y1="50" x2="400" y2="50" stroke="#00ff88" strokeWidth="1" opacity="0.3" />
        {beats.map((x, i) => (
          <polyline key={i} points={`${x-5},50 ${x},18 ${x+2},75 ${x+5},50`} fill="none" stroke="#00ff88" strokeWidth="2" />
        ))}
      </svg>
    );
  }

  if (type === "bav3") {
    // BAV3: P waves marching independently, slow wide QRS
    const pWaves = [20, 65, 110, 155, 200, 245, 290, 335, 380];
    const qrsBeat = [50, 165, 280, 370];
    return (
      <svg {...svgProps}>
        <line x1="0" y1="50" x2="400" y2="50" stroke="#00ff88" strokeWidth="1" opacity="0.2" />
        {pWaves.map((x, i) => (
          <polyline key={`p${i}`} points={`${x-5},50 ${x},43 ${x+5},50`} fill="none" stroke="#60a5fa" strokeWidth="1.8" />
        ))}
        {qrsBeat.map((x, i) => (
          <polyline key={`q${i}`} points={`${x-8},50 ${x-4},55 ${x},15 ${x+5},80 ${x+10},45 ${x+22},55 ${x+30},50`} fill="none" stroke="#f97316" strokeWidth="2.5" />
        ))}
        <text x="5" y="12" fill="#60a5fa" fontSize="8" fontFamily="monospace">P indép.</text>
        <text x="5" y="22" fill="#f97316" fontSize="8" fontFamily="monospace">QRS larges</text>
      </svg>
    );
  }

  return null;
}

function DifficultyBadge({ level, color }) {
  return (
    <span style={{
      background: color + "22",
      color: color,
      border: `1px solid ${color}55`,
      borderRadius: "4px",
      padding: "2px 10px",
      fontSize: "11px",
      fontFamily: "monospace",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    }}>
      {level}
    </span>
  );
}

function ComparisonTable({ rows }) {
  return (
    <div style={{ overflowX: "auto", marginTop: "8px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", fontFamily: "monospace" }}>
        <thead>
          <tr>
            {["Paramètre", "Normal ✓", "Anormal ✗"].map((h, i) => (
              <th key={i} style={{
                background: i === 0 ? "#1a1a2e" : i === 1 ? "#00ff8811" : "#ff444411",
                color: i === 0 ? "#888" : i === 1 ? "#22c55e" : "#ef4444",
                padding: "6px 10px",
                border: "1px solid #ffffff11",
                textAlign: "left",
                fontWeight: 700,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#0d0d1a" : "#111127" }}>
              <td style={{ padding: "5px 10px", border: "1px solid #ffffff0a", color: "#c0c0d0" }}>{r.parametre}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ffffff0a", color: "#22c55e" }}>{r.normal}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ffffff0a", color: "#ef4444" }}>{r.anormal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ECGApp() {
  const [activeCase, setActiveCase] = useState(0);
  const [revealedSteps, setRevealedSteps] = useState({});
  const [showSolution, setShowSolution] = useState({});
  const [showComparison, setShowComparison] = useState({});
  const [showTrap, setShowTrap] = useState({});
  const [answeredQ, setAnsweredQ] = useState({});

  const c = cases[activeCase];
  const cid = c.id;

  const toggleStep = (step) => {
    setRevealedSteps(prev => ({ ...prev, [`${cid}-${step}`]: !prev[`${cid}-${step}`] }));
  };
  const toggleSolution = () => setShowSolution(prev => ({ ...prev, [cid]: !prev[cid] }));
  const toggleComparison = () => setShowComparison(prev => ({ ...prev, [cid]: !prev[cid] }));
  const toggleTrap = () => setShowTrap(prev => ({ ...prev, [cid]: !prev[cid] }));
  const toggleQ = (qi) => setAnsweredQ(prev => ({ ...prev, [`${cid}-${qi}`]: !prev[`${cid}-${qi}`] }));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#07070f",
      color: "#e0e0f0",
      fontFamily: "'Courier New', monospace",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d0d1f 0%, #111130 100%)",
        borderBottom: "1px solid #00ff8822",
        padding: "20px 24px 16px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 22, lineHeight: 1 }}>🫀</span>
            <h1 style={{
              fontSize: "clamp(16px, 3vw, 22px)",
              fontWeight: 900,
              letterSpacing: "0.05em",
              color: "#00ff88",
              margin: 0,
              textShadow: "0 0 20px #00ff8855",
            }}>ECG — Cas Cliniques</h1>
            <span style={{ fontSize: 11, color: "#666", marginLeft: "auto", textTransform: "uppercase", letterSpacing: "0.1em" }}>Préparation Examen</span>
          </div>
          {/* Case selector */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            {cases.map((ca, i) => (
              <button key={i} onClick={() => setActiveCase(i)} style={{
                background: activeCase === i ? ca.difficultyColor + "22" : "#0d0d1a",
                border: `1px solid ${activeCase === i ? ca.difficultyColor : "#333"}`,
                borderRadius: 6,
                color: activeCase === i ? ca.difficultyColor : "#666",
                padding: "5px 12px",
                fontSize: 11,
                fontFamily: "monospace",
                cursor: "pointer",
                fontWeight: activeCase === i ? 700 : 400,
                transition: "all 0.2s",
                letterSpacing: "0.05em",
              }}>
                Cas {ca.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* Case Header */}
        <div style={{
          background: "linear-gradient(135deg, #111127, #0d0d20)",
          border: `1px solid ${c.difficultyColor}33`,
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <h2 style={{ margin: 0, fontSize: "clamp(15px, 2.5vw, 19px)", color: "#fff", fontWeight: 800 }}>{c.title}</h2>
            <DifficultyBadge level={c.difficulty} color={c.difficultyColor} />
          </div>
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
            {[
              { label: "Patient", val: `${c.patient.age}, ${c.patient.sexe}` },
              { label: "Symptômes", val: c.patient.symptomes },
              { label: "Contexte", val: c.patient.contexte },
            ].map((item, i) => (
              <div key={i} style={{ background: "#0a0a18", borderRadius: 8, padding: "10px 14px", border: "1px solid #ffffff08" }}>
                <div style={{ fontSize: 10, color: "#00ff8877", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: "#c0c0d8", lineHeight: 1.5 }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ECG Waveform + Description */}
        <div style={{
          background: "#060612",
          border: "1px solid #00ff8822",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 10, color: "#00ff8899", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>📈 Tracé ECG simulé</div>
          <div style={{
            background: "#02020d",
            borderRadius: 8,
            padding: "12px 8px",
            border: "1px solid #00ff8811",
            marginBottom: 14,
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Grid lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${i * 10}%`,
                top: 0,
                bottom: 0,
                borderLeft: "1px solid #00ff8808",
                pointerEvents: "none",
              }} />
            ))}
            <ECGWaveform type={c.waveform} />
          </div>
          <div style={{ fontSize: 11, color: "#a0a0c0", fontStyle: "italic", marginBottom: 14, padding: "8px 12px", background: "#0a0a1a", borderRadius: 6, border: "1px solid #ffffff08" }}>
            💡 {c.ecg.visualHint}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
            {[
              { k: "Rythme", v: c.ecg.rythme },
              { k: "Onde P", v: c.ecg.ondeP },
              { k: "QRS", v: c.ecg.qrs },
              { k: "Segment ST", v: c.ecg.st },
              { k: "Onde T", v: c.ecg.ondeT },
              { k: "Fréquence", v: c.ecg.fc },
            ].map((item, i) => (
              <div key={i} style={{ background: "#0a0a1a", borderRadius: 6, padding: "8px 12px", border: "1px solid #ffffff06" }}>
                <span style={{ color: "#00ff8866", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.k} : </span>
                <span style={{ color: "#d0d0e8", fontSize: 11 }}>{item.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Questions interactives */}
        <div style={{
          background: "#0d0d20",
          border: "1px solid #60a5fa22",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 10, color: "#60a5fa99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>❓ Questions d'analyse</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {c.questions.map((q, qi) => (
              <div key={qi} style={{
                background: answeredQ[`${cid}-${qi}`] ? "#0a1a0a" : "#090915",
                border: `1px solid ${answeredQ[`${cid}-${qi}`] ? "#22c55e33" : "#ffffff0a"}`,
                borderRadius: 8,
                padding: "10px 14px",
                cursor: "pointer",
                transition: "all 0.2s",
              }} onClick={() => toggleQ(qi)}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 22, height: 22,
                    borderRadius: "50%",
                    background: answeredQ[`${cid}-${qi}`] ? "#22c55e22" : "#ffffff0a",
                    border: `1px solid ${answeredQ[`${cid}-${qi}`] ? "#22c55e" : "#444"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: answeredQ[`${cid}-${qi}`] ? "#22c55e" : "#666",
                    flexShrink: 0,
                    fontWeight: 700,
                  }}>{answeredQ[`${cid}-${qi}`] ? "✓" : qi + 1}</span>
                  <span style={{ fontSize: 12, color: answeredQ[`${cid}-${qi}`] ? "#86efac" : "#b0b0cc", lineHeight: 1.4 }}>{q}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "#666", marginTop: 8, textAlign: "center" }}>Cliquez pour marquer une question comme traitée</div>
        </div>

        {/* Solution étape par étape */}
        <div style={{
          background: "#0d0d20",
          border: "1px solid #a78bfa22",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 16,
        }}>
          <button onClick={toggleSolution} style={{
            background: "none",
            border: "none",
            color: "#a78bfa",
            fontSize: 12,
            fontFamily: "monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: 0,
            width: "100%",
          }}>
            <span style={{ fontSize: 10 }}>🔍</span>
            Solution étape par étape
            <span style={{ marginLeft: "auto", fontSize: 14 }}>{showSolution[cid] ? "▲" : "▼"}</span>
          </button>
          {showSolution[cid] && (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {c.solution.map((step, si) => (
                  <div key={si} style={{
                    display: "flex",
                    gap: 10,
                    background: "#090914",
                    borderRadius: 6,
                    padding: "8px 12px",
                    border: "1px solid #a78bfa11",
                    cursor: "pointer",
                    opacity: revealedSteps[`${cid}-${si}`] ? 1 : 0.5,
                    transition: "opacity 0.2s",
                  }} onClick={() => toggleStep(si)}>
                    <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>Étape {si + 1}</span>
                    <span style={{ fontSize: 12, color: revealedSteps[`${cid}-${si}`] ? "#c8c8e0" : "#44444a", lineHeight: 1.5, transition: "color 0.3s" }}>
                      {revealedSteps[`${cid}-${si}`] ? step : "▪ ▪ ▪ cliquez pour révéler"}
                    </span>
                  </div>
                ))}
              </div>
              {/* Final diagnosis */}
              <div style={{
                marginTop: 14,
                background: "linear-gradient(135deg, #001a0d, #00110a)",
                border: "1px solid #22c55e44",
                borderRadius: 8,
                padding: "12px 16px",
              }}>
                <div style={{ fontSize: 10, color: "#22c55e88", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>✅ Diagnostic Final</div>
                <div style={{ fontSize: 13, color: "#86efac", fontWeight: 700, lineHeight: 1.5 }}>{c.diagnosis}</div>
              </div>
            </div>
          )}
        </div>

        {/* Piège & Conseil */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{
            background: "#1a0d0d",
            border: "1px solid #ef444422",
            borderRadius: 12,
            padding: "14px 16px",
          }}>
            <button onClick={toggleTrap} style={{
              background: "none", border: "none", color: "#ef4444",
              fontSize: 11, fontFamily: "monospace", letterSpacing: "0.08em",
              textTransform: "uppercase", cursor: "pointer", padding: 0,
              display: "flex", alignItems: "center", gap: 6, width: "100%",
            }}>
              ⚠️ Pièges & Erreurs
              <span style={{ marginLeft: "auto" }}>{showTrap[cid] ? "▲" : "▼"}</span>
            </button>
            {showTrap[cid] && (
              <div style={{ marginTop: 10, fontSize: 11, color: "#fca5a5", lineHeight: 1.6 }}>{c.trap}</div>
            )}
          </div>
          <div style={{
            background: "#0a1a0d",
            border: "1px solid #22c55e22",
            borderRadius: 12,
            padding: "14px 16px",
          }}>
            <div style={{ fontSize: 10, color: "#22c55e88", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>🧠 Mémo Examen</div>
            <div style={{ fontSize: 11, color: "#86efac", lineHeight: 1.6 }}>{c.tip}</div>
          </div>
        </div>

        {/* Comparaison Normal vs Anormal */}
        <div style={{
          background: "#0d0d20",
          border: "1px solid #ffffff11",
          borderRadius: 12,
          padding: "14px 18px",
          marginBottom: 20,
        }}>
          <button onClick={toggleComparison} style={{
            background: "none", border: "none", color: "#94a3b8",
            fontSize: 11, fontFamily: "monospace", letterSpacing: "0.1em",
            textTransform: "uppercase", cursor: "pointer", padding: 0,
            display: "flex", alignItems: "center", gap: 6, width: "100%",
          }}>
            📊 Normal vs Anormal
            <span style={{ marginLeft: "auto" }}>{showComparison[cid] ? "▲" : "▼"}</span>
          </button>
          {showComparison[cid] && <ComparisonTable rows={c.normal_vs_abnormal} />}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <button
            onClick={() => setActiveCase(Math.max(0, activeCase - 1))}
            disabled={activeCase === 0}
            style={{
              background: activeCase === 0 ? "#0d0d1a" : "#111130",
              border: `1px solid ${activeCase === 0 ? "#222" : "#00ff8833"}`,
              borderRadius: 8,
              color: activeCase === 0 ? "#333" : "#00ff88",
              padding: "10px 20px",
              fontSize: 12,
              fontFamily: "monospace",
              cursor: activeCase === 0 ? "not-allowed" : "pointer",
              letterSpacing: "0.05em",
            }}>
            ← Cas précédent
          </button>
          <div style={{ fontSize: 11, color: "#444", alignSelf: "center", fontFamily: "monospace" }}>
            {activeCase + 1} / {cases.length}
          </div>
          <button
            onClick={() => setActiveCase(Math.min(cases.length - 1, activeCase + 1))}
            disabled={activeCase === cases.length - 1}
            style={{
              background: activeCase === cases.length - 1 ? "#0d0d1a" : "#111130",
              border: `1px solid ${activeCase === cases.length - 1 ? "#222" : "#00ff8833"}`,
              borderRadius: 8,
              color: activeCase === cases.length - 1 ? "#333" : "#00ff88",
              padding: "10px 20px",
              fontSize: 12,
              fontFamily: "monospace",
              cursor: activeCase === cases.length - 1 ? "not-allowed" : "pointer",
              letterSpacing: "0.05em",
            }}>
            Cas suivant →
          </button>
        </div>
      </div>
    </div>
  );
}
