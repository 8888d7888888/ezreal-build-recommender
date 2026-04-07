import { useState, useMemo } from "react";

// --- Champion Database ---
const CHAMPIONS = [
  // Tanks
  { name: "Amumu", key: "Amumu", tags: ["tank"], dmg: "AP" },
  { name: "Cho'Gath", key: "Chogath", tags: ["tank","hp_stacker"], dmg: "AP" },
  { name: "Dr. Mundo", key: "DrMundo", tags: ["tank","hp_stacker"], dmg: "AD" },
  { name: "Galio", key: "Galio", tags: ["tank"], dmg: "AP" },
  { name: "Gragas", key: "Gragas", tags: ["tank","bruiser"], dmg: "AP" },
  { name: "K'Sante", key: "KSante", tags: ["tank"], dmg: "AD" },
  { name: "Leona", key: "Leona", tags: ["tank","support"], dmg: "AP" },
  { name: "Malphite", key: "Malphite", tags: ["tank"], dmg: "AP" },
  { name: "Maokai", key: "Maokai", tags: ["tank","support"], dmg: "AP" },
  { name: "Nautilus", key: "Nautilus", tags: ["tank","support"], dmg: "AP" },
  { name: "Ornn", key: "Ornn", tags: ["tank"], dmg: "mixed" },
  { name: "Rammus", key: "Rammus", tags: ["tank"], dmg: "AP" },
  { name: "Rell", key: "Rell", tags: ["tank","support"], dmg: "AP" },
  { name: "Sejuani", key: "Sejuani", tags: ["tank"], dmg: "AP" },
  { name: "Shen", key: "Shen", tags: ["tank"], dmg: "mixed" },
  { name: "Singed", key: "Singed", tags: ["tank"], dmg: "AP" },
  { name: "Sion", key: "Sion", tags: ["tank","hp_stacker"], dmg: "AD" },
  { name: "Tahm Kench", key: "TahmKench", tags: ["tank","hp_stacker"], dmg: "AP" },
  { name: "Thresh", key: "Thresh", tags: ["tank","support"], dmg: "AP" },
  { name: "Zac", key: "Zac", tags: ["tank","hp_stacker"], dmg: "AP" },
  { name: "Alistar", key: "Alistar", tags: ["tank","support"], dmg: "AP" },
  { name: "Braum", key: "Braum", tags: ["tank","support"], dmg: "mixed" },
  { name: "Poppy", key: "Poppy", tags: ["tank"], dmg: "AD" },

  // Bruisers / Fighters
  { name: "Aatrox", key: "Aatrox", tags: ["bruiser"], dmg: "AD" },
  { name: "Briar", key: "Briar", tags: ["bruiser"], dmg: "AD" },
  { name: "Camille", key: "Camille", tags: ["bruiser"], dmg: "AD" },
  { name: "Darius", key: "Darius", tags: ["bruiser"], dmg: "AD" },
  { name: "Fiora", key: "Fiora", tags: ["bruiser"], dmg: "AD" },
  { name: "Garen", key: "Garen", tags: ["bruiser"], dmg: "AD" },
  { name: "Gwen", key: "Gwen", tags: ["bruiser"], dmg: "AP" },
  { name: "Hecarim", key: "Hecarim", tags: ["bruiser"], dmg: "AD" },
  { name: "Illaoi", key: "Illaoi", tags: ["bruiser"], dmg: "AD" },
  { name: "Irelia", key: "Irelia", tags: ["bruiser"], dmg: "AD" },
  { name: "Jax", key: "Jax", tags: ["bruiser"], dmg: "mixed" },
  { name: "Kled", key: "Kled", tags: ["bruiser"], dmg: "AD" },
  { name: "Lee Sin", key: "LeeSin", tags: ["bruiser"], dmg: "AD" },
  { name: "Mordekaiser", key: "Mordekaiser", tags: ["bruiser"], dmg: "AP" },
  { name: "Nasus", key: "Nasus", tags: ["bruiser","hp_stacker"], dmg: "AD" },
  { name: "Olaf", key: "Olaf", tags: ["bruiser"], dmg: "AD" },
  { name: "Pantheon", key: "Pantheon", tags: ["bruiser"], dmg: "AD" },
  { name: "Renekton", key: "Renekton", tags: ["bruiser"], dmg: "AD" },
  { name: "Riven", key: "Riven", tags: ["bruiser"], dmg: "AD" },
  { name: "Sett", key: "Sett", tags: ["bruiser"], dmg: "AD" },
  { name: "Trundle", key: "Trundle", tags: ["bruiser"], dmg: "AD" },
  { name: "Urgot", key: "Urgot", tags: ["bruiser"], dmg: "AD" },
  { name: "Vi", key: "Vi", tags: ["bruiser"], dmg: "AD" },
  { name: "Volibear", key: "Volibear", tags: ["bruiser"], dmg: "mixed" },
  { name: "Warwick", key: "Warwick", tags: ["bruiser"], dmg: "AD" },
  { name: "Wukong", key: "Wukong", tags: ["bruiser"], dmg: "AD" },
  { name: "Xin Zhao", key: "XinZhao", tags: ["bruiser"], dmg: "AD" },
  { name: "Yorick", key: "Yorick", tags: ["bruiser"], dmg: "AD" },
  { name: "Tryndamere", key: "Tryndamere", tags: ["bruiser"], dmg: "AD" },
  { name: "Ambessa", key: "Ambessa", tags: ["bruiser"], dmg: "AD" },
  { name: "Rengar", key: "Rengar", tags: ["assassin","bruiser"], dmg: "AD" },
  { name: "Jarvan IV", key: "JarvanIV", tags: ["bruiser"], dmg: "AD" },
  { name: "Udyr", key: "Udyr", tags: ["bruiser"], dmg: "mixed" },
  { name: "Bel'Veth", key: "Belveth", tags: ["bruiser"], dmg: "AD" },
  { name: "Naafiri", key: "Naafiri", tags: ["assassin","bruiser"], dmg: "AD" },
  { name: "Yone", key: "Yone", tags: ["bruiser"], dmg: "mixed" },
  { name: "Viego", key: "Viego", tags: ["bruiser"], dmg: "AD" },
  { name: "Nilah", key: "Nilah", tags: ["bruiser","marksman"], dmg: "AD" },
  { name: "Yasuo", key: "Yasuo", tags: ["bruiser"], dmg: "AD" },

  // Assassins
  { name: "Akali", key: "Akali", tags: ["assassin"], dmg: "AP" },
  { name: "Akshan", key: "Akshan", tags: ["assassin","marksman"], dmg: "AD" },
  { name: "Evelynn", key: "Evelynn", tags: ["assassin"], dmg: "AP" },
  { name: "Fizz", key: "Fizz", tags: ["assassin"], dmg: "AP" },
  { name: "Kassadin", key: "Kassadin", tags: ["assassin"], dmg: "AP" },
  { name: "Katarina", key: "Katarina", tags: ["assassin"], dmg: "AP" },
  { name: "Kha'Zix", key: "Khazix", tags: ["assassin"], dmg: "AD" },
  { name: "LeBlanc", key: "Leblanc", tags: ["assassin","mage"], dmg: "AP" },
  { name: "Pyke", key: "Pyke", tags: ["assassin","support"], dmg: "AD" },
  { name: "Qiyana", key: "Qiyana", tags: ["assassin"], dmg: "AD" },
  { name: "Shaco", key: "Shaco", tags: ["assassin"], dmg: "AD" },
  { name: "Talon", key: "Talon", tags: ["assassin"], dmg: "AD" },
  { name: "Zed", key: "Zed", tags: ["assassin"], dmg: "AD" },
  { name: "Diana", key: "Diana", tags: ["assassin"], dmg: "AP" },
  { name: "Ekko", key: "Ekko", tags: ["assassin"], dmg: "AP" },
  { name: "Master Yi", key: "MasterYi", tags: ["assassin"], dmg: "AD" },
  { name: "Nocturne", key: "Nocturne", tags: ["assassin"], dmg: "AD" },

  // Mages
  { name: "Ahri", key: "Ahri", tags: ["mage"], dmg: "AP" },
  { name: "Anivia", key: "Anivia", tags: ["mage"], dmg: "AP" },
  { name: "Annie", key: "Annie", tags: ["mage"], dmg: "AP" },
  { name: "Aurelion Sol", key: "AurelionSol", tags: ["mage"], dmg: "AP" },
  { name: "Azir", key: "Azir", tags: ["mage"], dmg: "AP" },
  { name: "Brand", key: "Brand", tags: ["mage"], dmg: "AP" },
  { name: "Cassiopeia", key: "Cassiopeia", tags: ["mage"], dmg: "AP" },
  { name: "Hwei", key: "Hwei", tags: ["mage"], dmg: "AP" },
  { name: "Karma", key: "Karma", tags: ["mage","support"], dmg: "AP" },
  { name: "Lissandra", key: "Lissandra", tags: ["mage"], dmg: "AP" },
  { name: "Lux", key: "Lux", tags: ["mage","support"], dmg: "AP" },
  { name: "Malzahar", key: "Malzahar", tags: ["mage"], dmg: "AP" },
  { name: "Morgana", key: "Morgana", tags: ["mage","support"], dmg: "AP" },
  { name: "Neeko", key: "Neeko", tags: ["mage"], dmg: "AP" },
  { name: "Orianna", key: "Orianna", tags: ["mage"], dmg: "AP" },
  { name: "Ryze", key: "Ryze", tags: ["mage"], dmg: "AP" },
  { name: "Swain", key: "Swain", tags: ["mage"], dmg: "AP" },
  { name: "Syndra", key: "Syndra", tags: ["mage"], dmg: "AP" },
  { name: "Taliyah", key: "Taliyah", tags: ["mage"], dmg: "AP" },
  { name: "Twisted Fate", key: "TwistedFate", tags: ["mage"], dmg: "AP" },
  { name: "Veigar", key: "Veigar", tags: ["mage"], dmg: "AP" },
  { name: "Vel'Koz", key: "Velkoz", tags: ["mage"], dmg: "AP" },
  { name: "Viktor", key: "Viktor", tags: ["mage"], dmg: "AP" },
  { name: "Vladimir", key: "Vladimir", tags: ["mage"], dmg: "AP" },
  { name: "Xerath", key: "Xerath", tags: ["mage"], dmg: "AP" },
  { name: "Ziggs", key: "Ziggs", tags: ["mage"], dmg: "AP" },
  { name: "Zoe", key: "Zoe", tags: ["mage"], dmg: "AP" },
  { name: "Zyra", key: "Zyra", tags: ["mage","support"], dmg: "AP" },
  { name: "Heimerdinger", key: "Heimerdinger", tags: ["mage"], dmg: "AP" },
  { name: "Kennen", key: "Kennen", tags: ["mage"], dmg: "AP" },
  { name: "Rumble", key: "Rumble", tags: ["mage"], dmg: "AP" },
  { name: "Teemo", key: "Teemo", tags: ["mage"], dmg: "AP" },
  { name: "Sylas", key: "Sylas", tags: ["mage","bruiser"], dmg: "AP" },
  { name: "Aurora", key: "Aurora", tags: ["mage"], dmg: "AP" },
  { name: "Smolder", key: "Smolder", tags: ["mage","marksman"], dmg: "AP" },
  { name: "Mel", key: "Mel", tags: ["mage"], dmg: "AP" },

  // Marksmen
  { name: "Aphelios", key: "Aphelios", tags: ["marksman"], dmg: "AD" },
  { name: "Ashe", key: "Ashe", tags: ["marksman"], dmg: "AD" },
  { name: "Caitlyn", key: "Caitlyn", tags: ["marksman"], dmg: "AD" },
  { name: "Corki", key: "Corki", tags: ["marksman"], dmg: "mixed" },
  { name: "Draven", key: "Draven", tags: ["marksman"], dmg: "AD" },
  { name: "Ezreal", key: "Ezreal", tags: ["marksman"], dmg: "AD" },
  { name: "Jhin", key: "Jhin", tags: ["marksman"], dmg: "AD" },
  { name: "Jinx", key: "Jinx", tags: ["marksman"], dmg: "AD" },
  { name: "Kai'Sa", key: "Kaisa", tags: ["marksman"], dmg: "mixed" },
  { name: "Kalista", key: "Kalista", tags: ["marksman"], dmg: "AD" },
  { name: "Kog'Maw", key: "KogMaw", tags: ["marksman"], dmg: "mixed" },
  { name: "Lucian", key: "Lucian", tags: ["marksman"], dmg: "AD" },
  { name: "Miss Fortune", key: "MissFortune", tags: ["marksman"], dmg: "AD" },
  { name: "Samira", key: "Samira", tags: ["marksman"], dmg: "AD" },
  { name: "Sivir", key: "Sivir", tags: ["marksman"], dmg: "AD" },
  { name: "Tristana", key: "Tristana", tags: ["marksman"], dmg: "AD" },
  { name: "Twitch", key: "Twitch", tags: ["marksman"], dmg: "AD" },
  { name: "Varus", key: "Varus", tags: ["marksman"], dmg: "mixed" },
  { name: "Vayne", key: "Vayne", tags: ["marksman"], dmg: "AD" },
  { name: "Xayah", key: "Xayah", tags: ["marksman"], dmg: "AD" },
  { name: "Zeri", key: "Zeri", tags: ["marksman"], dmg: "AD" },
  { name: "Kindred", key: "Kindred", tags: ["marksman"], dmg: "AD" },
  { name: "Graves", key: "Graves", tags: ["marksman"], dmg: "AD" },
  { name: "Quinn", key: "Quinn", tags: ["marksman"], dmg: "AD" },

  // Enchanters / Supports
  { name: "Janna", key: "Janna", tags: ["enchanter","support"], dmg: "AP" },
  { name: "Lulu", key: "Lulu", tags: ["enchanter","support"], dmg: "AP" },
  { name: "Milio", key: "Milio", tags: ["enchanter","support"], dmg: "AP" },
  { name: "Nami", key: "Nami", tags: ["enchanter","support"], dmg: "AP" },
  { name: "Renata Glasc", key: "Renata", tags: ["enchanter","support"], dmg: "AP" },
  { name: "Senna", key: "Senna", tags: ["enchanter","support","marksman"], dmg: "AD" },
  { name: "Sona", key: "Sona", tags: ["enchanter","support"], dmg: "AP" },
  { name: "Soraka", key: "Soraka", tags: ["enchanter","support"], dmg: "AP" },
  { name: "Yuumi", key: "Yuumi", tags: ["enchanter","support"], dmg: "AP" },
  { name: "Bard", key: "Bard", tags: ["support"], dmg: "AP" },
  { name: "Blitzcrank", key: "Blitzcrank", tags: ["tank","support"], dmg: "AP" },
  { name: "Rakan", key: "Rakan", tags: ["enchanter","support"], dmg: "AP" },

  // Misc
  { name: "Elise", key: "Elise", tags: ["mage","assassin"], dmg: "AP" },
  { name: "Fiddlesticks", key: "Fiddlesticks", tags: ["mage"], dmg: "AP" },
  { name: "Ivern", key: "Ivern", tags: ["enchanter","support"], dmg: "AP" },
  { name: "Kayn", key: "Kayn", tags: ["assassin","bruiser"], dmg: "AD" },
  { name: "Lillia", key: "Lillia", tags: ["mage"], dmg: "AP" },
  { name: "Nidalee", key: "Nidalee", tags: ["mage","assassin"], dmg: "AP" },
  { name: "Nunu & Willump", key: "Nunu", tags: ["tank"], dmg: "AP" },
  { name: "Rek'Sai", key: "RekSai", tags: ["bruiser"], dmg: "AD" },
  { name: "Shyvana", key: "Shyvana", tags: ["bruiser"], dmg: "mixed" },
  { name: "Skarner", key: "Skarner", tags: ["tank"], dmg: "AD" },
  { name: "Taric", key: "Taric", tags: ["tank","support"], dmg: "AP" },
  { name: "Zilean", key: "Zilean", tags: ["mage","support"], dmg: "AP" },
].sort((a, b) => a.name.localeCompare(b.name));

