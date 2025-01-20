export interface FiltersParams {
  zipCodes: string[];
  breeds: string[];
  ageMin: number;
  ageMax: number;
  size: number;
  from: number;
  sort: `${string}:${"asc" | "desc"}`;
}
