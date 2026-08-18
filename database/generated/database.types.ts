export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  api: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_change_request: {
        Args: {
          request_idempotency_key: string
          request_rationale: string
          request_title: string
        }
        Returns: string
      }
      review_change_request: {
        Args: {
          request_id: string
          review_decision: string
          review_note?: string
        }
        Returns: undefined
      }
      submit_change_request: {
        Args: { request_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  catalog: {
    Tables: {
      app_user: {
        Row: {
          auth_provider: string
          auth_subject: string
          created_at: string
          disabled_at: string | null
          display_name: string
          email: string | null
          id: string
        }
        Insert: {
          auth_provider?: string
          auth_subject: string
          created_at?: string
          disabled_at?: string | null
          display_name: string
          email?: string | null
          id?: string
        }
        Update: {
          auth_provider?: string
          auth_subject?: string
          created_at?: string
          disabled_at?: string | null
          display_name?: string
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      approval: {
        Row: {
          decided_at: string
          decision: string
          id: string
          note: string | null
          request_id: string
          reviewer_id: string
        }
        Insert: {
          decided_at?: string
          decision: string
          id?: string
          note?: string | null
          request_id: string
          reviewer_id: string
        }
        Update: {
          decided_at?: string
          decision?: string
          id?: string
          note?: string | null
          request_id?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "change_request"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      assertion: {
        Row: {
          asserted_value: Json
          created_at: string
          field_path: string
          id: string
          manufacturer_id: string | null
          media_id: string | null
          product_id: string | null
          relation_id: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["catalog"]["Enums"]["verification_status"]
          valid_from: string | null
          valid_to: string | null
        }
        Insert: {
          asserted_value: Json
          created_at?: string
          field_path: string
          id?: string
          manufacturer_id?: string | null
          media_id?: string | null
          product_id?: string | null
          relation_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["catalog"]["Enums"]["verification_status"]
          valid_from?: string | null
          valid_to?: string | null
        }
        Update: {
          asserted_value?: Json
          created_at?: string
          field_path?: string
          id?: string
          manufacturer_id?: string | null
          media_id?: string | null
          product_id?: string | null
          relation_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["catalog"]["Enums"]["verification_status"]
          valid_from?: string | null
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assertion_manufacturer_id_fkey"
            columns: ["manufacturer_id"]
            isOneToOne: false
            referencedRelation: "manufacturer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assertion_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media_asset"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assertion_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assertion_relation_id_fkey"
            columns: ["relation_id"]
            isOneToOne: false
            referencedRelation: "product_relation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assertion_reviewer_fk"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      assertion_evidence: {
        Row: {
          assertion_id: string
          evidence_order: number
          locator_id: string
        }
        Insert: {
          assertion_id: string
          evidence_order?: number
          locator_id: string
        }
        Update: {
          assertion_id?: string
          evidence_order?: number
          locator_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assertion_evidence_assertion_id_fkey"
            columns: ["assertion_id"]
            isOneToOne: false
            referencedRelation: "assertion"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assertion_evidence_locator_id_fkey"
            columns: ["locator_id"]
            isOneToOne: false
            referencedRelation: "source_locator"
            referencedColumns: ["id"]
          },
        ]
      }
      attribute_definition: {
        Row: {
          canonical_unit_code: string | null
          cardinality: string
          code: string
          comparable: boolean
          constraints_json: Json
          created_at: string
          enum_values: Json | null
          facetable: boolean
          id: string
          label: string
          searchable: boolean
          sortable: boolean
          value_kind: Database["catalog"]["Enums"]["value_kind"]
        }
        Insert: {
          canonical_unit_code?: string | null
          cardinality?: string
          code: string
          comparable?: boolean
          constraints_json?: Json
          created_at?: string
          enum_values?: Json | null
          facetable?: boolean
          id?: string
          label: string
          searchable?: boolean
          sortable?: boolean
          value_kind: Database["catalog"]["Enums"]["value_kind"]
        }
        Update: {
          canonical_unit_code?: string | null
          cardinality?: string
          code?: string
          comparable?: boolean
          constraints_json?: Json
          created_at?: string
          enum_values?: Json | null
          facetable?: boolean
          id?: string
          label?: string
          searchable?: boolean
          sortable?: boolean
          value_kind?: Database["catalog"]["Enums"]["value_kind"]
        }
        Relationships: [
          {
            foreignKeyName: "attribute_definition_canonical_unit_code_fkey"
            columns: ["canonical_unit_code"]
            isOneToOne: false
            referencedRelation: "unit"
            referencedColumns: ["code"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          after_value: Json | null
          before_value: Json | null
          entity_id: string | null
          entity_kind: string
          id: number
          occurred_at: string
          request_context: Json
          request_id: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          after_value?: Json | null
          before_value?: Json | null
          entity_id?: string | null
          entity_kind: string
          id?: never
          occurred_at?: string
          request_context?: Json
          request_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          after_value?: Json | null
          before_value?: Json | null
          entity_id?: string | null
          entity_kind?: string
          id?: never
          occurred_at?: string
          request_context?: Json
          request_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_log_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "change_request"
            referencedColumns: ["id"]
          },
        ]
      }
      change_operation: {
        Row: {
          after_value: Json | null
          before_value: Json | null
          entity_id: string | null
          entity_kind: string
          id: string
          operation: string
          ordinal: number
          request_id: string
        }
        Insert: {
          after_value?: Json | null
          before_value?: Json | null
          entity_id?: string | null
          entity_kind: string
          id?: string
          operation: string
          ordinal: number
          request_id: string
        }
        Update: {
          after_value?: Json | null
          before_value?: Json | null
          entity_id?: string | null
          entity_kind?: string
          id?: string
          operation?: string
          ordinal?: number
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "change_operation_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "change_request"
            referencedColumns: ["id"]
          },
        ]
      }
      change_operation_source_locator: {
        Row: {
          evidence_order: number
          locator_id: string
          operation_id: string
        }
        Insert: {
          evidence_order?: number
          locator_id: string
          operation_id: string
        }
        Update: {
          evidence_order?: number
          locator_id?: string
          operation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "change_operation_source_locator_locator_id_fkey"
            columns: ["locator_id"]
            isOneToOne: false
            referencedRelation: "source_locator"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "change_operation_source_locator_operation_id_fkey"
            columns: ["operation_id"]
            isOneToOne: false
            referencedRelation: "change_operation"
            referencedColumns: ["id"]
          },
        ]
      }
      change_request: {
        Row: {
          applied_at: string | null
          author_id: string
          created_at: string
          id: string
          idempotency_key: string
          rationale: string
          status: Database["catalog"]["Enums"]["change_status"]
          submitted_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          applied_at?: string | null
          author_id: string
          created_at?: string
          id?: string
          idempotency_key: string
          rationale: string
          status?: Database["catalog"]["Enums"]["change_status"]
          submitted_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          applied_at?: string | null
          author_id?: string
          created_at?: string
          id?: string
          idempotency_key?: string
          rationale?: string
          status?: Database["catalog"]["Enums"]["change_status"]
          submitted_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "change_request_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      import_run: {
        Row: {
          completed_at: string | null
          evidence_sha256: string
          id: string
          importer_version: number
          result_json: Json
          source_sha256: string
          stable_key: string
          started_at: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          evidence_sha256: string
          id?: string
          importer_version: number
          result_json?: Json
          source_sha256: string
          stable_key: string
          started_at?: string
          status: string
        }
        Update: {
          completed_at?: string | null
          evidence_sha256?: string
          id?: string
          importer_version?: number
          result_json?: Json
          source_sha256?: string
          stable_key?: string
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      manufacturer: {
        Row: {
          created_at: string
          display_name: string
          id: string
          legal_name: string | null
          lifecycle: Database["catalog"]["Enums"]["lifecycle_status"]
          stable_key: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          legal_name?: string | null
          lifecycle?: Database["catalog"]["Enums"]["lifecycle_status"]
          stable_key: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          legal_name?: string | null
          lifecycle?: Database["catalog"]["Enums"]["lifecycle_status"]
          stable_key?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      media_asset: {
        Row: {
          background_policy: string | null
          byte_size: number
          created_at: string
          has_alpha: boolean | null
          height: number | null
          id: string
          mime_type: string
          object_key: string
          original_filename: string
          rights_status: string
          sha256: string
          source_id: string | null
          stable_key: string
          width: number | null
        }
        Insert: {
          background_policy?: string | null
          byte_size: number
          created_at?: string
          has_alpha?: boolean | null
          height?: number | null
          id?: string
          mime_type: string
          object_key: string
          original_filename: string
          rights_status?: string
          sha256: string
          source_id?: string | null
          stable_key: string
          width?: number | null
        }
        Update: {
          background_policy?: string | null
          byte_size?: number
          created_at?: string
          has_alpha?: boolean | null
          height?: number | null
          id?: string
          mime_type?: string
          object_key?: string
          original_filename?: string
          rights_status?: string
          sha256?: string
          source_id?: string | null
          stable_key?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_asset_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "source_document"
            referencedColumns: ["id"]
          },
        ]
      }
      media_placement: {
        Row: {
          alt_text: string
          created_at: string
          delivery_path: string
          download_filename: string
          focal_point: Json | null
          id: string
          is_downloadable: boolean
          media_id: string
          ordinal: number
          product_id: string
          role: Database["catalog"]["Enums"]["media_role"]
        }
        Insert: {
          alt_text: string
          created_at?: string
          delivery_path: string
          download_filename: string
          focal_point?: Json | null
          id?: string
          is_downloadable?: boolean
          media_id: string
          ordinal?: number
          product_id: string
          role: Database["catalog"]["Enums"]["media_role"]
        }
        Update: {
          alt_text?: string
          created_at?: string
          delivery_path?: string
          download_filename?: string
          focal_point?: Json | null
          id?: string
          is_downloadable?: boolean
          media_id?: string
          ordinal?: number
          product_id?: string
          role?: Database["catalog"]["Enums"]["media_role"]
        }
        Relationships: [
          {
            foreignKeyName: "media_placement_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media_asset"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_placement_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          created_at: string
          discontinued_on: string | null
          display_name: string
          display_order: number | null
          family_id: string
          first_published_on: string | null
          group_id: string | null
          id: string
          lifecycle: Database["catalog"]["Enums"]["lifecycle_status"]
          manufacturer_id: string
          model_code: string | null
          parent_id: string | null
          slug: string
          stable_key: string
          updated_at: string
          variant_axes: Json
          verification: Database["catalog"]["Enums"]["verification_status"]
        }
        Insert: {
          created_at?: string
          discontinued_on?: string | null
          display_name: string
          display_order?: number | null
          family_id: string
          first_published_on?: string | null
          group_id?: string | null
          id?: string
          lifecycle?: Database["catalog"]["Enums"]["lifecycle_status"]
          manufacturer_id: string
          model_code?: string | null
          parent_id?: string | null
          slug: string
          stable_key: string
          updated_at?: string
          variant_axes?: Json
          verification?: Database["catalog"]["Enums"]["verification_status"]
        }
        Update: {
          created_at?: string
          discontinued_on?: string | null
          display_name?: string
          display_order?: number | null
          family_id?: string
          first_published_on?: string | null
          group_id?: string | null
          id?: string
          lifecycle?: Database["catalog"]["Enums"]["lifecycle_status"]
          manufacturer_id?: string
          model_code?: string | null
          parent_id?: string | null
          slug?: string
          stable_key?: string
          updated_at?: string
          variant_axes?: Json
          verification?: Database["catalog"]["Enums"]["verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "product_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "product_family"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "product_group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_manufacturer_id_fkey"
            columns: ["manufacturer_id"]
            isOneToOne: false
            referencedRelation: "manufacturer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product_attribute: {
        Row: {
          boolean_value: boolean | null
          created_at: string
          definition_id: string
          id: string
          json_value: Json | null
          number_value: number | null
          ordinal: number
          original_text: string | null
          product_id: string
          semantics: Database["catalog"]["Enums"]["null_semantics"]
          text_value: string | null
          unit_code: string | null
          updated_at: string
        }
        Insert: {
          boolean_value?: boolean | null
          created_at?: string
          definition_id: string
          id?: string
          json_value?: Json | null
          number_value?: number | null
          ordinal?: number
          original_text?: string | null
          product_id: string
          semantics?: Database["catalog"]["Enums"]["null_semantics"]
          text_value?: string | null
          unit_code?: string | null
          updated_at?: string
        }
        Update: {
          boolean_value?: boolean | null
          created_at?: string
          definition_id?: string
          id?: string
          json_value?: Json | null
          number_value?: number | null
          ordinal?: number
          original_text?: string | null
          product_id?: string
          semantics?: Database["catalog"]["Enums"]["null_semantics"]
          text_value?: string | null
          unit_code?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_attribute_definition_id_fkey"
            columns: ["definition_id"]
            isOneToOne: false
            referencedRelation: "attribute_definition"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_attribute_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_attribute_unit_code_fkey"
            columns: ["unit_code"]
            isOneToOne: false
            referencedRelation: "unit"
            referencedColumns: ["code"]
          },
        ]
      }
      product_family: {
        Row: {
          attribute_template: Json
          created_at: string
          display_name: string
          domain: string
          id: string
          manufacturer_id: string | null
          schema_version: number
          stable_key: string
          updated_at: string
        }
        Insert: {
          attribute_template?: Json
          created_at?: string
          display_name: string
          domain: string
          id?: string
          manufacturer_id?: string | null
          schema_version?: number
          stable_key: string
          updated_at?: string
        }
        Update: {
          attribute_template?: Json
          created_at?: string
          display_name?: string
          domain?: string
          id?: string
          manufacturer_id?: string | null
          schema_version?: number
          stable_key?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_family_manufacturer_id_fkey"
            columns: ["manufacturer_id"]
            isOneToOne: false
            referencedRelation: "manufacturer"
            referencedColumns: ["id"]
          },
        ]
      }
      product_group: {
        Row: {
          created_at: string
          display_name: string
          display_order: number | null
          family_id: string
          id: string
          lifecycle: Database["catalog"]["Enums"]["lifecycle_status"]
          manufacturer_id: string
          official_series_name: string | null
          stable_key: string
          updated_at: string
          varies_by: string[]
        }
        Insert: {
          created_at?: string
          display_name: string
          display_order?: number | null
          family_id: string
          id?: string
          lifecycle?: Database["catalog"]["Enums"]["lifecycle_status"]
          manufacturer_id: string
          official_series_name?: string | null
          stable_key: string
          updated_at?: string
          varies_by?: string[]
        }
        Update: {
          created_at?: string
          display_name?: string
          display_order?: number | null
          family_id?: string
          id?: string
          lifecycle?: Database["catalog"]["Enums"]["lifecycle_status"]
          manufacturer_id?: string
          official_series_name?: string | null
          stable_key?: string
          updated_at?: string
          varies_by?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "product_group_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "product_family"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_group_manufacturer_id_fkey"
            columns: ["manufacturer_id"]
            isOneToOne: false
            referencedRelation: "manufacturer"
            referencedColumns: ["id"]
          },
        ]
      }
      product_relation: {
        Row: {
          created_at: string
          from_product_id: string
          id: string
          metadata: Json
          status: Database["catalog"]["Enums"]["verification_status"]
          to_product_id: string
          type_code: string
          valid_from: string | null
          valid_to: string | null
        }
        Insert: {
          created_at?: string
          from_product_id: string
          id?: string
          metadata?: Json
          status?: Database["catalog"]["Enums"]["verification_status"]
          to_product_id: string
          type_code: string
          valid_from?: string | null
          valid_to?: string | null
        }
        Update: {
          created_at?: string
          from_product_id?: string
          id?: string
          metadata?: Json
          status?: Database["catalog"]["Enums"]["verification_status"]
          to_product_id?: string
          type_code?: string
          valid_from?: string | null
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_relation_from_product_id_fkey"
            columns: ["from_product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_relation_to_product_id_fkey"
            columns: ["to_product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_relation_type_code_fkey"
            columns: ["type_code"]
            isOneToOne: false
            referencedRelation: "relation_type"
            referencedColumns: ["code"]
          },
        ]
      }
      relation_evidence: {
        Row: {
          locator_id: string
          relation_id: string
        }
        Insert: {
          locator_id: string
          relation_id: string
        }
        Update: {
          locator_id?: string
          relation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "relation_evidence_locator_id_fkey"
            columns: ["locator_id"]
            isOneToOne: false
            referencedRelation: "source_locator"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relation_evidence_relation_id_fkey"
            columns: ["relation_id"]
            isOneToOne: false
            referencedRelation: "product_relation"
            referencedColumns: ["id"]
          },
        ]
      }
      relation_type: {
        Row: {
          code: string
          directed: boolean
          inverse_code: string | null
          requires_evidence: boolean
        }
        Insert: {
          code: string
          directed?: boolean
          inverse_code?: string | null
          requires_evidence?: boolean
        }
        Update: {
          code?: string
          directed?: boolean
          inverse_code?: string | null
          requires_evidence?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "relation_type_inverse_code_fkey"
            columns: ["inverse_code"]
            isOneToOne: false
            referencedRelation: "relation_type"
            referencedColumns: ["code"]
          },
        ]
      }
      source_document: {
        Row: {
          byte_size: number | null
          created_at: string
          id: string
          metadata: Json
          mime_type: string | null
          object_key: string | null
          published_on: string | null
          retrieved_at: string | null
          sha256: string | null
          source_url: string | null
          stable_key: string
          title: string
          verification: Database["catalog"]["Enums"]["verification_status"]
        }
        Insert: {
          byte_size?: number | null
          created_at?: string
          id?: string
          metadata?: Json
          mime_type?: string | null
          object_key?: string | null
          published_on?: string | null
          retrieved_at?: string | null
          sha256?: string | null
          source_url?: string | null
          stable_key: string
          title: string
          verification?: Database["catalog"]["Enums"]["verification_status"]
        }
        Update: {
          byte_size?: number | null
          created_at?: string
          id?: string
          metadata?: Json
          mime_type?: string | null
          object_key?: string | null
          published_on?: string | null
          retrieved_at?: string | null
          sha256?: string | null
          source_url?: string | null
          stable_key?: string
          title?: string
          verification?: Database["catalog"]["Enums"]["verification_status"]
        }
        Relationships: []
      }
      source_locator: {
        Row: {
          created_at: string
          id: string
          page_from: number | null
          page_to: number | null
          quote_excerpt: string | null
          section: string | null
          selector: string | null
          source_id: string
          table_label: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          page_from?: number | null
          page_to?: number | null
          quote_excerpt?: string | null
          section?: string | null
          selector?: string | null
          source_id: string
          table_label?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          page_from?: number | null
          page_to?: number | null
          quote_excerpt?: string | null
          section?: string | null
          selector?: string | null
          source_id?: string
          table_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "source_locator_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "source_document"
            referencedColumns: ["id"]
          },
        ]
      }
      unit: {
        Row: {
          code: string
          dimension: string
          factor_to_base: number
          symbol: string
        }
        Insert: {
          code: string
          dimension: string
          factor_to_base: number
          symbol: string
        }
        Update: {
          code?: string
          dimension?: string
          factor_to_base?: number
          symbol?: string
        }
        Relationships: []
      }
      user_role: {
        Row: {
          granted_at: string
          granted_by: string | null
          role: Database["catalog"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          role: Database["catalog"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          role?: Database["catalog"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_enabled_user: {
        Args: { required_roles?: Database["catalog"]["Enums"]["app_role"][] }
        Returns: string
      }
    }
    Enums: {
      app_role: "owner" | "maintainer" | "editor" | "reviewer"
      change_status:
        | "draft"
        | "submitted"
        | "approved"
        | "rejected"
        | "applied"
        | "cancelled"
      lifecycle_status:
        | "draft"
        | "current"
        | "legacy"
        | "discontinued"
        | "archived"
      media_role:
        | "primary"
        | "hover"
        | "front"
        | "rear"
        | "side"
        | "perspective"
        | "array"
        | "detail"
        | "document"
      null_semantics: "known" | "unknown" | "not_applicable" | "not_published"
      value_kind:
        | "text"
        | "number"
        | "boolean"
        | "enum"
        | "quantity"
        | "range"
        | "json"
      verification_status: "pending" | "verified" | "disputed" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  api: {
    Enums: {},
  },
  catalog: {
    Enums: {
      app_role: ["owner", "maintainer", "editor", "reviewer"],
      change_status: [
        "draft",
        "submitted",
        "approved",
        "rejected",
        "applied",
        "cancelled",
      ],
      lifecycle_status: [
        "draft",
        "current",
        "legacy",
        "discontinued",
        "archived",
      ],
      media_role: [
        "primary",
        "hover",
        "front",
        "rear",
        "side",
        "perspective",
        "array",
        "detail",
        "document",
      ],
      null_semantics: ["known", "unknown", "not_applicable", "not_published"],
      value_kind: [
        "text",
        "number",
        "boolean",
        "enum",
        "quantity",
        "range",
        "json",
      ],
      verification_status: ["pending", "verified", "disputed", "rejected"],
    },
  },
} as const