// --- Item Data ---
const DDV = "14.10.1";
const ITEM_IMG = (id) => `https://ddragon.leagueoflegends.com/cdn/${DDV}/img/item/${id}.png`;
const CHAMP_IMG = (key) => `https://ddragon.leagueoflegends.com/cdn/${DDV}/img/champion/${key}.png`;

const ITEMS = {
  dorans: { name: "Doran's Blade", id: "1055" },
  tear: { name: "Tear of the Goddess", id: "3070" },
  sheen: { name: "Sheen", id: "3057" },
  trinity: { name: "Trinity Force", id: "3078" },
  manamune: { name: "Manamune", id: "3004" },
  frozenHeart: { name: "Frozen Heart", id: "3110" },
  maw: { name: "Maw of Malmortius", id: "3156" },
  serylda: { name: "Serylda's Grudge", id: "6694" },
  ldr: { name: "Lord Dominik's Regards", id: "3036" },
  shojin: { name: "Spear of Shojin", id: "3161" },
  bt: { name: "Bloodthirster", id: "3072" },
  endlessHunger: { name: "Endless Hunger", id: "2502" },
};

// --- Build Logic ---
function analyzeBuild(enemies, tempo) {
  if (enemies.length === 0) return null;

  let adCount = 0, apCount = 0, tankCount = 0, bruiserCount = 0, hpStackerCount = 0;

  enemies.forEach((c) => {
    if (c.dmg === "AD") adCount++;
    else if (c.dmg === "AP") apCount++;
    else { adCount += 0.5; apCount += 0.5; }
    if (c.tags.includes("tank")) tankCount++;
    if (c.tags.includes("bruiser")) bruiserCount++;
    if (c.tags.includes("hp_stacker")) hpStackerCount++;
  });

  const total = enemies.length;
  const isFullAD = adCount >= total - 0.5 && apCount <= 0.5;
  const isHeavyAP = apCount >= 3;
  const isTankHeavy = tankCount >= 2;
  const isBruiserHeavy = bruiserCount >= 3;
  const hasHPStackers = hpStackerCount >= 1;
  const ahead = tempo === "ahead";
  const behind = tempo === "behind";

  const core = [ITEMS.trinity, ITEMS.manamune];
  let flex = [];
  let reason = "";
  let tag = "";
  let tempoNote = "";

  // AHEAD: prioritize raw damage, but defensive buys are strongest here too
  if (ahead) {
    if (isFullAD) {
      tag = "AHEAD vs FULL AD";
      flex = [ITEMS.frozenHeart, ITEMS.endlessHunger, ITEMS.bt];
      reason = "You're ahead into full AD — Frozen Heart early is insane here because defensive buys are strongest when you're snowballing. The armor + mana pumps Manamune damage while making you unkillable. Then Endless Hunger → BT to close out with max damage and lifesteal.";
      tempoNote = "Lean into Frozen Heart early — you're ahead so the defensive buy locks in your lead.";
    } else if (isHeavyAP) {
      tag = "AHEAD vs HEAVY AP";
      flex = [ITEMS.maw, ITEMS.endlessHunger, ITEMS.bt];
      reason = "Ahead into heavy AP — grab Maw early to make their burst useless while you're snowballing. Defensive buys are strongest when ahead. Then go full damage with Endless Hunger → BT to run them over.";
      tempoNote = "Maw early locks in your lead — they can't burst through the shield when you're already ahead.";
    } else if (isTankHeavy || hasHPStackers) {
      tag = "AHEAD vs TANKS";
      flex = [ITEMS.endlessHunger, ITEMS.bt, ITEMS.serylda];
      reason = "You're ahead vs tanks — skip defensive items and go straight damage. Endless Hunger → BT gives you the highest DPS to melt through their HP. Serylda last for armor shred to finish them off.";
      tempoNote = "You don't need to rush armor pen when ahead — raw damage outscales their tankiness.";
    } else if (isBruiserHeavy) {
      tag = "AHEAD vs BRUISERS";
      flex = [ITEMS.endlessHunger, ITEMS.bt, ITEMS.shojin];
      reason = "Ahead into bruisers — go Endless Hunger → BT for maximum damage and sustain. You're ahead so you can out-trade them. Shojin last for the ability haste to keep kiting if games go long.";
      tempoNote = "Full damage first — you outstat them when ahead. Shojin insurance if the game stalls.";
    } else {
      tag = "AHEAD — FULL CARRY MODE";
      flex = [ITEMS.endlessHunger, ITEMS.bt, ITEMS.serylda];
      reason = "You're ahead with no extreme threats — go full damage. Endless Hunger → Bloodthirster is the highest DPS carry path. You'll two-shot squishies and lifesteal through anything. Serylda last if anyone builds armor.";
      tempoNote = "This is your strongest tempo build. Don't hesitate — close the game out.";
    }
  }
  // BEHIND: play safe, prioritize defensive + utility items
  else if (behind) {
    if (isFullAD) {
      tag = "BEHIND vs FULL AD";
      flex = [ITEMS.frozenHeart, ITEMS.serylda, ITEMS.endlessHunger];
      reason = "You're behind into full AD — Frozen Heart is your lifeline. The armor keeps you alive and the mana synergizes with Manamune. Then Serylda for armor shred so you stay relevant, and Endless Hunger last for damage when you catch up.";
      tempoNote = "Survive first, damage later. Frozen Heart is non-negotiable here.";
    } else if (isHeavyAP) {
      tag = "BEHIND vs HEAVY AP";
      flex = [ITEMS.maw, ITEMS.serylda, ITEMS.endlessHunger];
      reason = "Behind into heavy AP — Maw is mandatory or you'll get one-shot. The lifeline shield is the only thing keeping you in fights. Serylda next so your Qs still deal meaningful damage, then Endless Hunger to scale back in.";
      tempoNote = "Maw is not optional — you will die without it. Play for poke with Q and don't E forward.";
    } else if (isTankHeavy || hasHPStackers) {
      tag = "BEHIND vs TANKS";
      flex = [ITEMS.serylda, ITEMS.endlessHunger, ITEMS.bt];
      reason = "Behind into tanks — you NEED Serylda's armor shred or your Qs will tickle. Without pen you're useless. Then Endless Hunger + BT to sustain through extended fights as you try to scale back in.";
      tempoNote = "Serylda rush is mandatory — without armor pen you do zero damage to their frontline.";
    } else if (isBruiserHeavy) {
      tag = "BEHIND vs BRUISERS";
      flex = [ITEMS.shojin, ITEMS.serylda, ITEMS.endlessHunger];
      reason = "Behind into bruisers — Shojin gives you the ability haste to kite and survive their dives. Serylda next for armor shred since you can't afford to deal no damage. Endless Hunger last to scale.";
      tempoNote = "Haste and pen keep you relevant. Play for poke and don't commit with E.";
    } else {
      tag = "BEHIND — SAFE SCALING";
      flex = [ITEMS.serylda, ITEMS.endlessHunger, ITEMS.bt];
      reason = "You're behind — prioritize staying relevant. Serylda gives your Qs armor shred to still contribute from range. Then Endless Hunger and BT to scale back into the game through sustain and damage.";
      tempoNote = "Play safe, Q from max range, never E forward. You outscale if you don't feed more.";
    }
  }
  // EVEN: standard matchup-based logic
  else {
    if (isFullAD) {
      tag = "FULL AD ENEMY";
      flex = [ITEMS.frozenHeart, ITEMS.endlessHunger, ITEMS.serylda];
      reason = "Full AD comp detected. Frozen Heart gives massive armor + mana synergy with Manamune. Then scale into damage with Endless Hunger and close out with Serylda for armor shred.";
    } else if (isHeavyAP) {
      tag = "HEAVY AP ENEMY";
      flex = [ITEMS.maw, ITEMS.endlessHunger, ITEMS.ldr];
      reason = "Heavy AP threats on enemy team. Maw gives you a lifeline shield to survive burst. Then Endless Hunger for sustain + damage, and LDR if any frontline is building armor.";
    } else if (isTankHeavy || hasHPStackers) {
      tag = "TANK / HP STACKERS";
      flex = [ITEMS.serylda, ITEMS.endlessHunger, ITEMS.bt];
      reason = "Enemy is stacking HP and armor. Serylda's 3rd gives you armor shred on every Q. Then Endless Hunger + BT for maximum sustained damage and lifesteal to survive extended fights.";
    } else if (isBruiserHeavy) {
      tag = "BRUISER HEAVY";
      flex = [ITEMS.shojin, ITEMS.endlessHunger, ITEMS.bt];
      reason = "Multiple bruisers who will dive you. Spear of Shojin gives ability haste and damage to kite them. Endless Hunger and BT give you the sustain to survive their all-ins.";
    } else {
      tag = "STANDARD / CARRY BUILD";
      flex = [ITEMS.endlessHunger, ITEMS.bt, ITEMS.serylda];
      reason = "No extreme threats — go full damage. Endless Hunger → Bloodthirster is your highest DPS path. Serylda last for armor shred if games go long.";
    }
  }

  return {
    tag,
    reason,
    tempoNote,
    startPath: [ITEMS.dorans, ITEMS.tear, ITEMS.sheen],
    core,
    flex,
    stats: { adCount, apCount, tankCount, bruiserCount, hpStackerCount, total },
  };
}

