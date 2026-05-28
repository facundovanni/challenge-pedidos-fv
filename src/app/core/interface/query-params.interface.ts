export interface FilterOption {
  key: string;
  value: string;
  op: string; // Ej: 'eq' (igual), 'ge' (mayor o igual), 'le' (menor o igual)
}

export interface QueryParams {
  filters: FilterOption[];
  search: string;
  searchBy: string[];
}
