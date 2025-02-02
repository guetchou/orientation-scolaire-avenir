export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounting_entries: {
        Row: {
          created_at: string | null
          created_by: string | null
          date: string
          description: string
          entries: Json
          id: string
          period_id: string | null
          reference: string | null
          status: string | null
          validated_at: string | null
          validated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date: string
          description: string
          entries: Json
          id?: string
          period_id?: string | null
          reference?: string | null
          status?: string | null
          validated_at?: string | null
          validated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date?: string
          description?: string
          entries?: Json
          id?: string
          period_id?: string | null
          reference?: string | null
          status?: string | null
          validated_at?: string | null
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounting_entries_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "accounting_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      accounting_periods: {
        Row: {
          closed_at: string | null
          created_at: string | null
          end_date: string
          fiscal_year_id: string | null
          id: string
          start_date: string
          status: string | null
        }
        Insert: {
          closed_at?: string | null
          created_at?: string | null
          end_date: string
          fiscal_year_id?: string | null
          id?: string
          start_date: string
          status?: string | null
        }
        Update: {
          closed_at?: string | null
          created_at?: string | null
          end_date?: string
          fiscal_year_id?: string | null
          id?: string
          start_date?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounting_periods_fiscal_year_id_fkey"
            columns: ["fiscal_year_id"]
            isOneToOne: false
            referencedRelation: "fiscal_years"
            referencedColumns: ["id"]
          },
        ]
      }
      accounts: {
        Row: {
          class: number
          code: string
          created_at: string | null
          label: string
          parent_code: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          class: number
          code: string
          created_at?: string | null
          label: string
          parent_code?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          class?: number
          code?: string
          created_at?: string | null
          label?: string
          parent_code?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_parent_code_fkey"
            columns: ["parent_code"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["code"]
          },
        ]
      }
      asterisk_events: {
        Row: {
          agent_id: string | null
          created_at: string
          event_data: Json
          event_type: string
          id: string
        }
        Insert: {
          agent_id?: string | null
          created_at?: string
          event_data: Json
          event_type: string
          id?: string
        }
        Update: {
          agent_id?: string | null
          created_at?: string
          event_data?: Json
          event_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asterisk_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "call_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      call_agents: {
        Row: {
          asterisk_extension: string | null
          created_at: string | null
          extension: string | null
          id: string
          last_call_time: string | null
          sip_pass: string | null
          sip_user: string | null
          status: string | null
          updated_at: string | null
          vicidial_id: string
        }
        Insert: {
          asterisk_extension?: string | null
          created_at?: string | null
          extension?: string | null
          id?: string
          last_call_time?: string | null
          sip_pass?: string | null
          sip_user?: string | null
          status?: string | null
          updated_at?: string | null
          vicidial_id: string
        }
        Update: {
          asterisk_extension?: string | null
          created_at?: string | null
          extension?: string | null
          id?: string
          last_call_time?: string | null
          sip_pass?: string | null
          sip_user?: string | null
          status?: string | null
          updated_at?: string | null
          vicidial_id?: string
        }
        Relationships: []
      }
      call_campaigns: {
        Row: {
          completed_calls: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          status: string | null
          success_rate: number | null
          target_calls: number | null
          updated_at: string | null
        }
        Insert: {
          completed_calls?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: string | null
          success_rate?: number | null
          target_calls?: number | null
          updated_at?: string | null
        }
        Update: {
          completed_calls?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string | null
          success_rate?: number | null
          target_calls?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      calls: {
        Row: {
          agent_id: string | null
          campaign_id: string | null
          created_at: string | null
          end_time: string | null
          id: string
          notes: string | null
          start_time: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          campaign_id?: string | null
          created_at?: string | null
          end_time?: string | null
          id?: string
          notes?: string | null
          start_time?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          campaign_id?: string | null
          created_at?: string | null
          end_time?: string | null
          id?: string
          notes?: string | null
          start_time?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calls_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "call_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calls_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "call_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      contents: {
        Row: {
          content: string | null
          created_at: string
          created_by: string | null
          id: string
          status: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          status?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          status?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      fiscal_years: {
        Row: {
          closed_at: string | null
          created_at: string | null
          end_date: string
          id: string
          start_date: string
          status: string | null
        }
        Insert: {
          closed_at?: string | null
          created_at?: string | null
          end_date: string
          id?: string
          start_date: string
          status?: string | null
        }
        Update: {
          closed_at?: string | null
          created_at?: string | null
          end_date?: string
          id?: string
          start_date?: string
          status?: string | null
        }
        Relationships: []
      }
      integration_configs: {
        Row: {
          config: Json
          created_at: string
          id: string
          type: string
          updated_at: string
        }
        Insert: {
          config: Json
          created_at?: string
          id?: string
          type: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      lease_contracts: {
        Row: {
          created_at: string | null
          deposit_amount: number
          end_date: string
          id: string
          monthly_rent: number
          owner_id: string | null
          property_id: string | null
          start_date: string
          status: string | null
          tenant_id: string | null
          terms: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deposit_amount: number
          end_date: string
          id?: string
          monthly_rent: number
          owner_id?: string | null
          property_id?: string | null
          start_date: string
          status?: string | null
          tenant_id?: string | null
          terms?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deposit_amount?: number
          end_date?: string
          id?: string
          monthly_rent?: number
          owner_id?: string | null
          property_id?: string | null
          start_date?: string
          status?: string | null
          tenant_id?: string | null
          terms?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lease_contracts_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          content_type: string
          created_at: string
          file_path: string
          filename: string
          id: string
          size: number
          uploaded_by: string | null
        }
        Insert: {
          content_type: string
          created_at?: string
          file_path: string
          filename: string
          id?: string
          size: number
          uploaded_by?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string
          file_path?: string
          filename?: string
          id?: string
          size?: number
          uploaded_by?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          receiver_id: string | null
          sender_id: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      neighborhoods: {
        Row: {
          city: string
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          city: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          city?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          business_address: string | null
          company_name: string | null
          created_at: string
          full_name: string | null
          id: string
          last_login: string | null
          license_number: string | null
          phone: string | null
          role: string | null
          status: string | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"] | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          business_address?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          last_login?: string | null
          license_number?: string | null
          phone?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"] | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          business_address?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          last_login?: string | null
          license_number?: string | null
          phone?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"] | null
          website?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          bathrooms: number | null
          bedrooms: number | null
          category_id: string | null
          city: string
          country: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          latitude: number | null
          location_point: unknown | null
          longitude: number | null
          owner_id: string | null
          postal_code: string | null
          status: string | null
          surface_area: number | null
          title: string
          type_id: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          bathrooms?: number | null
          bedrooms?: number | null
          category_id?: string | null
          city: string
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          location_point?: unknown | null
          longitude?: number | null
          owner_id?: string | null
          postal_code?: string | null
          status?: string | null
          surface_area?: number | null
          title: string
          type_id?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          bathrooms?: number | null
          bedrooms?: number | null
          category_id?: string | null
          city?: string
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          location_point?: unknown | null
          longitude?: number | null
          owner_id?: string | null
          postal_code?: string | null
          status?: string | null
          surface_area?: number | null
          title?: string
          type_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "property_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "property_types"
            referencedColumns: ["id"]
          },
        ]
      }
      property_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "property_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      property_features: {
        Row: {
          created_at: string | null
          id: string
          name: string
          property_id: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          property_id?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          property_id?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_features_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_prices: {
        Row: {
          created_at: string | null
          currency: string | null
          end_date: string | null
          id: string
          period: string | null
          price: number
          price_type: string
          property_id: string | null
          start_date: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          end_date?: string | null
          id?: string
          period?: string | null
          price: number
          price_type: string
          property_id?: string | null
          start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          end_date?: string | null
          id?: string
          period?: string | null
          price?: number
          price_type?: string
          property_id?: string | null
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_prices_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      rent_payments: {
        Row: {
          amount: number
          contract_id: string | null
          created_at: string | null
          id: string
          payment_date: string
          payment_method: string | null
          reference: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          contract_id?: string | null
          created_at?: string | null
          id?: string
          payment_date: string
          payment_method?: string | null
          reference?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          contract_id?: string | null
          created_at?: string | null
          id?: string
          payment_date?: string
          payment_method?: string | null
          reference?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rent_payments_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "lease_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          property_id: string
          rating: number
          reviewer_id: string
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          property_id: string
          rating: number
          reviewer_id: string
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          property_id?: string
          rating?: number
          reviewer_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          created_at: string
          id: string
          message: string
          status: string | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          status?: string | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      test_questions: {
        Row: {
          category: string
          created_at: string
          id: string
          options: Json | null
          question: string
          test_type_id: string | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          options?: Json | null
          question: string
          test_type_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          options?: Json | null
          question?: string
          test_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_questions_test_type_id_fkey"
            columns: ["test_type_id"]
            isOneToOne: false
            referencedRelation: "test_types"
            referencedColumns: ["id"]
          },
        ]
      }
      test_results: {
        Row: {
          answers: Json
          created_at: string
          detailed_analysis: Json | null
          id: string
          recommendations: Json | null
          results: Json
          test_type: string
          user_id: string
        }
        Insert: {
          answers: Json
          created_at?: string
          detailed_analysis?: Json | null
          id?: string
          recommendations?: Json | null
          results: Json
          test_type: string
          user_id: string
        }
        Update: {
          answers?: Json
          created_at?: string
          detailed_analysis?: Json | null
          id?: string
          recommendations?: Json | null
          results?: Json
          test_type?: string
          user_id?: string
        }
        Relationships: []
      }
      test_types: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          owner_id: string | null
          payment_method: string | null
          payment_reference: string | null
          property_id: string | null
          status: string | null
          tenant_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          owner_id?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          property_id?: string | null
          status?: string | null
          tenant_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          owner_id?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          property_id?: string | null
          status?: string | null
          tenant_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      vicidial_config: {
        Row: {
          api_pass: string
          api_user: string
          asterisk_port: number | null
          asterisk_server: string
          created_at: string
          id: string
          server_url: string
          updated_at: string
        }
        Insert: {
          api_pass: string
          api_user: string
          asterisk_port?: number | null
          asterisk_server: string
          created_at?: string
          id?: string
          server_url: string
          updated_at?: string
        }
        Update: {
          api_pass?: string
          api_user?: string
          asterisk_port?: number | null
          asterisk_server?: string
          created_at?: string
          id?: string
          server_url?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role:
        | "admin"
        | "agent"
        | "tenant"
        | "landlord"
        | "agency"
        | "broker"
        | "canvasser"
        | "land_owner"
        | "insurance"
        | "notary"
        | "supervisor"
        | "super_admin"
      user_type: "AGENT" | "OWNER" | "TENANT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