// --- Components ---
function ItemCard({ item }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 68 }}>
      <div style={{
        width: 52, height: 52, borderRadius: 8,
        border: "2px solid #C89B3C", overflow: "hidden",
        background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {!imgErr ? (
          <img src={ITEM_IMG(item.id)} alt={item.name} width={48} height={48}
            onError={() => setImgErr(true)} style={{ display: "block" }} />
        ) : (
          <div style={{ fontSize: 10, color: "#C89B3C", textAlign: "center", padding: 2 }}>{item.name}</div>
        )}
      </div>
      <span style={{ fontSize: 10, color: "#A09B8C", marginTop: 4, textAlign: "center", lineHeight: "1.2" }}>
        {item.name}
      </span>
    </div>
  );
}

function ChampIcon({ champ, size = 44, onClick, selected, onRemove }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative", cursor: onClick ? "pointer" : "default",
        width: size, height: size, borderRadius: 8, overflow: "visible",
        border: selected ? "2px solid #C89B3C" : "2px solid #3C3C50",
        background: "#1a1a2e", flexShrink: 0,
        transition: "border-color 0.15s",
      }}
    >
      <div style={{ width: size - 4, height: size - 4, overflow: "hidden", borderRadius: 6 }}>
        {!imgErr ? (
          <img src={CHAMP_IMG(champ.key)} alt={champ.name}
            width={size - 4} height={size - 4}
            onError={() => setImgErr(true)}
            style={{ display: "block" }} />
        ) : (
          <div style={{
            width: "100%", height: "100%", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 9, color: "#A09B8C", textAlign: "center", padding: 2
          }}>{champ.name}</div>
        )}
      </div>
      {onRemove && (
        <div
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          style={{
            position: "absolute", top: -6, right: -6, width: 18, height: 18,
            borderRadius: "50%", background: "#E84057", color: "#fff",
            fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontWeight: "bold", lineHeight: 1, border: "2px solid #0A0A13"
          }}
        >x</div>
      )}
    </div>
  );
}

