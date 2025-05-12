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
      connections: {
        Row: {
          addressee_id: string
          created_at: string | null
          id: string
          requester_id: string
          status: Database["public"]["Enums"]["connection_status"]
          updated_at: string | null
        }
        Insert: {
          addressee_id: string
          created_at?: string | null
          id?: string
          requester_id: string
          status?: Database["public"]["Enums"]["connection_status"]
          updated_at?: string | null
        }
        Update: {
          addressee_id?: string
          created_at?: string | null
          id?: string
          requester_id?: string
          status?: Database["public"]["Enums"]["connection_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "connections_addressee_id_fkey"
            columns: ["addressee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          created_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      event_participants: {
        Row: {
          event_id: string
          id: string
          registration_time: string | null
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          registration_time?: string | null
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          registration_time?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          end_time: string
          id: string
          location: string | null
          max_participants: number | null
          organizer_id: string
          start_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          end_time: string
          id?: string
          location?: string | null
          max_participants?: number | null
          organizer_id: string
          start_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string
          id?: string
          location?: string | null
          max_participants?: number | null
          organizer_id?: string
          start_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          read: boolean | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          academic_goals: string | null
          achievements: string[] | null
          availability: Json | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          department: string | null
          full_name: string | null
          id: string
          institution: string | null
          major: string | null
          research_interests: string[] | null
          role: Database["public"]["Enums"]["user_role"] | null
          skills: string[] | null
          subjects_of_interest: string[] | null
          updated_at: string | null
          username: string
          website: string | null
          year_of_study: string | null
        }
        Insert: {
          academic_goals?: string | null
          achievements?: string[] | null
          availability?: Json | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          department?: string | null
          full_name?: string | null
          id: string
          institution?: string | null
          major?: string | null
          research_interests?: string[] | null
          role?: Database["public"]["Enums"]["user_role"] | null
          skills?: string[] | null
          subjects_of_interest?: string[] | null
          updated_at?: string | null
          username: string
          website?: string | null
          year_of_study?: string | null
        }
        Update: {
          academic_goals?: string | null
          achievements?: string[] | null
          availability?: Json | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          department?: string | null
          full_name?: string | null
          id?: string
          institution?: string | null
          major?: string | null
          research_interests?: string[] | null
          role?: Database["public"]["Enums"]["user_role"] | null
          skills?: string[] | null
          subjects_of_interest?: string[] | null
          updated_at?: string | null
          username?: string
          website?: string | null
          year_of_study?: string | null
        }
        Relationships: []
      }
      publications: {
        Row: {
          abstract: string | null
          content: string | null
          created_at: string | null
          doi: string | null
          id: string
          keywords: string[] | null
          published_date: string | null
          title: string
          updated_at: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          abstract?: string | null
          content?: string | null
          created_at?: string | null
          doi?: string | null
          id?: string
          keywords?: string[] | null
          published_date?: string | null
          title: string
          updated_at?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          abstract?: string | null
          content?: string | null
          created_at?: string | null
          doi?: string | null
          id?: string
          keywords?: string[] | null
          published_date?: string | null
          title?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "publications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      research_areas: {
        Row: {
          created_at: string | null
          id: string
          name: string
          parent_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          parent_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "research_areas_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "research_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_likes: {
        Row: {
          created_at: string | null
          resource_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          resource_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          resource_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_likes_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          category: string
          created_at: string | null
          created_by: string
          description: string | null
          downloads: number | null
          file_url: string | null
          id: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by: string
          description?: string | null
          downloads?: number | null
          file_url?: string | null
          id?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          downloads?: number | null
          file_url?: string | null
          id?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      study_buddy_matches: {
        Row: {
          created_at: string | null
          id: string
          matched_user_id: string
          requester_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          matched_user_id: string
          requester_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          matched_user_id?: string
          requester_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      study_buddy_requests: {
        Row: {
          availability: Json | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          subjects: string[]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          availability?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          subjects: string[]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          availability?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          subjects?: string[]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      study_matches: {
        Row: {
          created_at: string | null
          id: string
          match_score: number
          status: string | null
          subjects: string[] | null
          updated_at: string | null
          user1_id: string
          user2_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          match_score: number
          status?: string | null
          subjects?: string[] | null
          updated_at?: string | null
          user1_id: string
          user2_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          match_score?: number
          status?: string | null
          subjects?: string[] | null
          updated_at?: string | null
          user1_id?: string
          user2_id?: string
        }
        Relationships: []
      }
      user_research_interests: {
        Row: {
          created_at: string | null
          research_area_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          research_area_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          research_area_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_research_interests_research_area_id_fkey"
            columns: ["research_area_id"]
            isOneToOne: false
            referencedRelation: "research_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_research_interests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_matched_user_profile: {
        Args: {
          match_row: Database["public"]["Tables"]["study_buddy_matches"]["Row"]
        }
        Returns: {
          academic_goals: string | null
          achievements: string[] | null
          availability: Json | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          department: string | null
          full_name: string | null
          id: string
          institution: string | null
          major: string | null
          research_interests: string[] | null
          role: Database["public"]["Enums"]["user_role"] | null
          skills: string[] | null
          subjects_of_interest: string[] | null
          updated_at: string | null
          username: string
          website: string | null
          year_of_study: string | null
        }[]
      }
      get_profile_for_study_buddy_request: {
        Args: {
          request_row: Database["public"]["Tables"]["study_buddy_requests"]["Row"]
        }
        Returns: {
          academic_goals: string | null
          achievements: string[] | null
          availability: Json | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          department: string | null
          full_name: string | null
          id: string
          institution: string | null
          major: string | null
          research_interests: string[] | null
          role: Database["public"]["Enums"]["user_role"] | null
          skills: string[] | null
          subjects_of_interest: string[] | null
          updated_at: string | null
          username: string
          website: string | null
          year_of_study: string | null
        }[]
      }
      get_requester_profile: {
        Args: {
          match_row: Database["public"]["Tables"]["study_buddy_matches"]["Row"]
        }
        Returns: {
          academic_goals: string | null
          achievements: string[] | null
          availability: Json | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          department: string | null
          full_name: string | null
          id: string
          institution: string | null
          major: string | null
          research_interests: string[] | null
          role: Database["public"]["Enums"]["user_role"] | null
          skills: string[] | null
          subjects_of_interest: string[] | null
          updated_at: string | null
          username: string
          website: string | null
          year_of_study: string | null
        }[]
      }
      increment_downloads: {
        Args: { resource_id: string }
        Returns: undefined
      }
      toggle_resource_like: {
        Args: { resource_id: string; user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      connection_status: "pending" | "accepted" | "rejected"
      user_role: "student" | "professor" | "researcher" | "faculty" | "alumni"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      connection_status: ["pending", "accepted", "rejected"],
      user_role: ["student", "professor", "researcher", "faculty", "alumni"],
    },
  },
} as const
