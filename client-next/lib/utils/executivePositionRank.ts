type RankedMember = {
  position: string;
  fullName: string;
};

export function getExecutivePositionRank(position: string): number {
  const value = position.trim().toLowerCase();

  if (!value) return 99;

  const isPresident = /president/.test(value) && !/vice|vp/.test(value);
  if (isPresident || value === "executive president") {
    return 0;
  }

  if (/vice\s*president|^vp\b|vp\s+for/.test(value)) {
    return 1;
  }

  if (/secretary/.test(value)) {
    return 2;
  }

  if (/treasurer|chief financial|cfo/.test(value)) {
    return 3;
  }

  if (/auditor/.test(value)) {
    return 4;
  }

  return 99;
}

export function compareExecutiveMembers(a: RankedMember, b: RankedMember): number {
  const rankDiff = getExecutivePositionRank(a.position) - getExecutivePositionRank(b.position);
  if (rankDiff !== 0) return rankDiff;

  const positionDiff = a.position.localeCompare(b.position, undefined, { sensitivity: "base" });
  if (positionDiff !== 0) return positionDiff;

  return a.fullName.localeCompare(b.fullName, undefined, { sensitivity: "base" });
}