function Arrow() {
  return <span style={{ color: "#C89B3C", fontSize: 20, margin: "0 4px", alignSelf: "center" }}>→</span>;
}

export default function EzrealBuildAdvisor() {
  const [selectedEnemies, setSelectedEnemies] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tempo, setTempo] = useState("even");

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return CHAMPIONS.filter(
      (c) => c.name.toLowerCase().includes(s) && !selectedEnemies.find((e) => e.key === c.key)
    );
  }, [search, selectedEnemies]);

  const addChamp = (c) => {
    if (selectedEnemies.length < 5) {
      setSelectedEnemies([...selectedEnemies, c]);
      setSearch("");
    }
  };
  const removeChamp = (key) => setSelectedEnemies(selectedEnemies.filter((c) => c.key !== key));

  const build = useMemo(() => analyzeBuild(selectedEnemies, tempo), [selectedEnemies, tempo]);

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(180deg, #0A0A13 0%, #101028 100%)",
      color: "#CDBF9B", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: "24px 16px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 12, overflow: "hidden",
            border: "2px solid #C89B3C", flexShrink: 0
          }}>
            <img src={CHAMP_IMG("Ezreal")} alt="Ezreal" width={52} height={52}
              style={{ display: "block" }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, color: "#F0E6D2", letterSpacing: 1 }}>
              EZREAL BUILD ADVISOR
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: "#A09B8C" }}>
              Select the enemy team comp to get your optimal build path
            </p>
          </div>
        </div>
      </div>

      {/* Enemy Team Slots */}
      <div style={{
        background: "#13132B", border: "1px solid #C89B3C33", borderRadius: 12,
        padding: 20, maxWidth: 620, margin: "0 auto 20px",
      }}>
        <div style={{ fontSize: 13, color: "#A09B8C", marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
          Enemy Team ({selectedEnemies.length}/5)
        </div>

        {/* Selected enemies */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16, minHeight: 52, flexWrap: "wrap" }}>
          {selectedEnemies.map((c) => (
            <div key={c.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <ChampIcon champ={c} size={50} onRemove={() => removeChamp(c.key)} />
              <span style={{ fontSize: 10, color: "#A09B8C" }}>{c.name}</span>
            </div>
          ))}
          {Array.from({ length: 5 - selectedEnemies.length }).map((_, i) => (
            <div key={`empty-${i}`} style={{
              width: 50, height: 50, borderRadius: 8, border: "2px dashed #3C3C50",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#3C3C50", fontSize: 20,
            }}>+</div>
          ))}
        </div>

        {/* Search */}
        {selectedEnemies.length < 5 && (
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setDropdownOpen(true); }}
              onFocus={() => setDropdownOpen(true)}
              placeholder="Search champion..."
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 8,
                border: "1px solid #C89B3C55", background: "#0A0A13", color: "#F0E6D2",
                fontSize: 14, outline: "none", boxSizing: "border-box",
              }}
            />
            {dropdownOpen && (
              <div style={{
                position: "absolute", top: "100%", left: 0, right: 0,
                maxHeight: 220, overflowY: "auto", background: "#13132B",
                border: "1px solid #C89B3C55", borderTop: "none", borderRadius: "0 0 8px 8px",
                zIndex: 10,
              }}>
                {filtered.slice(0, 999999).map((c) => (
                  <div
                    key={c.key}
                    onClick={() => { addChamp(c); setDropdownOpen(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 12px", cursor: "pointer",
                      borderBottom: "1px solid #1a1a2e",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#1E1E3A"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <ChampIcon champ={c} size={30} />
                    <span style={{ fontSize: 13, color: "#F0E6D2" }}>{c.name}</span>
                    <span style={{
                      fontSize: 10, color: "#A09B8C", marginLeft: "auto",
                      background: c.dmg === "AP" ? "#3B82F622" : c.dmg === "AD" ? "#EF444422" : "#F59E0B22",
                      color: c.dmg === "AP" ? "#60A5FA" : c.dmg === "AD" ? "#F87171" : "#FBBF24",
                      padding: "2px 8px", borderRadius: 4,
                    }}>{c.dmg}</span>
                    <span style={{ fontSize: 10, color: "#A09B8C" }}>
                      {c.tags[0]}
                    </span>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div style={{ padding: 16, textAlign: "center", color: "#A09B8C", fontSize: 13 }}>
                    No champions found
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {selectedEnemies.length >= 1 && (
          <button
            onClick={() => setSelectedEnemies([])}
            style={{
              marginTop: 12, padding: "6px 16px", borderRadius: 6,
              border: "1px solid #E8405755", background: "transparent",
              color: "#E84057", fontSize: 12, cursor: "pointer",
            }}
          >Clear All</button>
        )}
      </div>

      {/* Tempo Toggle */}
      <div style={{
        background: "#13132B", border: "1px solid #C89B3C33", borderRadius: 12,
        padding: 16, maxWidth: 620, margin: "0 auto 20px",
      }}>
        <div style={{ fontSize: 13, color: "#A09B8C", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
          Game State
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { key: "behind", label: "Behind", icon: "▼", color: "#E84057", desc: "Play safe, defensive buys" },
            { key: "even", label: "Even", icon: "■", color: "#A09B8C", desc: "Standard matchup-based" },
            { key: "ahead", label: "Ahead", icon: "▲", color: "#34D399", desc: "Full damage, snowball" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTempo(t.key)}
              style={{
                flex: 1, padding: "10px 8px", borderRadius: 8, cursor: "pointer",
                border: tempo === t.key ? `2px solid ${t.color}` : "2px solid #3C3C50",
                background: tempo === t.key ? `${t.color}15` : "transparent",
                transition: "all 0.15s",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              }}
            >
              <span style={{ fontSize: 18, color: tempo === t.key ? t.color : "#3C3C50" }}>{t.icon}</span>
              <span style={{
                fontSize: 13, fontWeight: 700, color: tempo === t.key ? t.color : "#A09B8C",
              }}>{t.label}</span>
              <span style={{ fontSize: 10, color: "#A09B8C" }}>{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Build Recommendation */}
      {build && (
        <div style={{
          background: "#13132B", border: "1px solid #C89B3C33", borderRadius: 12,
          padding: 20, maxWidth: 620, margin: "0 auto 20px",
        }}>
          {/* Tag */}
          <div style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 6,
            background: "#C89B3C22", border: "1px solid #C89B3C55",
            color: "#C89B3C", fontSize: 13, fontWeight: 700, letterSpacing: 1,
            marginBottom: 16,
          }}>{build.tag}</div>

          {/* Comp Stats */}
          <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            {[
              { label: "AD", val: build.stats.adCount, color: "#F87171" },
              { label: "AP", val: build.stats.apCount, color: "#60A5FA" },
              { label: "Tanks", val: build.stats.tankCount, color: "#A78BFA" },
              { label: "Bruisers", val: build.stats.bruiserCount, color: "#FB923C" },
              { label: "HP Stack", val: build.stats.hpStackerCount, color: "#34D399" },
            ].map((s) => (
              <div key={s.label} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: `${s.color}11`, padding: "4px 10px", borderRadius: 6,
                border: `1px solid ${s.color}33`,
              }}>
                <span style={{ fontSize: 11, color: "#A09B8C" }}>{s.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.val}</span>
              </div>
            ))}
          </div>

          {/* Start Path */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#A09B8C", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
              Starting Items
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
              {build.startPath.map((item, i) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
                  <ItemCard item={item} />
                  {i < build.startPath.length - 1 && <Arrow />}
                </div>
              ))}
            </div>
          </div>

          {/* Core */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#C89B3C", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
              Core (Never Skip)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
              {build.core.map((item, i) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
                  <ItemCard item={item} />
                  {i < build.core.length - 1 && <Arrow />}
                </div>
              ))}
            </div>
          </div>

          {/* Flex / Situational */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#F0E6D2", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
              Recommended Build Path
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
              {build.flex.map((item, i) => (
                <div key={item.id + i} style={{ display: "flex", alignItems: "center" }}>
                  <ItemCard item={item} />
                  {i < build.flex.length - 1 && <Arrow />}
                </div>
              ))}
            </div>
          </div>

          {/* Reasoning */}
          <div style={{
            background: "#0A0A13", borderRadius: 8, padding: 14,
            border: "1px solid #C89B3C22",
          }}>
            <div style={{ fontSize: 11, color: "#C89B3C", marginBottom: 6, fontWeight: 600 }}>WHY THIS BUILD</div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#A09B8C" }}>
              {build.reason}
            </p>
          </div>

          {/* Tempo-specific tip */}
          {build.tempoNote && (
            <div style={{
              marginTop: 10, background: tempo === "ahead" ? "#34D39911" : tempo === "behind" ? "#E8405711" : "transparent",
              borderRadius: 8, padding: 12,
              border: `1px solid ${tempo === "ahead" ? "#34D39933" : tempo === "behind" ? "#E8405733" : "#C89B3C22"}`,
            }}>
              <div style={{
                fontSize: 11, fontWeight: 600, marginBottom: 4,
                color: tempo === "ahead" ? "#34D399" : tempo === "behind" ? "#E84057" : "#C89B3C",
              }}>
                {tempo === "ahead" ? "▲ TEMPO TIP" : tempo === "behind" ? "▼ SURVIVAL TIP" : "TEMPO TIP"}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "#CDBF9B" }}>
                {build.tempoNote}
              </p>
            </div>
          )}

          {/* Full Path Summary */}
          <div style={{
            marginTop: 16, padding: "10px 14px", background: "#1a1a2e", borderRadius: 8,
            fontSize: 12, color: "#CDBF9B", lineHeight: 1.8,
          }}>
            <span style={{ fontWeight: 700, color: "#C89B3C" }}>Full path: </span>
            {[...build.startPath, ...build.core, ...build.flex].map((item, i, arr) => (
              <span key={i}>
                {item.name}{i < arr.length - 1 ? " → " : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      {!build && (
        <div style={{
          textAlign: "center", color: "#3C3C50", fontSize: 14,
          maxWidth: 620, margin: "40px auto",
        }}>
          Select at least one enemy champion above to see your recommended build.
        </div>
      )}

      <div style={{
        textAlign: "center", fontSize: 10, color: "#3C3C50",
        maxWidth: 620, margin: "20px auto 0",
      }}>
        Core path is always Trinity Force → Manamune. Never sell Doran's Blade until final item slot.
        <br />Don't forget to Q Krugs/Gromp on your way back to lane.
      </div>
    </div>
  );
}
