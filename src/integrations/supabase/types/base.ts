import { Tables } from './tables'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: Tables
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
