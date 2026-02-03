export interface FormState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'number' | 'date' | 'currency' | 'badge' | 'actions';
  width?: string;
}

export interface TableConfig {
  columns: TableColumn[];
  pageSizeOptions: number[];
  defaultPageSize: number;
  showSearch: boolean;
  showFilter: boolean;
}

export const initialFormState: FormState = {
  loading: false,
  error: null,
  success: false
};