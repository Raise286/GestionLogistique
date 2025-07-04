// types/index.ts

export type SectionKey =
  | 'mission'
  | 'available'
  | 'history'
  | 'notifications'
  | 'profile'
  | 'metrics';

export interface SidebarOption {
  key: SectionKey;
  label: string;
}
