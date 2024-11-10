import { Json } from './base';

interface ProfilesTable {
  Row: {
    created_at: string;
    full_name: string | null;
    id: string;
    phone_number: string | null;
    updated_at: string;
    username: string | null;
  };
  Insert: {
    created_at?: string;
    full_name?: string | null;
    id: string;
    phone_number?: string | null;
    updated_at?: string;
    username?: string | null;
  };
  Update: {
    created_at?: string;
    full_name?: string | null;
    id?: string;
    phone_number?: string | null;
    updated_at?: string;
    username?: string | null;
  };
  Relationships: [];
}

interface VehicleRequestsTable {
  Row: {
    created_at: string;
    dropoff_location: Json | null;
    id: string;
    pickup_location: Json | null;
    requires_maneuver: boolean | null;
    status: string;
    truck_type: string;
    user_id: string;
    vehicle_color: string;
    vehicle_make: string;
    vehicle_model: string;
    vehicle_year: string;
  };
  Insert: {
    created_at?: string;
    dropoff_location?: Json | null;
    id?: string;
    pickup_location?: Json | null;
    requires_maneuver?: boolean | null;
    status?: string;
    truck_type: string;
    user_id: string;
    vehicle_color: string;
    vehicle_make: string;
    vehicle_model: string;
    vehicle_year: string;
  };
  Update: {
    created_at?: string;
    dropoff_location?: Json | null;
    id?: string;
    pickup_location?: Json | null;
    requires_maneuver?: boolean | null;
    status?: string;
    truck_type?: string;
    user_id?: string;
    vehicle_color?: string;
    vehicle_make?: string;
    vehicle_model?: string;
    vehicle_year?: string;
  };
  Relationships: [
    {
      foreignKeyName: "vehicle_requests_user_id_fkey";
      columns: ["user_id"];
      isOneToOne: false;
      referencedRelation: "profiles";
      referencedColumns: ["id"];
    }
  ];
}

interface WebhooksTable {
  Row: {
    id: string;
    created_at: string;
    updated_at: string;
    url: string;
    description: string | null;
    is_active: boolean;
    secret_key: string;
  };
  Insert: {
    id?: string;
    created_at?: string;
    updated_at?: string;
    url: string;
    description?: string | null;
    is_active?: boolean;
    secret_key: string;
  };
  Update: {
    url?: string;
    description?: string | null;
    is_active?: boolean;
    secret_key?: string;
    updated_at?: string;
  };
  Relationships: [];
}

export interface Tables {
  profiles: ProfilesTable;
  vehicle_requests: VehicleRequestsTable;
  webhooks: WebhooksTable;
}